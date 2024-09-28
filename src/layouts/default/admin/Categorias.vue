<template>
    <v-container>
        Admin / categoria
        <v-row dense class="mb-2">
            <v-col class="text-right" :cols="11">
                <v-btn color="blue" variant="tonal" icon @click="openModal(item)">
                    <v-icon>mdi-plus</v-icon> <!-- Ícone de lápis -->
                </v-btn>
            </v-col>
            <v-col class="text-right" :cols="1">
                <v-btn color="grey" variant="tonal" icon @click="fetchItems()">
                    <v-icon>mdi-refresh</v-icon> <!-- Ícone de lápis -->
                </v-btn>
            </v-col>

        </v-row>
        <v-row class="ma-auto">
            <v-data-table :loading="loading" :items="categorias" :headers="categoriaColumns" >
                <template v-slot:[`item.actions`]="{ item }">
                    <!-- Botão para abrir o modal de edição -->
                    <v-btn color="orange" variant="tonal" icon @click="openModal(item)">
                        <v-icon>mdi-pencil</v-icon> <!-- Ícone de lápis -->
                    </v-btn>
                </template>
            </v-data-table>
        </v-row>
        <EditModal :categoria="categoriaSelecionada" v-model:dialog="dialog">
            <v-btn>click</v-btn>
        </EditModal>
        <!-- <snackbar/> -->
    </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriasStore } from '@/stores/categoriasStore'
import { computed } from 'vue';
import EditModal from './components/Edit.vue';
// import Snackbar from '@/components/Snackbar.vue';

const categoriaSelecionada = ref(null); // Categoria que será editada
const dialog = ref(false);

const categoriaStore = useCategoriasStore();

const categorias = computed(() => categoriaStore.categorias)
const categoriaColumns = computed(() => categoriaStore.categoriaColumns);
const loading = computed(() => categoriaStore.loading);

const fetchItems = async () => {
    categoriaStore.fetchCategorias(); // Busca as categorias através da API
};

onMounted(() => {
  fetchItems();
});

// Função chamada ao clicar na linha da tabela
const openModal = (categoria={}) => {
  categoriaSelecionada.value = categoria; // Define a categoria que será editada
  dialog.value = true; // Abre o modal
};

</script>

<style scoped>
.v-img {
  border-radius: 8px;
}
</style>