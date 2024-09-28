<template>
    <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props }">
            <v-btn @click="crud(action)" class="mx-1" variant="outlined" size="x-small" v-bind="props">{{ action }}</v-btn>
        </template>

        <v-card>
            <v-card-title class="text-center">Manutenção - {{ item.nome }}</v-card-title>
            <v-card-text v-if="action === listar">
                <v-data-table
                    :headers="headers"
                    :items="lista"
                    item-value="id"
                    class="elevation-1"
                    density="compact"
                >
                <template v-slot:item.edit="{ item }">
                    <v-btn
                        icon
                        variant="plain"
                        @click=actions(item.props.title)>
                        <v-icon >mdi-pencil</v-icon>
                    </v-btn>
                        
                </template>
            </v-data-table>
            </v-card-text>
            <v-card-text v-if="action !== listar">
                <v-row dense v-for="(v, k) in item.fields" :key="k">
                    <v-row v-show="v.verbose_name">
                        <v-col v-show="condicao_char_text_fields(v.type)">
                            <div v-if="field_type(v.field)">
                                <v-text-field :label="v.verbose_name" v-show="!condicao(v.field)"
                                    v-model="objeto[v.field]"
                                    :type="showPassword ? '' : 'password'"
                                    :append-inner-icon="showPassword ? 'mdi mdi-eye' : 'mdi mdi-eye-off'"
                                    @click:append-inner="togglePasswordVisibility" clearable>
                                </v-text-field>
                            </div>
                            <div v-else>
                                <v-text-field 
                                    v-model="objeto[v.field]"
                                    :label="v.verbose_name" 
                                    v-show="!condicao(v.field)" 
                                    clearable
                                >
                                </v-text-field>
                            </div>
                        </v-col>
                        <v-col v-show="condicao_foreignkey(v.type)">
                            <v-autocomplete :label="v.verbose_name" v-show="!condicao(v.field)" clearable>
                            </v-autocomplete>
                        </v-col>
                    </v-row>
                    <!-- {{ v.type }} -->
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col class="text-end">
                        <v-btn color="primary" @click="crud(action)">{{ action }}</v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import api from '@/http';
import { ref, defineProps, onMounted } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
// import fs from '../enginer'
// fs
const props = defineProps({
    action: { type: String },
    app: { type: String },
    item: {
        type: Object,
        default: () => (null)
    }
});

const dialog = ref(false);
const loading_lista = ref(false);
const objeto = ref({});
const headers = ref([]);
const lista = ref([]);
const listar = ref('view')
const items = ref(['created_at', 'created_by', 'modified_at', 'modified_by']);

const condicao = (str) => items.value.includes(str);
const actions = (obj) => obj;
const char_text = ref(['CharField', 'TextField', 'BigAutoField']);
const condicao_char_text_fields = (str) => char_text.value.includes(str);
const foreingkey = ref(['ForeignKey']);
const condicao_foreignkey = (str) => foreingkey.value.includes(str);
const field_type = (str) => str === 'password' ? true : false;

const showPassword = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};


const crud = async (action) => {
    try {
        if (action === 'add') {
            await apiPostCreate(); // Chamada à função de criação usando api.post
        }
        if (action === 'view') {
            lista.value = []
            loading_lista.value = true;
            await apiList(); // Chamada à função de criação usando api.post
        }
        
        // Outras ações (listar, atualizar, apagar) podem ser adicionadas aqui
    } catch (error) {
        console.error('Erro:', error);
    }
};

const apiPostCreate = async () => {

  try {
    const response = await api.post(`${props.app}/${props.app}/`,objeto.value);
} catch (error) {
    console.error('Erro ao criar:', error);
}
loading_lista.value = false
};

const apiList = async () => {
    try {
        const response = await api.get(`${props.app}/${props.app}/`);
        lista.value = response.data
        
        Object.keys(response.data[0]).forEach(i=>{
            headers.value.push({title:i,key:i})
        })
        headers.value.push({title:'edit',key:'edit'})
        console.log(headers.value)
    } catch (error) {
        console.error('Erro ao criar:', error);
    }
};

onMounted(async () => {
    // this.fs
    if (props.item && props.item.fields) {
        await Promise.all(props.item.fields.map(async val => {
            objeto.value[val.field] = null;
            if (val.type === "ForeignKey") {
                try {
                    const response = await api.get(`${props.app}/${val.field}s/`);
                } catch (error) {
                    // console.error(`Erro ao obter dados para o módulo ${val}:`, error);
                }
            }
        }));
    }
});

</script>