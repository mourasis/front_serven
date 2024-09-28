<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-dialog v-model="dialog" min-width="600">
          <template v-slot:activator="{ props }">
            <v-btn color="orange" icon v-bind="props" variant="outlined" @click="openModal">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-row dense>
              <v-col class="text-end">
                <v-btn color="grey darken-1" icon variant="plain" @click="closeModal">
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-tabs v-model="tab" bg-color="transparent">
              <v-tab value="one">Dados pessoais</v-tab>
              <v-tab value="two">Pets</v-tab>
            </v-tabs>
            <v-card-text>
              <v-tabs-window v-model="tab">
                <v-tabs-window-item value="one">
                  <tutor />
                </v-tabs-window-item>

                <v-tabs-window-item value="two">
                  <tutor-pet />
                </v-tabs-window-item>
              </v-tabs-window>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useTutorStore } from './stores/tutorStore';
import Tutor from './Tutor.vue';
import TutorPet from './TutorPet.vue';

const props = defineProps({
  currentItem: {
    type: Object,
    default: () => ({
      id: null,
      nome: null,
      data_nascimento: null,
      cpf: null,
      usuario: null,
      ativo: false,
    }),
  },
});

const tab = ref('one');
const dialog = ref(false);
const tutorStore = useTutorStore();

const openModal = () => {
  tutorStore.setSelectedTutor(props.currentItem);
  dialog.value = true;
};

const closeModal = () => {
  tutorStore.clearSelectedTutor();
  dialog.value = false;
};
</script>
