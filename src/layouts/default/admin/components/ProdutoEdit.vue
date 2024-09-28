<template>
    <v-dialog v-model="localDialog" min-width="600" >
        <v-card :loading="loading" class="ma-2">
            
            <v-btn @click="localDialog=false"><v-icon>mdi-close</v-icon></v-btn>   
            <v-tabs v-model="tab" bg-color="my_green_1">
                <v-tab value="one">Geral</v-tab>
                <v-tab value="two">Imagens</v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                    <v-card class="scroll-card" max-height="600">
                        <v-card-title>
                            Editar Produto
                        </v-card-title>
                        <v-card-text>
                            <v-text-field :loading="loading" v-show="produtoEdit.id !== undefined"
                            :readonly="produtoEdit.id !== undefined" v-model="produtoEdit.id"
                            label="ID"></v-text-field>
                            <v-autocomplete 
                                :loading="loading" 
                                v-model="produtoEdit.categoria_id" 
                                label="Categoria"
                                :items="categorias"
                                item-value="id"
                                item-title="nome"
                                >
                            </v-autocomplete> 
                            
                            <v-autocomplete 
                                :loading="loading" 
                                v-model="produtoEdit.tipo" 
                                label="Tipo"
                                :items="tipos"
                                >
                            </v-autocomplete>
                            
                            <v-row v-show="produtoEdit.tipo==='evento'">
                                <v-col>
                                    <v-text-field :loading="loading" v-model="produtoEdit.inicio" type="date" label="Inicio"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field :loading="loading" v-model="produtoEdit.fim" type="time" label="fim"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-text-field :loading="loading" v-model="produtoEdit.imagem" label="Nome"></v-text-field>
                            <v-text-field :loading="loading" v-model="produtoEdit.ordem" label="Ordem"
                                type="number"></v-text-field>
                            <v-switch :loading="loading" v-model="produtoEdit.ativo" label="Ativo"
                                color="primary"></v-switch>
                            <v-textarea :loading="loading" v-model="produtoEdit.observacoes"
                                label="Observacoes"></v-textarea>
                                
                            
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" :loading="loading" @click="saveProduto()">Salvar</v-btn>
                            <v-btn @click="closeModal">Cancelar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-tabs-window-item>
                <v-tabs-window-item value="two">
                    <v-card class="scroll-card" max-height="600">
                        <v-card-tex>
                            <UploadFile />
                            <GaleriaImagens :produto="produtoEdit" />
                        </v-card-tex>
                    </v-card>
                </v-tabs-window-item>
            </v-tabs-window> 
        
        </v-card>

    </v-dialog>
</template>

<script setup>
import UploadFile from '@/components/UploadFile.vue';
import GaleriaImagens from '@/components/GaleriaImagens.vue';
import { useProdutosStore } from '@/stores/produtosStore';
import { useCategoriasStore } from '@/stores/categoriasStore';
import { ref, watch, computed, onMounted } from 'vue';

const categoriaStore = useCategoriasStore(); // Chama a store
const categorias = computed(() => categoriaStore.categorias);
const produtoStore = useProdutosStore(); // Chama a store
const loading = computed(() => produtoStore.loading)

// Recebe as props do pai
const props = defineProps({
    produto: Object,
    dialog: Boolean,
});

const emit = defineEmits(['update:dialog']);
const tab = ref(null)
const tipos = ref(['evento', 'produto'])
const produto = ref({
    nome: null,
    ordem: null,
    imagens: null,
    ativo: true,
    params: null,
    observacoes: null
})
// Clona o objeto para evitar modificar o original diretamente
const temp = ref({ ...props.produto });

const produtoEdit = temp !== undefined ? temp : produto
// Localmente, vamos controlar o estado do modal
const localDialog = ref(props.dialog);

// Observa mudanças na prop 'produto' e atualiza 'produtoEdit'
watch(() => props.produto, (newProduto) => {
    produtoEdit.value = { ...newProduto };
});

// Observa mudanças no 'dialog' vindo do pai
watch(() => props.dialog, (newDialogState) => {
    localDialog.value = newDialogState;
});

// Atualiza o pai quando o valor de 'localDialog' mudar
watch(localDialog, (newVal) => {
    emit('update:dialog', newVal);
});

function convertDateTime(dateString, TimeString) {
  const dateObject = new Date(`${dateString}T${TimeString}`);

  // Segundos desde o Epoch
  const _seconds = dateObject.getTime() / 1000;

  // Nanossegundos desde o Epoch
  const _nanoseconds = dateObject.getTime() * 1000000;

  return { _seconds, _nanoseconds };
}

const saveProduto = async () => {
    console.log(produtoEdit.value)
    produtoEdit.value.inicio = convertDateTime(produtoEdit.value.inicio._nanoseconds,produtoEdit.value.inicio._seconds);
    produtoEdit.value.fim = convertDateTime(produtoEdit.value.fim._nanoseconds,produtoEdit.value.fim._seconds);
    console.log(produtoEdit.value.inicio, produtoEdit.value.fim)
    try {
        if (produtoEdit.value.id !== undefined) {
            await produtoStore.updateProduto(produtoEdit.value); // Chama o método updateproduto
        }
        else {
            await produtoStore.postProduto(produtoEdit.value); // Chama o método updateproduto
        }
        closeModal();
    } catch (error) {
        console.error('Erro ao salvar a produto:', error);
    }
};

const fetchCategorias = async () => {
    categoriaStore.fetchCategorias(); 
}

// Fecha o modal
const closeModal = () => {
    localDialog.value = false;
};

onMounted(()=>{
    fetchCategorias();
});

</script>
<style scoped>

.scroll-card {
    overflow-y: auto; /* Permite rolagem vertical */
    overflow-x: hidden; /* Evita a rolagem horizontal */
  }
</style>