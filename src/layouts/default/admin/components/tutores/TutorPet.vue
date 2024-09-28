<template>
  <v-card>
  <!-- 
    <v-card-title class="headline">Pets</v-card-title>
    <v-card-text>
      Tutor: {{ selectedTutor.nome }}
      <v-data-table :headers="petColumns" :items="pets" item-value="id" class="elevation-1" density="compact"
        :search="search" :server-items-length="totalItems" :options.sync="options" :loading="loading"
        :single-expand="singleExpand" :expanded.sync="expanded" show-expand v-model:expanded="expanded"
        @click="handleRowClick()">

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lista Pets</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <td :colspan="petColumns.length" class="expanded-content">
            <v-card flat>
              <v-card-text dense>
                <v-autocomplete dense label="Animal" item-value="id" item-title="nome" :items="animals" v-model="item.pet.animal" return-object></v-autocomplete>
                <v-text-field dense label="Nome" v-model="item.pet.nome"></v-text-field>
                <v-text-field dense label="Raça" v-model="item.pet.raca.nome"></v-text-field>
                <v-text-field dense label="Cor" v-model="item.pet.cor.nome"></v-text-field>
                <v-textarea label="Observações" v-model="item.pet.observacoes"></v-textarea>
                <v-switch v-model="item.pet.ativo" label="Ativar/Desativar"
                :color="selectedTutor.ativo ? 'green' : ''" class="ma-2"></v-switch>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text
                @click="updatePet(item.pet)"><v-icon>mdi-content-save</v-icon>salvar</v-btn>
              </v-card-actions>
            </v-card>
          </td>    
        </template>
      </v-data-table>
    </v-card-text>
    <StatusModal />
    -->
  </v-card> 
</template>
<!-- 
<script setup>
import StatusModal from '../../../../../components/StatusModal.vue';

import { ref, onMounted, computed } from 'vue';
import { useTutorStore } from './stores/tutorStore';
import { useTutorPetStore } from './stores/tutorPetStore';
import { usePetStore } from './stores/petStore';
import { useAnimalStore } from './stores/animalStore';
import { useStatusModalStore } from '@/stores/statusModalStore';

const tutorPetStore = useTutorPetStore();
const tutorStore = useTutorStore();
const petStore = usePetStore();
const animalStore = useAnimalStore();
const statusModalStore = useStatusModalStore();

const selectedTutor = tutorStore.selectedTutor;
const search = ref('');
const expanded = ref([]);
const singleExpand = ref(false);

onMounted(() => {
  fetchData();
});

const fetchData = () => {
  tutorPetStore.fetchTutorPets(selectedTutor.id);
};


const  updatePet = async (item) => {
  try {
    await petStore.updatePet(item);
    statusModalStore.isVisible = true
    statusModalStore.showModal('Atualizado com sucesso!');
  } catch (error) {
    statusModalStore.showModal('Erro ao atualizar!');
    console.error('Error updating pet:', error);
  }
};

const pets = computed(() => tutorPetStore.tutorsPets);    
const loading = computed(() => tutorPetStore.loading);
const petColumns = computed(() => tutorPetStore.tutorPetColumns);
const options = computed(() => tutorPetStore.options);
const totalItems = computed(() => tutorPetStore.totalItems);
// animal

const fetchAnimalData = () => {
  animalStore.fetchData()
};
const handleRowClick = () => {
  // Quando uma linha for expandida, chamamos o fetchAnimalData
  fetchAnimalData();
};
const animals = computed(() => animalStore.animals);
</script> -->