import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseAuth";
import { db } from "../firebase/firestore";

type UserRole = "student" | "teacher" | "parent" | "admin";

export async function signInWithRole(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, "users", result.user.uid));
  const role = (userDoc.data()?.role as UserRole | undefined) ?? "student";
  const deviceId = (userDoc.data()?.currentDeviceId as string | undefined) ?? "";
  const thisDeviceId = typeof window !== "undefined" ? window.navigator.userAgent : "desktop";

  if (role === "student" && deviceId && deviceId !== thisDeviceId) {
    throw new Error("This account is already active on another device.");
  }

  await setDoc(doc(db, "users", result.user.uid), {
    uid: result.user.uid,
    email: result.user.email,
    role,
    currentDeviceId: thisDeviceId,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  return { uid: result.user.uid, role };
}

export async function signUpWithRole(email: string, password: string, role: UserRole, extra: Record<string, unknown> = {}) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const thisDeviceId = typeof window !== "undefined" ? window.navigator.userAgent : "desktop";
  const docRef = doc(db, "users", result.user.uid);
  await setDoc(docRef, {
    uid: result.user.uid,
    email,
    role,
    status: "Active",
    currentDeviceId: thisDeviceId,
    createdAt: new Date().toISOString(),
    ...extra,
  }, { merge: true });
  return { uid: result.user.uid, role };
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
