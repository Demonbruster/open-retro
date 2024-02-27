// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOGSResIZwIALSJvWWk0FBRsqkZ7f4q74",
  authDomain: "open-retro-7e232.firebaseapp.com",
  projectId: "open-retro-7e232",
  storageBucket: "open-retro-7e232.appspot.com",
  messagingSenderId: "933621571253",
  appId: "1:933621571253:web:ad99c8f4de08bf572228fc",
  measurementId: "G-HW09TQ2D4C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {
  auth
}

