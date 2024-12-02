import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Necesitas agregar esta importación

const firebaseConfig = {
  apiKey: "AIzaSyC-Kk4Mqx5G7Odz3MCcszKIfB10dwjvKL8",
  authDomain: "proyecto-empresarial-b8043.firebaseapp.com",
  projectId: "proyecto-empresarial-b8043",
  storageBucket: "proyecto-empresarial-b8043.firebasestorage.app",
  messagingSenderId: "322413699738",
  appId: "1:322413699738:web:2daa8a532a22ea8f9cf523",
  measurementId: "G-KMF79CNDVZ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Inicialización del almacenamiento

export { db, storage }; // Exporta también storage para que puedas usarlo en otros archivos
export const auth = getAuth(app);