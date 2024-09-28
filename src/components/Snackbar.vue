<template>
    <div>
      <!-- Restante do template -->
  
      <!-- Snackbar para exibir as notificações de erro -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="5000" top right>
        {{ snackbar.message }}
        <v-btn color="white" text @click="closeSnackbar">Fechar</v-btn>
      </v-snackbar>
    </div>
  </template>
  
  <script>
  import { useCategoriasStore } from '@/stores/categorias';
  
  export default {
    setup() {
      const categoriasStore = useCategoriasStore();
  
      return {
        snackbar: categoriasStore.snackbar,
        closeSnackbar: categoriasStore.closeSnackbar,
      };
    },
  };
  </script>
  