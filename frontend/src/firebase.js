import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxPMusZaoo7UM64g3s7ITCrsNzo5jP334",
  authDomain: "bookify-27103.firebaseapp.com",
  projectId: "bookify-27103",
  storageBucket: "bookify-27103.firebasestorage.app",
  messagingSenderId: "520388217381",
  appId: "1:520388217381:web:6cb7828e00bcfb11088dcc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ LOGIN + RETURN TOKEN
export const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  const token = await result.user.getIdToken();

  return token; // ← VERY IMPORTANT
};
