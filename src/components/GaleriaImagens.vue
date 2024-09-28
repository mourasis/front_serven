<template>
  <v-container class="ma-auto scroll-card">
    <v-row dense>
      <v-col cols="12">Imagens do produto: {{ produto.nome }} </v-col>
      <v-col v-for="(image, index) in produto.imagens" :key="index" cols="12" sm="6" md="2">
        <v-card :loading="loading" class="ma-auto pa-2" variant="tonal">
          
          <v-img :src="image" class="gallery-image" max-height="250" aspect-ratio="2.5" alt="Image"
          :loading="loading">
          
          </v-img>
          <v-btn icon size="small" @click="excluir_imagem(index)" variant="plain" color="grey">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="string" label="Search" preppend="mdi-magnify"></v-text-field>
      </v-col>
      <v-col>
        <v-btn @click="saveproduto()">atualizar</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">Galeria de imagens</v-col>

      <v-col v-for="(image, index) in resultados" :key="index" cols="12" sm="6" md="4">
        <v-card :loading="loading" class="ma-auto pa-2" variant="tonal">

          <v-img :src="image" class="gallery-image" max-width="400" max-height="250" aspect-ratio="2.5" alt="Image"
            :loading="loading">

            <v-checkbox :checked="true" v-model="produto.imagens" color="blue" :value="image" hide-details></v-checkbox>

          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '@/http'; // Importando o 'http' da sua configuração
import { useProdutosStore } from '@/stores/produtosStore'; // Importa a store de produtos

const produtoStore = useProdutosStore()

const props = defineProps({
  produto: Object,
  dialog: Boolean,
});

const localDialog = ref(props.dialog);

// Variável reativa para armazenar as imagens
const images = ref([]);
const loading = ref(true)
const string = ref('')

// Função para buscar as imagens do backend
const fetchImages = async () => {
  try {
    const response = await api.get('/imagem/listar');
    images.value = response.data; // Armazenar as URLs das imagens
  } catch (error) {
    console.error('Erro ao buscar imagens:', error);
  } finally {
    loading.value = false; // Conclui o carregamento, independentemente do sucesso ou erro
  }

};    

const resultados = computed(() => {
  const searchTerm = string.value || ''; // Garante que searchTerm seja sempre uma string

  // Se o termo de busca for vazio ou menor que 3 caracteres, retorna todas as imagens
  if (searchTerm === '' || searchTerm.length <= 3) {
    return images.value;
  }

  // Filtra as imagens e ignora aquelas que não têm o campo 'name'
  return images.value.filter(image => {
    const imageName = image || ''; // Garante que image.name seja uma string válida
    console.log(imageName, searchTerm)
    return imageName.toLowerCase().includes(searchTerm.toLowerCase());
  });
});

const saveproduto = async () => {

try {
    if (props.produto.id !== undefined) {
        await produtoStore.updateProduto(props.produto); // Chama o método updateproduto
    }
    else {
        await produtoStore.postProduto(props.produto); // Chama o método updateproduto
    }
  } catch (error) {
    console.error('Erro ao salvar a produto:', error);
  }
};

const excluir_imagem = (indice) => {
  // Verifica se o índice está dentro dos limites do array
  if (indice >= 0 && indice < props.produto.imagens.length) {
    // Remove o elemento no índice especificado
    props.produto.imagens.splice(indice, 1);
    console.log('Imagem removida com sucesso!');
  } else {
    console.log('Índice inválido.');
  }
}


// Chama a função assim que o componente é montado
onMounted(() => {
  fetchImages();
});

</script>

<style scoped>
.gallery-image {
  border-radius: 8px;
  overflow: hidden;
}

.scroll-card {
  overflow-y: auto;
  /* Permite rolagem vertical */
  overflow-x: hidden;
  /* Evita a rolagem horizontal */
}
</style>
