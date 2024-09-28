<template>
    <v-container>
        Admin / produtos
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
            <v-data-table :loading="loading" :items="produtos" :headers="produtoColumns" >
                <template v-slot:[`item.actions`]="{ item }">
                    <!-- Botão para abrir o modal de edição -->
                    <v-btn color="orange" variant="tonal" icon @click="openModal(item)">
                        <v-icon>mdi-pencil</v-icon> <!-- Ícone de lápis -->
                    </v-btn>
                </template>
                <template v-slot:[`item.imagens`]="{ item }">
                    <v-row dense class="text-center">
                        <v-col dense v-if="item.imagens!==undefined && item.imagens.length>0">
                            <v-img class="ma-1" dense :src="item.imagens[0]" height="50">
                            </v-img>
                            <v-col v-if="item.imagens.length-1>0" class="ma-0">
                                + {{ item.imagens.length-1 }} imagens
                            </v-col>
                        </v-col>
                        <v-col v-else dense>0 imagens</v-col>
                    </v-row>
                </template>
                <template v-slot:[`item.ativo`]="{item}">
                    <v-row>
                        <v-col v-if="item.ativo">
                            <v-icon color="green">mdi-check</v-icon>
                        </v-col>
                        <v-col v-else>
                            <v-icon color="red">mdi-checkbox-blank-outline</v-icon>
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:[`item.status`]="{item}">
                    <v-row>
                        <v-col :class="`text-${item.status.cor}`">{{ item.status.nome }}
                        </v-col>
                    </v-row>
                </template>
            </v-data-table>
        </v-row>
        <EditModal :produto="produtoSelecionada" v-model:dialog="dialog">
            <v-btn>click</v-btn>
        </EditModal>
        <!-- <snackbar/> -->
    </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useProdutosStore } from '@/stores/produtosStore'
import { computed } from 'vue';
import EditModal from './components/ProdutoEdit.vue';

const produtoSelecionada = ref(null); // produto que será editada
const dialog = ref(false);

const produtoStore = useProdutosStore();

const produtos = computed(() => produtoStore.produtos)
const produtoColumns = computed(() => produtoStore.produtoColumns);
const loading = computed(() => produtoStore.loading);

const fetchItems = async () => {
    try{

        produtoStore.fetchProdutos(); // Busca as produtos através da API
    }catch(error){
        console.log('Erro ao listar produtos:', error)
    }
};

onMounted(() => {
  fetchItems();
});

// Função chamada ao clicar na linha da tabela
const openModal = (produto={}) => {
  produtoSelecionada.value = produto; // Define a produto que será editada
  dialog.value = true; // Abre o modal
};

</script>

<style scoped>
.v-img {
  border-radius: 8px;
}
</style>