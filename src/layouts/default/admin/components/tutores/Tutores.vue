<template>
    <v-container>
      <btn-voltar destinationUrl="/admin/apps" label="Voltar"/>
      <h1>Tutores</h1>
      
      <v-row dense>
        <v-col dense>
          <v-text-field
            v-model="options.nome"
            label="Nome"
            prepend-icon="mdi-magnify"
          ></v-text-field>
        </v-col> 
        <v-col dense>
          <v-text-field
            v-model="options.data_nascimento"
            label="Data nascimento"
            type="date"
          ></v-text-field>
        </v-col> 
        <v-col dense>
          <v-text-field
            v-model="formattedCPF"
            label="CPF"
            placeholder="Digite seu CPF"
            maxlength="14" 
            @input="updateCPF"
          ></v-text-field>
        </v-col> 
        
        <v-col dense class="d-flex align-top">
          <v-row> 
            <v-col cols="6">
              <v-btn
                variant="flat"
                class="ma-auto"
                block
                @click="fetchData"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                variant="outlined"
                color="green"
                block
                class="ma-auto"
                @click="fetchData"
              >
                <v-icon>mdi-plus-circle</v-icon>
              </v-btn>
            </v-col>
          </v-row> 
        </v-col> 
      </v-row> 
  
      <v-row dense>
        <v-data-table
          :headers="tutorColumns"
          :items="tutors"
          item-value="id"
          class="elevation-1"
          density="compact"
          :search="search"
          :server-items-length="totalItems"
          :options.sync="options"
          @update:options="fetchData"
          :loading="loading"
        >
          <template v-slot:top>
            <v-row dense>
              <v-col cols="6">
                <v-text-field dense outlined v-model="search" label="Pesquisar" class="mx-0" append-icon="mdi-magnify" clearable />
              </v-col>
              <v-col dense class="text-end">
                <v-btn variant="outline" @click="fetchData">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template> 
          <template v-slot:[`item.action`]="{item}">
            <v-row dense>
              <form-action :current-item="item" @tutor-update-success="handleTutorUpdateSuccess"></form-action>
            </v-row>
          </template>     
        </v-data-table>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import BtnVoltar from '../btn_voltar.vue';
  import FormAction from './FormAction.vue';
  import { onMounted, watch, computed, ref } from 'vue';
  import { useCPF } from '@/utils/cpfFormatter';
  import { useTutorStore } from './stores/tutorStore';
  
  const tutorStore = useTutorStore();
  const { cpf, formattedCPF, updateCPF } = useCPF();
  
  watch(cpf, (newCpf) => {
    tutorStore.setOptions({ cpf: newCpf });
  });
  
  const fetchData = () => {
    tutorStore.fetchTutors();
  };
  
  onMounted(() => {
    fetchData();
  });
  
  const tutors = computed(() => tutorStore.tutors);
  const loading = computed(() => tutorStore.loading);
  const error = computed(() => tutorStore.error);
  const tutorColumns = computed(() => tutorStore.tutorColumns);
  const options = computed(() => tutorStore.options);
  const search = ref('');
  const totalItems = computed(() => tutorStore.totalItems);
  </script>
  