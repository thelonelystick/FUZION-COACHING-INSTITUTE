import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseAuth";
import { db } from "../firebase/firestore";

export type UserRole = "student" | "teacher" | "parent" | "admin";

function ensureAuth() {
  if (!auth) {
    throw new Error("Authentication service unavailable. Please check your Firebase configuration.");
  }
  return auth;
}

function mapAuthError(error: unknown) {
  const code = typeof error === "object" && error !== null && "code" in error ? String((error as { code?: string }).code) : "";

  switch (code) {
    case "auth/configuration-not-found":
    case "auth/internal-error":
      return "Authentication service unavailable. Please try again shortly.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-login-credentials":
      return "Incorrect email or password.";
    case "auth/network-request-failed":
      return "Network connection lost. Please check your connection and try again.";
    case "auth/user-disabled":
      return "Account disabled. Please contact support.";
    case "auth/permission-denied":
      return "Access denied.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return error instanceof Error ? error.message : "Please try again.";
  }
}

const roleCollections: Array<{ collection: string; role: UserRole }> = [
  { collection: "students", role: "student" },
  { collection: "teachers", role: "teacher" },
  { collection: "parents", role: "parent" },
  { collection: "admins", role: "admin" },
];

export async function getUserRoleProfile(uid: string) {
  if (!db) {
    return { role: null as UserRole | null, status: undefined };
  }

  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    const data = userDoc.data() as { role?: UserRole; status?: string } | undefined;
    if (data?.role) {
      return { role: data.role as UserRole, status: data.status };
    }
  }

  for (const entry of roleCollections) {
    const roleDoc = await getDoc(doc(db, entry.collection, uid));
    if (roleDoc.exists()) {
      const data = roleDoc.data() as { role?: UserRole; status?: string } | undefined;
      return { role: data?.role ?? entry.role, status: data?.status };
    }
  }

  return { role: null as UserRole | null, status: undefined };
}

export async function signInWithRole(email: string, password: string, rememberMe = true) {
  const activeAuth = ensureAuth();

  try {
    if (!db) {
      throw new Error("Authentication service unavailable. Please check your Firebase configuration.");
    }

    await setPersistence(activeAuth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    const result = await signInWithEmailAndPassword(activeAuth, email, password);
    const profile = await getUserRoleProfile(result.user.uid);
    const role = profile.role ?? "student";
    const deviceId = typeof window !== "undefined" ? window.navigator.userAgent : "desktop";

    await setDoc(
      doc(db, "users", result.user.uid),
      {
        uid: result.user.uid,
        email: result.user.email,
        role,
        currentDeviceId: deviceId,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return { uid: result.user.uid, role, status: profile.status };
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
}

export async function signUpWithRole(email: string, password: string, role: UserRole, extra: Record<string, unknown> = {}) {
  const activeAuth = ensureAuth();

  try {
    if (!db) {
      throw new Error("Authentication service unavailable. Please check your Firebase configuration.");
    }

    const result = await createUserWithEmailAndPassword(activeAuth, email, password);
    const thisDeviceId = typeof window !== "undefined" ? window.navigator.userAgent : "desktop";
    const userid = result.user.uid;
    const docRef = doc(db, "users", userid);
    await setDoc(
      docRef,
      {
        uid: userid,
        email,
        role,
        status: "Active",
        currentDeviceId: thisDeviceId,
        createdAt: new Date().toISOString(),
        ...extra,
      },
      { merge: true }
    );

    const roleCollection = role === "student" ? "students" : role === "teacher" ? "teachers" : role === "parent" ? "parents" : "admins";
    await setDoc(
      doc(db, roleCollection, userid),
      {
        uid: userid,
        email,
        role,
        status: "Active",
        createdAt: new Date().toISOString(),
        ...extra,
      },
      { merge: true }
    );

    return { uid: result.user.uid, role };
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
}

export async function sendPasswordReset(email: string) {
  const activeAuth = ensureAuth();

  try {
    await sendPasswordResetEmail(activeAuth, email);
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const activeAuth = ensureAuth();
  const currentUser = activeAuth.currentUser;
  if (!currentUser?.email) {
    throw new Error("Please sign in again before updating your password.");
  }

  try {
    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
  } catch (error) {
    throw new Error(mapAuthError(error));
  }
}

export async function updateUserStatus(uid: string, status: "Active" | "Suspended") {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  const ref = doc(db, "users", uid);
  await updateDoc(ref, { status, updatedAt: new Date().toISOString() });
}

export async function assignTeacherCourse(uid: string, courseName: string) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  const ref = doc(db, "users", uid);
  await updateDoc(ref, { course: courseName, updatedAt: new Date().toISOString() });
}

export async function approveAdmission(admissionId: string) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  const ref = doc(db, "admissions", admissionId);
  await updateDoc(ref, { status: "Approved", updatedAt: new Date().toISOString() });
}

export async function rejectAdmission(admissionId: string) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  const ref = doc(db, "admissions", admissionId);
  await updateDoc(ref, { status: "Rejected", updatedAt: new Date().toISOString() });
}
