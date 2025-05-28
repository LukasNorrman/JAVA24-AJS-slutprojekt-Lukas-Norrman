import { getDatabase, ref } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLZ_3qqnjn3k0PyF1QyPWdcF_JeMSgXrE",
  authDomain: "scrumboard-6e236.firebaseapp.com",
  databaseURL: "https://scrumboard-6e236-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "scrumboard-6e236",
  storageBucket: "scrumboard-6e236.firebasestorage.app",
  messagingSenderId: "271310873348",
  appId: "1:271310873348:web:f122a425556e74ed266651"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };