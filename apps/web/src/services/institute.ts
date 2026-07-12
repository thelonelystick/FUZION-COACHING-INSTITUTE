import { addDoc, collection, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where, type DocumentData } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/functions";
import { db } from "../firebase/firestore";

export type Material = { id: string; title: string; type: "pdf" | "video" | "worksheet"; courseId: string; status: "pending" | "approved" | "rejected"; storagePath: string; createdAt?: { toDate?: () => Date } };
const rows = <T>(snap: { docs: { id: string; data: () => DocumentData }[] }) => snap.docs.map(d => ({ id: d.id, ...d.data() }) as T);
export const subscribe = <T>(path: string, callback: (items: T[]) => void, constraints: Parameters<typeof query>[1][] = []) => {
  if (!db) {
    callback([] as T[]);
    return () => undefined;
  }

  return onSnapshot(query(collection(db, path), ...constraints), s => callback(rows<T>(s)));
};
export const subscribeStudentSnapshot = (uid: string, callback: (data: DocumentData | undefined) => void) => {
  if (!db) {
    callback(undefined);
    return () => undefined;
  }

  return onSnapshot(doc(db, "students", uid), s => callback(s.data()));
};
export const subscribeMaterials = (courseId: string, callback: (items: Material[]) => void) => subscribe<Material>("materials", callback, [where("courseId", "==", courseId), where("status", "==", "approved")]);
export const subscribeUsers = (callback: (items: DocumentData[]) => void) => {
  if (!db) {
    callback([]);
    return () => undefined;
  }

  return onSnapshot(collection(db, "users"), s => callback(rows<DocumentData>(s)));
};
export const subscribeActiveSession = (uid: string, callback: (data: DocumentData | undefined) => void) => {
  if (!db) {
    callback(undefined);
    return () => undefined;
  }

  return onSnapshot(doc(db, "active_sessions", uid), s => callback(s.data()));
};
export async function requestMaterialAccess(materialId: string) {
  if (!functions) {
    throw new Error("Material access service is unavailable.");
  }

  return httpsCallable<{ materialId: string }, { url: string }>(functions, "createMaterialDownload")({ materialId });
}
export async function createMaterial(input: Omit<Material, "id" | "status" | "createdAt"> & { teacherId: string }) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return addDoc(collection(db, "materials"), { ...input, status: "pending", createdAt: serverTimestamp() });
}
export async function createTeacherResource(input: Omit<Material, "id" | "status" | "createdAt"> & { teacherId: string; externalUrl?: string }) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return addDoc(collection(db, "teacher_resources"), { ...input, status: "pending", createdAt: serverTimestamp() });
}
export async function broadcastLiveStream(input: { teacherId: string; title: string; courseId: string; streamUrl: string; description?: string }) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return addDoc(collection(db, "teacher_broadcasts"), { ...input, status: "broadcasting", createdAt: serverTimestamp() });
}
export async function updateUserStatus(uid: string, status: "active" | "suspended" | "pending approval") {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return updateDoc(doc(db, "users", uid), { status, updatedAt: serverTimestamp() });
}
export async function reviewMaterial(id: string, status: "approved" | "rejected", adminId: string) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return updateDoc(doc(db, "materials", id), { status, reviewedBy: adminId, reviewedAt: serverTimestamp() });
}
export async function saveAttempt(examId: string, studentId: string, answers: Record<string, string>, remainingSeconds: number) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return setDoc(doc(db, "examAttempts", `${examId}_${studentId}`), { examId, studentId, answers, remainingSeconds, updatedAt: serverTimestamp() }, { merge: true });
}
export async function audit(action: string, actorId: string, meta: Record<string, unknown> = {}) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return addDoc(collection(db, "auditLogs"), { action, actorId, meta, createdAt: serverTimestamp() });
}
