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

const roleCollections: Array<{ collection: string; role: UserRole }> = [
  { collection: "students", role: "student" },
  { collection: "teachers", role: "teacher" },
  { collection: "parents", role: "parent" },
  { collection: "admins", role: "admin" },
];

export async function getUserRoleProfile(uid: string) {
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
  await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
  const result = await signInWithEmailAndPassword(auth, email, password);
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
}

export async function signUpWithRole(email: string, password: string, role: UserRole, extra: Record<string, unknown> = {}) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
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
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const currentUser = auth.currentUser;
  if (!currentUser?.email) {
    throw new Error("Please sign in again before updating your password.");
  }

  const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
  await reauthenticateWithCredential(currentUser, credential);
  await updatePassword(currentUser, newPassword);
}

export async function updateUserStatus(uid: string, status: "Active" | "Suspended") {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { status, updatedAt: new Date().toISOString() });
}

export async function assignTeacherCourse(uid: string, courseName: string) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { course: courseName, updatedAt: new Date().toISOString() });
}

export async function approveAdmission(admissionId: string) {
  const ref = doc(db, "admissions", admissionId);
  await updateDoc(ref, { status: "Approved", updatedAt: new Date().toISOString() });
}

export async function rejectAdmission(admissionId: string) {
  const ref = doc(db, "admissions", admissionId);
  await updateDoc(ref, { status: "Rejected", updatedAt: new Date().toISOString() });
}
