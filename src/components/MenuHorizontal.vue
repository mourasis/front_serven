<template>
  <v-container fluid>
    <v-card :loading="loading" dense variant="flat" class="text-button" color="my_green_1">
      <v-row dense class="text-center">
        <v-col dense :cols="collums">
          <v-btn variant="plain" to="/" class="ma-2 pa-1">Home</v-btn>
        </v-col>
        <!-- Renderiza apenas as categorias que têm produtos -->
        <v-col dense v-for="(v, k) in items" :key="`m${k}`" :cols="collums">
          <v-btn :loading="loading" variant="plain" :to="`/categoria/${v.params}/${v.id}`" class="ma-2 pa-1">
            {{ v.nome }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getItems } from '../service/crudService.js'; // Importa a função atualizada do crudService.js
import { useProdutosStore } from '@/stores/produtosStore.js';

const produtosStore = useProdutosStore();

const items = ref([]);
const loading = ref(true);

const countProdutosPorCategoria = async (params = null) => {
  try {
    await produtosStore.countProdutos(params); // Busca os produtos relacionados com a categoria
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};

// Função para buscar todas as categorias e verificar se têm produtos
const fetchItems = async () => {
  try {
    const tmp = await getItems('categorias'); // Busca as categorias através da API
    const filteredCategories = [];

    // Itera sobre cada categoria e verifica se há produtos associados
    for (const e of tmp) {
      if (e.ativo) {
        // Busca produtos com a categoria atual
        await countProdutosPorCategoria({ count: true, field: 'categoria_id', value: e.id });

        // Verifica se a categoria tem produtos
        if (produtosStore.resumo.count > 0) {
          filteredCategories.push(e); // Adiciona a categoria à lista apenas se tiver produtos
        }
      }
    }

    items.value = filteredCategories;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
  } finally {
    loading.value = false;
  }
};

// Computed para definir o número de colunas
const collums = computed(() => 2);

// Chama a função fetchItems quando o componente é montado
onMounted(fetchItems);
</script>
