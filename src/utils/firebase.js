import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCBcZAu8ynFaWrxogr0bmjCreASeUnqaoo",
  authDomain: "book-management-admin-29cdb.firebaseapp.com",
  projectId: "book-management-admin-29cdb",
  storageBucket: "book-management-admin-29cdb.appspot.com",
  messagingSenderId: "1066332518961",
  appId: "1:1066332518961:web:391566610e17a55179b310",
  measurementId: "G-VP0K4HVLDP",
};

const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCBcZAu8ynFaWrxogr0bmjCreASeUnqaoo",
//   authDomain: "book-management-admin-29cdb.firebaseapp.com",
//   projectId: "book-management-admin-29cdb",
//   storageBucket: "book-management-admin-29cdb.appspot.com",
//   messagingSenderId: "1066332518961",
//   appId: "1:1066332518961:web:391566610e17a55179b310",
//   measurementId: "G-VP0K4HVLDP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
