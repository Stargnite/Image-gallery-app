import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt_N_hKeSsLWW5NioMZJfHfj2N5h613as",
  authDomain: "image-gallery-8ece4.firebaseapp.com",
  projectId: "image-gallery-8ece4",
  storageBucket: "image-gallery-8ece4.appspot.com",
  messagingSenderId: "655391099947",
  appId: "1:655391099947:web:afb9b998ef051bac142e6e"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app)
