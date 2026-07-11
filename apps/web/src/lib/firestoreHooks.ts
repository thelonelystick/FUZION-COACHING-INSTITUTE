import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, type FirestoreError } from "firebase/firestore";
import { db } from "../firebase/firestore";

export function useAdmissions() {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "admissions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (firestoreError: FirestoreError) => {
        setError(firestoreError.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { items, loading, error };
}

export function useDashboardStats(collectionName: string) {
  const [items, setItems] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      },
      (firestoreError: FirestoreError) => {
        setError(firestoreError.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [collectionName]);

  return { items, loading, error };
}
