<template>
    <v-container>
        Categoria / {{ nome }}
        <v-row class="ma-auto">
            <v-col v-for="(v, k) in produtos" :key="k">
                <!-- <pre>{{ v.imagens.length>0 }}</pre> -->
                <v-card :loading="loading" class="ma-auto text-center" min-height="350" max-width="200">
                    
                    <div v-if="v.imagens.length>0 && v.imagens[0].length>4">
                        <v-img
                        v-if="v.imagens[0].length>0"
                        :src="v.imagens[0]"
                        alt="Imagem do Casamento"
                        min-height="200"
                        max-width="184"
                        aspect-ratio="1"
                        class="ma-2"
                        ></v-img>
                        <v-progress-circular
                        v-else
                        class="my-10"
                        indeterminate
                        color="my_green_1"
                        ></v-progress-circular>
                    </div>
                    <div v-else>
                        <v-card 
                            min-height="200"
                            variant="tonal" class="ma-2" weight="184">
                            <v-card-title class="my-12 pa-2" weight="184">Sem imagem</v-card-title>
                        </v-card>
                    </div>

                    <v-card-subtitle class="pt-4">
                       {{ v.nome }}
                    </v-card-subtitle>

                    <v-card-text v-if="v.tipo==='evento'">
                        <div>Data <v-chip :color="v.status.cor">{{ v.status.nome }}</v-chip>
                        </div>
                        <div>{{ convertTimestampToDate(v.inicio._seconds,v.inicio._nanoseconds) }}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="orange">
                            Share
                        </v-btn>

                        <v-btn color="orange">
                            Explore
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProdutosStore } from '@/stores/produtosStore';

const produtosStore = useProdutosStore();

const loading = computed(()=>produtosStore.loading);
const route = useRoute();
const id = ref(route.params.id); // Captura o parâmetro ':id' da URL
const nome = ref(route.params.nome); // Captura o parâmetro ':id' da URL
const produtos = computed(()=>produtosStore.produtos);

const fetchItems = async (params = null) => {
    try {
        await produtosStore.fetchProdutos(params); // Busca as categorias através da API
        
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
    }
    loading.value = false;
};

// Watcher para atualizar o 'params' quando a rota mudar
watch(
    () => ({ id: route.params.id, nome: route.params.nome }),
    (newParams) => {
        id.value = newParams.id;
        nome.value = newParams.nome;
        fetchItems({ field: 'categoria_id', value: `${id.value}` })
    }
);

fetchItems({ field: 'categoria_id', value: `${id.value}` })

function convertTimestampToDate(seconds, nanoseconds) {
  // Cria um objeto Date a partir dos segundos (multiplicando por 1000 para converter para milissegundos)
  const date = new Date(seconds * 1000 + Math.floor(nanoseconds / 1000000));

  // Função para adicionar zeros à esquerda, se necessário
  const padZero = (num) => num.toString().padStart(2, '0');

  // Formate o valor para dd/mm/yyyy hh:mm
  return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()} ` +
         `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
}

</script>

<style scoped>
.v-img {
  border-radius: 8px;
}
</style>