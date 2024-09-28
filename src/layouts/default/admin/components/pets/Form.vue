<template>
    <v-app>
      <v-dialog v-model="dialog" max-width="600">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon icon="mdi-plus"></v-icon>
          </v-btn>
        </template>
  
          <v-card>
            <v-card-title class="text-center">CADASTRO</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="item.nome" label="Nome do pet" required></v-text-field>
                <v-autocomplete v-model="item.raca" :items="racas" label="Raça" required></v-autocomplete>
                <v-autocomplete v-model="item.medico" :items="usuarios_medico" label="Médico" required></v-autocomplete>
                <v-autocomplete v-model="item.tratador" :items="usuarios_tratador" label="Tratador" required></v-autocomplete>
                <v-autocomplete v-model="item.dono" :items="usuarios_cliente" label="Dono" required></v-autocomplete>
                <v-textarea v-model="item.observacoes" label="Observações" required></v-textarea>
              </v-form>
            </v-card-text>
            <v-card-actions>
                <v-row>
                    <v-col class="text-end">
                        <v-btn color="primary">salvar</v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
          </v-card>
      </v-dialog>
    </v-app>
  </template>
    
<script setup>
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({
      id: null,
      nome: null,
      raca: null,
      medico: null,
      tratador: null,
      dono: null,
      observacoes: null
    })
  }
});

const racas = ref([]);
const usuarios = ref([]);
const usuarios_medico = ref([]);
const usuarios_tratador = ref([]);
const usuarios_cliente = ref([]);
const dialog = ref(false);
</script>