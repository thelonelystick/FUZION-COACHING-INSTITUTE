import { getFirestore, type Firestore } from "firebase/firestore";
import { app } from "./firebaseConfig";

export const db: Firestore | null = app ? getFirestore(app) : null;
