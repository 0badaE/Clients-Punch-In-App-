import { initializeApp } from "firebase/app";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD_K_vbfmxryVOv-IGa8ZS-KVaJpFenveA",
  authDomain: "clock-in-app-6a37d.firebaseapp.com",
  projectId: "clock-in-app-6a37d",
  storageBucket: "clock-in-app-6a37d.appspot.com",
  messagingSenderId: "593390078017",
  appId: "1:593390078017:web:010d07ee9f910d3d9c9ec0",
  measurementId: "G-7XTCBD87L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)




