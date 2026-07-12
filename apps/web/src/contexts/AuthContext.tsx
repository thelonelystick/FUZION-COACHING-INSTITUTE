import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseAuth";
import { db } from "../firebase/firestore";
import { changePassword as changePasswordHelper, getUserRoleProfile, sendPasswordReset, signInWithRole, signUpWithRole, type UserRole } from "../lib/authHelpers";

type AuthUser = {
  uid: string;
  email: string | null;
  role: UserRole | null;
  displayName?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  role: UserRole | null;
  loading: boolean;
  sessionWarning: string;
  clearSessionWarning: () => void;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<UserRole | null>;
  signUp: (email: string, password: string, role: UserRole, extra?: Record<string, unknown>) => Promise<UserRole | null>;
  forgotPassword: (email: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getOrCreateDeviceId() {
  const key = "fuzion_device_id";
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const id = `d_${crypto.randomUUID()}`;
    localStorage.setItem(key, id);
    return id;
  } catch {
    return "d_unknown";
  }
}

async function clearActiveSession(uid: string, deviceId: string) {
  try {
    const sessionRef = doc(db, "active_sessions", uid);
    const sessionSnap = await getDoc(sessionRef);
    const session = sessionSnap.data() as { deviceId?: string } | undefined;
    if (session?.deviceId === deviceId) {
      await deleteDoc(sessionRef);
    }
  } catch {
    // ignore cleanup failures
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionWarning, setSessionWarning] = useState("");
  const [deviceId] = useState(getOrCreateDeviceId);

  useEffect(() => {
    let unsubscribeSession: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (unsubscribeSession) {
        unsubscribeSession();
        unsubscribeSession = undefined;
      }

      setSessionWarning("");

      if (!firebaseUser) {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      let currentRole: UserRole | null = null;
      try {
        const profile = await getUserRoleProfile(firebaseUser.uid);
        currentRole = profile.role;
        setRole(currentRole);

        if (profile.status === "suspended") {
          setSessionWarning("Your account is suspended. Contact support for assistance.");
          await firebaseSignOut(auth);
          setLoading(false);
          return;
        }
      } catch {
        setRole(null);
      }

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role: currentRole,
        displayName: firebaseUser.displayName,
      });

      try {
        await setDoc(
          doc(db, "active_sessions", firebaseUser.uid),
          { uid: firebaseUser.uid, deviceId, lastSeen: serverTimestamp(), active: true, role: currentRole },
          { merge: true }
        );
      } catch {
        // ignore session write failures
      }

      unsubscribeSession = onSnapshot(doc(db, "active_sessions", firebaseUser.uid), async (snap) => {
        const session = snap.data() as { deviceId?: string } | undefined;
        if (session?.deviceId && session.deviceId !== deviceId) {
          setSessionWarning("Session limited to 1 active device. You have been logged out.");
          await firebaseSignOut(auth);
        }
      });

      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSession) unsubscribeSession();
    };
  }, [deviceId]);

  const signIn = async (email: string, password: string, rememberMe = true) => {
    const result = await signInWithRole(email, password, rememberMe);
    setUser({ uid: result.uid, email, role: result.role, displayName: null });
    setRole(result.role);
    return result.role;
  };

  const signUp = async (email: string, password: string, role: UserRole, extra: Record<string, unknown> = {}) => {
    const result = await signUpWithRole(email, password, role, extra);
    setUser({ uid: result.uid, email, role: result.role, displayName: null });
    setRole(result.role);
    return result.role;
  };

  const forgotPassword = async (email: string) => {
    await sendPasswordReset(email);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    await changePasswordHelper(currentPassword, newPassword);
  };

  async function signOut() {
    if (user) {
      await clearActiveSession(user.uid, deviceId);
    }
    await firebaseSignOut(auth);
    setUser(null);
    setRole(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      role,
      loading,
      sessionWarning,
      clearSessionWarning: () => setSessionWarning(""),
      signIn,
      signUp,
      forgotPassword,
      changePassword,
      signOut,
    }),
    [user, role, loading, sessionWarning, deviceId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
