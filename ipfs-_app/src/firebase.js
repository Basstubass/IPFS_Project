// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ37m40-5qRqaU8K3www9i4WUBkChQwR4",
  authDomain: "ipfs-filemanage.firebaseapp.com",
  projectId: "ipfs-filemanage",
  storageBucket: "ipfs-filemanage.appspot.com",
  messagingSenderId: "855616668144",
  appId: "1:855616668144:web:5a9d35fb71ce520c0bdd35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;