import { type Auth, getAuth } from "firebase/auth";
import { app } from "./firebaseConfig";

export const auth: Auth | null = app ? getAuth(app) : null;
