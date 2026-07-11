import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseAuth";
import { db } from "../firebase/firestore";
import { signInWithRole, signUpWithRole } from "../lib/authHelpers";

type UserRole = "student" | "teacher" | "parent" | "admin";

type AuthUser = {
  uid: string;
  email: string | null;
  role: UserRole;
  displayName?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole, extra?: Record<string, unknown>) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      const role = (userDoc.data()?.role as UserRole | undefined) ?? "student";
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        role,
        displayName: firebaseUser.displayName,
      });
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const result = await signInWithRole(email, password);
    setUser({
      uid: result.uid,
      email,
      role: result.role,
      displayName: null,
    });
  };

  const signUp = async (email: string, password: string, role: UserRole, extra: Record<string, unknown> = {}) => {
    const result = await signUpWithRole(email, password, role, extra);
    setUser({
      uid: result.uid,
      email,
      role: result.role,
      displayName: null,
    });
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, signIn, signUp, signOut }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
