import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firestore";

export type AdmissionPayload = {
  studentName: string;
  parentName: string;
  phone: string;
  classLevel: string;
  course: string;
  branch: string;
  source: string;
  createdAt?: unknown;
};

export async function submitAdmission(payload: AdmissionPayload) {
  if (!db) {
    throw new Error("Firebase Firestore is unavailable.");
  }

  return addDoc(collection(db, "admissions"), {
    ...payload,
    createdAt: serverTimestamp(),
  });
}
