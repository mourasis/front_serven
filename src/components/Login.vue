<template>
    <div>
      <!-- Se o usuário estiver autenticado, exibe o nome -->
      <v-card dense variant="plain" v-if="isAuthenticated">
        <v-row class="d-flex justify-end align-center text-right">
            <v-col class="d-flex justify-end align-center text-right" :offset="9" :cols="auto">       
                {{ userName }}
            </v-col>
            <v-col class="d-flex justify-end align-center text-right" :cols="1">
                <v-img 
                    v-if="userPhoto"
                    :src="userPhoto" 
                    width="50" 
                    height="50" 
                    class="rounded-circle"
                >
                </v-img>
            </v-col>
        </v-row>
      </v-card>
  
      <!-- Se o usuário não estiver autenticado, exibe o botão de login -->
      <v-dialog v-else v-model="dialog" max-width="600" style="height: 100vh;">
        <template v-slot:activator="{ props }">
          <v-btn class="mx-1" variant="outlined" size="x-small" v-bind="props">
            login
          </v-btn>
        </template>
  
        <v-card class="ma-auto text-center" width="400">
          <v-card-title class="text-my_green_1">ACESSAR</v-card-title>
          <v-card-text>
            <v-btn @click="loginWithGoogle" color="my_green_1">
              <v-icon class="ma-2">mdi-google</v-icon>
              Login com Google
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </template>
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { signInWithGoogle } from './login'; // Função de login com Google
  import { useUserStore } from '@/stores/userStore'; // Importa a store
  
  // Obtém a store do usuário
  const userStore = useUserStore();
  const dialog = ref(false);
  
  // Computed para determinar se o usuário está autenticado
  const isAuthenticated = computed(() => userStore.isAuthenticated);
  const userName = computed(() => userStore.userDisplayName);
  const userEmail = computed(() => userStore.userEmail);
  const userPhoto = computed(() => userStore.userPhotoURL);
  
  // Carrega o usuário ao recarregar a página
  onMounted(async () => {
    await userStore.checkForSavedToken();  // Verifica o token salvo
  });
  
  // Função para login com Google
  const loginWithGoogle = async () => {
    await signInWithGoogle();  // Realiza o login
    await userStore.fetchUser();  // Atualiza os dados do usuário na store
    dialog.value = false;  // Fecha o modal após login
  };
  
  // Função de logout
  const logout = () => {
    userStore.logout(); // Faz o logout usando a store
  };
  </script>
  <style scoped>
  .v-container {
    background-color: #f0f0f0;
  }
  </style>
  