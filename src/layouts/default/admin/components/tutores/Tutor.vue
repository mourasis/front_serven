<template>
      <v-card>
        <v-card-title class="headline">Configurações</v-card-title>
        <v-card-text>
        <v-text-field label="Nome" v-model="selectedTutor.nome" clearable></v-text-field>
        <v-text-field label="CPF" v-model="selectedTutor.cpf" maxlength="14"></v-text-field>
        <v-text-field label="Data de Nasc" v-model="selectedTutor.data_nascimento" type="date"></v-text-field>
        Login e-mail: {{ selectedTutor.usuario }}
        <v-switch v-model="selectedTutor.ativo" label="Ativar/Desativar" :color="selectedTutor.ativo ? 'green' : ''" class="ma-2"></v-switch>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="updateTutor"><v-icon>mdi-content-save</v-icon>salvar</v-btn>
        </v-card-actions>
    </v-card>
</template>    
<script setup>

import { useTutorStore } from './stores/tutorStore';
// import { formatCPF } from '@/utils/cpfFormatter';

const tutorStore = useTutorStore();
const selectedTutor = tutorStore.selectedTutor;

const updateTutor = () => {
    selectedTutor.cpf = selectedTutor.cpf.replace(/[.\-]/g, '');
    tutorStore.updateTutor(selectedTutor);
    // selectedTutor.cpf = formatCPF(selectedTutor.cpf)
};

</script>    