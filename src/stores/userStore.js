// stores/userStore.js
import { defineStore } from 'pinia';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user, // Verifica se o usuário está autenticado
    userEmail: (state) => state.user?.email || '',
    userDisplayName: (state) => state.user?.displayName || '',
    userPhotoURL: (state) => state.user?.photoURL || '',
  },
  actions: {
    // Define o usuário e salva o token
    setUser(user) {
      this.user = user;
    },

    // Recupera o usuário quando há um token disponível
    async fetchUser() {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        this.user = currentUser;
        this.token = await currentUser.getIdToken();
        sessionStorage.setItem('authToken', this.token); // Salva o token no sessionStorage
      } else {
        this.user = null;
        this.token = null;
        sessionStorage.removeItem('authToken'); // Remove o token do sessionStorage
      }
    },

    // Tenta recuperar o usuário a partir do token armazenado
    async checkForSavedToken() {
      const savedToken = sessionStorage.getItem('authToken');
      if (savedToken) {
        // Faz a recuperação dos dados do usuário utilizando o Firebase Auth
        const auth = getAuth();
        return new Promise((resolve, reject) => {
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              this.setUser(user);
              this.token = savedToken;
              resolve(true);
            } else {
              this.logout();
              reject(false);
            }
          });
        });
      }
    },

    // Faz o logout do usuário
    async logout() {
      const auth = getAuth();
      await signOut(auth);
      this.user = null;
      this.token = null;
      sessionStorage.removeItem('authToken'); // Remove o token do sessionStorage
    }
  }
});
