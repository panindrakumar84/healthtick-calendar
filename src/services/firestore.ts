
import { db } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  type WithFieldValue,
  type DocumentData,
} from "firebase/firestore";

type FireStoreDoc<T> = T & { id: string };

async function addDocTyped<T extends DocumentData>(collectionName: string, data: WithFieldValue<T>): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

async function getDocTyped<T>(collectionName: string, id: string): Promise<FireStoreDoc<T> | null> {
  const docSnap = await getDoc(doc(db, collectionName, id));
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as FireStoreDoc<T> : null;
}

async function updateDocTyped<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
  await updateDoc(doc(db, collectionName, id), data);
}

async function deleteDocTyped(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id));
}

async function getDocsTyped<T>(collectionName: string): Promise<FireStoreDoc<T>[]> {
  const snapshot = await getDocs(collection(db, collectionName));
  const docs: FireStoreDoc<T>[] = [];
  snapshot.forEach((docSnap) => {
    docs.push({ id: docSnap.id, ...docSnap.data() } as FireStoreDoc<T>);
  });
  return docs;
}

async function queryDocsTyped<T>(collectionName: string, ...constraints: Parameters<typeof where>[]): Promise<FireStoreDoc<T>[]> {
  const q = query(collection(db, collectionName), ...constraints.map((c) => where(...c)));
  const snapshot = await getDocs(q);
  const docs: FireStoreDoc<T>[] = [];
  snapshot.forEach((docSnap) => {
    docs.push({ id: docSnap.id, ...docSnap.data() } as FireStoreDoc<T>);
  });
  return docs;
}

export {
  addDocTyped,
  getDocTyped,
  updateDocTyped,
  deleteDocTyped,
  getDocsTyped,
  queryDocsTyped,
};
