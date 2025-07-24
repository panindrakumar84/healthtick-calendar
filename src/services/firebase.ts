import { firebaseConfig } from '../firebase/firebaseConfig';
import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps, getApp  } from 'firebase/app';

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
console.log("Using projectId:", firebaseConfig.projectId);

const db = getFirestore(app);

export {db};