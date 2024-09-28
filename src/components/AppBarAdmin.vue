<template>
  <div>
    <v-app-bar absolute color="white" elevate-on-scroll app elevation="0" light>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <!-- Logo Left -->
      <v-row class="mx-4">
        <v-col :cols="auto" class="text-right">
          <Login />
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- DRAWER -->
    <v-navigation-drawer v-model="drawer" temporary fixed
      min-width="250"
    >
      <v-card
        class="mx-auto"
        variant="flat"
      >
        <v-list lines="one">
          <v-list-item
            title="Home"
            to="/"
          ></v-list-item>
          <v-list-item
            title="Admin"
            to="/admin"
          ></v-list-item>
        </v-list>
        <v-row dense v-show="isAuthenticated">
          <v-col dense class="ma-2 text-center">
              <v-btn class="font-weight-thin" @click="logout()" variant="tonal">sair<v-icon>mdi-out</v-icon></v-btn>
          </v-col>
        </v-row>
      
      </v-card>


     </v-navigation-drawer> 
  </div>
</template>
<script setup>
import Login from './Login.vue'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/userStore'; // Importa a store

const userStore = useUserStore();
const drawer = ref(false)
const isAuthenticated = computed(() => userStore.isAuthenticated);

// Função de logout
const logout = () => {
  userStore.logout(); // Faz o logout usando a store
};

</script>
            
<style scope>
/* styles.css */
.my-link {
  color: grey;
  /* Modifique para a cor desejada */
  text-decoration: none;
  /* Remova a decoração de texto sublinhado */
}

.my-link:hover {
  color: rgb(39, 39, 39);
  /* Modifique para a cor desejada ao passar o mouse */
}
</style>
            