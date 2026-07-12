import { getFunctions, type Functions } from "firebase/functions";
import { app } from "./firebaseConfig";

export const functions: Functions | null = app ? getFunctions(app) : null;
