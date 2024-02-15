import { initializeApp } from "firebase/app";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBBioJujSnWUHBXwHnOzJB-xl1CNCrxQdU",
  authDomain: "punch-in-app-d6b16.firebaseapp.com",
  projectId: "punch-in-app-d6b16",
  storageBucket: "punch-in-app-d6b16.appspot.com",
  messagingSenderId: "898386888823",
  appId: "1:898386888823:web:012f4ae0580734f7c5de72",
  measurementId: "G-TK9JJ4F79H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)




