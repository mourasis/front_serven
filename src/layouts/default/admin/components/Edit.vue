<template>
    <v-dialog v-model="localDialog" min-width="600">
        <v-card :loading="loading">
            <v-card-title>
                Editar Categoria 
            </v-card-title>
            <v-card-text>
                <v-text-field :loading="loading" v-show="categoriaEdit.id!==undefined" 
                    :readonly="categoriaEdit.id!==undefined" v-model="categoriaEdit.id" label="ID"></v-text-field>
                <v-text-field :loading="loading" v-model="categoriaEdit.nome" label="Nome"></v-text-field>
                <v-text-field :loading="loading" v-model="categoriaEdit.ordem" label="Ordem" type="number"></v-text-field>
                <v-text-field :loading="loading" v-model="categoriaEdit.params" label="Parametro URL"></v-text-field>
                <v-switch :loading="loading" v-model="categoriaEdit.ativo" label="Ativo"
                color="primary"
                ></v-switch>
                <v-textarea :loading="loading" v-model="categoriaEdit.observacoes" label="Observacoes"></v-textarea>
                <!-- Outros campos para editar a categoria -->
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" :loading="loading" @click="saveCategoria()">Salvar</v-btn>
                <v-btn @click="closeModal">Cancelar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { useCategoriasStore } from '@/stores/categoriasStore';
import { ref, watch, computed } from 'vue';

const categoriasStore = useCategoriasStore(); // Chama a store
const loading = computed(() => categoriasStore.loading)
// Recebe as props do pai
const props = defineProps({
    categoria: Object,
    dialog: Boolean,
});

const emit = defineEmits(['update:dialog']);
const categoria = ref({
      nome: null,
      ordem: null,
      imagem: null,
      ativo: true,
      params:null,
      observacoes: null
    })
// Clona o objeto para evitar modificar o original diretamente
const temp = ref({ ...props.categoria });

const categoriaEdit = temp !== undefined? temp : categoria
// Localmente, vamos controlar o estado do modal
const localDialog = ref(props.dialog);

// Observa mudanças na prop 'categoria' e atualiza 'categoriaEdit'
watch(() => props.categoria, (newCategoria) => {
    categoriaEdit.value = { ...newCategoria };
});

// Observa mudanças no 'dialog' vindo do pai
watch(() => props.dialog, (newDialogState) => {
    localDialog.value = newDialogState;
});

// Atualiza o pai quando o valor de 'localDialog' mudar
watch(localDialog, (newVal) => {
    emit('update:dialog', newVal);
});


const saveCategoria = async () => {
    
    try {
        if(categoriaEdit.value.id!==undefined){
            await categoriasStore.updateCategoria(categoriaEdit.value); // Chama o método updateCategoria
        }
        else{
            await categoriasStore.postCategoria(categoriaEdit.value); // Chama o método updateCategoria
        }
        closeModal();
    } catch (error) {
        console.error('Erro ao salvar a categoria:', error);
    }
};


// Fecha o modal
const closeModal = () => {
    localDialog.value = false;
};
</script>