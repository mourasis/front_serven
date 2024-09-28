import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdvfhsHKaPfPtwnBuxPx5SjU5Y5psvmEs",
  authDomain: "loja-22785.firebaseapp.com",
  projectId: "loja-22785",
  storageBucket: "loja-22785.appspot.com",
  messagingSenderId: "605818745869",
  appId: "1:605818745869:web:3475a15c857c28fe041144",
  measurementId: "G-Z0W9MRNLFZ"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Analytics
export const analytics = getAnalytics(app);

// Inicializa e exporta o Firestore
export const db = getFirestore(app);

// Inicializa e exporta a autenticação
export const auth = getAuth(app); // Exporta a instância da autenticação

export const googleProvider = new GoogleAuthProvider(); // Provedor de autenticação Google

export const storage = getStorage(app);
