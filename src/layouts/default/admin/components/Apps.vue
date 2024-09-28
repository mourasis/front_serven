<template>
    <v-container>
      <btn-voltar destinationUrl="/" label="Home"/>
      <v-row dense>
        <v-col dense v-for="(v,k) in lista" :key="`app-id${k}`" cols="3" class="ma-2">
          <v-card :to="v.url_params" width="200" height="150">
            <v-card-title><v-icon class="mx-2">{{ v.icon }}</v-icon>{{ v.nome }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script setup>
import api from '@/http';
import BtnVoltar from './btn_voltar.vue';
import { ref, onMounted, onErrorCaptured } from 'vue';


const lista = ref([]);

// Método para buscar a lista de itens
const getLista = async (url, lista) => {
  try {
    const response = await api.get(url);
    lista.value = response.data.results;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Chamada do método no ciclo de vida onMounted
onMounted(() => {
  getLista('app/listar/', lista);
});

// Captura de erros
onErrorCaptured(error => {
  console.error('Error in component:', error);
});
</script>
  
<style>
.my_grey{
    background-color: black;
}
.bordered-card-text {
  border: 1px solid #ccc;
  padding: 10px; /* Opcional, para espaçamento interno */
}
</style>
