// config/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAPDz9JHW0mZ7FAnb59ddsw-gefE6ImxX0",
  authDomain: "busly-c4c07.firebaseapp.com",
  databaseURL: "https://busly-c4c07-default-rtdb.firebaseio.com",
  projectId: "busly-c4c07",
  storageBucket: "busly-c4c07.firebasestorage.app",
  messagingSenderId: "599304602393",
  appId: "1:599304602393:web:38cab2e90967ce2b447b88",
  measurementId: "G-Y1KCVZJJ0Y"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

// Exportar para usar en toda la app
export { app, analytics, auth, db };
