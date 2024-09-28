import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../firebase.js'; // Importa o auth e o googleProvider
import { useUserStore } from '../stores/userStore.js'; // Importa a store de usuário

export const signInWithGoogle = async () => {
  const userStore = useUserStore(); // Acessa a store de usuário

  try {
    // Usa o método de popup para login com o Google
    const result = await signInWithPopup(auth, googleProvider);
    // Obtém as informações do usuário autenticado
    const user = result.user;
    const token = await user.getIdToken(); // Obtém o token de autenticação do Firebase
    
    // Armazena os dados do usuário e o token na store
    userStore.setUser(user);

    // Armazena o token no sessionStorage
    sessionStorage.setItem('authToken', token);

    console.log('Usuário logado com sucesso:', user);
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error);
  }
};
