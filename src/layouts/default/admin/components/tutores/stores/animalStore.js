// stores/petStore.js
import { defineStore } from 'pinia';
import api from '@/http';

export const useAnimalStore = defineStore('animalStore', {
  state: () => ({
    animals: [],
    loading: false,
    error: null,
    animalColumns: [
      { title: '#', key: 'id' },
      { title: 'Nome', key: 'nome' },
      { title: 'Criado Por', key: 'created_by' },
      { title: 'Modificado Por', key: 'modified_by' },
      { title: 'Criado Em', key: 'created_at' },
      { title: 'Modificado Em', key: 'modified_at' }
    ],
    totalItems: 0,
    options: {
      page: 1,
      itemsPerPage: 10,
      nome: '',
      id:null
    },
  }),

  actions: {
    async fetchData(id=null) {
      this.loading = true;
      try {
        const response = await api.get('carteiras/animais/', {
          params: {
            page: this.options.page,
            page_size: this.options.itemsPerPage,
            id: this.id,
            nome: this.nome
          }
        });
        this.animals = response.data.results;
       
        this.totalItems = response.data.results.count;
      } catch (error) {
        this.error = 'Erro ao buscar os tutores.';
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },

    setOptions(newOptions) {
      this.options = { ...this.options, ...newOptions };
    },
    setSelectedAnimal(animal) {
      this.selectedAnimal = animal;
    },

    clearSelectedAnimal() {
      this.selectedAnimal = null;
    },

    async updateAnimal(animal) {
      // Código para atualizar o animal na API
      try {
        const response = await api.put(`carteiras/animal/${animal.id}/`, animal);
        // Atualize o animal na lista ou refaça a busca
        this.fetchAnimal();
      } catch (error) {
        console.error('Error updating pet:', error);
      }
    },
  },
});
