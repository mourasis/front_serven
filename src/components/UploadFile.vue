<template>
    <v-container class="pa-4 scroll-card" elevation="2">
      <v-row>
        <v-col>

          <!-- Componente de upload de arquivo -->
          <v-file-input
          v-model="imageFile"
          label="Selecione uma imagem"
          accept="image/*"
          show-size
          outlined
          @change="previewImage"
          ></v-file-input>
          
          <!-- Preloader de preview -->
          <v-progress-circular
          v-if="previewLoading"
          indeterminate
          color="primary"
          class="mt-4"
          size="40"
          ></v-progress-circular>
        </v-col>
        <v-col cols="2">

          <!-- Botão de Upload -->
          <v-btn color="primary" class="mt-4" @click="uploadImage" :loading="loading">
            Enviar Imagem
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!-- Preview da imagem -->
          <v-img
          v-if="imagePreview && !previewLoading"
          :src="imagePreview"
          alt="Preview da imagem"
          max-width="300"
          max-height="300"
          class="mt-4"
          ></v-img>
        </v-col>
      </v-row>
      
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import api from '@/http'; // Usa o módulo http já configurado
  

  // Refs para armazenar o arquivo da imagem, preview e estado de carregamento
  const imageFile = ref(null);
  const imagePreview = ref(null);
  const loading = ref(false);
  const previewLoading = ref(false); // Estado de carregamento do preview
  
  // Função para gerar o preview da imagem
  const previewImage = () => {
    if (imageFile.value) {
      previewLoading.value = true; // Ativar o preloader do preview
  
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target.result; // Define o preview da imagem
        previewLoading.value = false; // Desativar o preloader após o carregamento
      };
      reader.readAsDataURL(imageFile.value);
    }
  };
  
  // Função para realizar o upload da imagem para o backend e atualizar a store
  const uploadImage = async () => {
    if (!imageFile.value) {
      alert('Por favor, selecione uma imagem antes de fazer o upload.');
      return;
    }
  
    loading.value = true; // Ativar loading durante o upload
  
    try {
      // Criar o objeto FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('imagem', imageFile.value);
  
      // Fazer a requisição POST para o backend usando seu módulo http
      const response = await api.post('/imagem/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      alert('Erro ao enviar a imagem. Tente novamente.');
    } finally {
      loading.value = false; // Desativar loading
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para ajustar o preview da imagem */
  img {
    max-width: 100%;
    max-height: 300px;
  }
  .scroll-card {
    overflow-y: auto; /* Permite rolagem vertical */
    overflow-x: auto; /* Evita a rolagem horizontal */
  }
</style>

  