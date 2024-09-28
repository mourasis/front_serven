// stores/tutorStore.js
import { defineStore } from 'pinia';
import api from '@/http';

export const useTutorPetStore = defineStore('TutorPetStore', {
  state: () => ({
    tutorsPets: [],
    loading: false,
    error: null,
    tutorPetColumns: [
      { title: '#', key: 'id' },
      { title: 'Pet', key: 'pet.animal.nome' },
      { title: 'Nome', key: 'pet.nome' },
      { title: 'Raça', key: 'pet.raca.nome' },
      { title: 'Porte', key: 'pet.porte.nome' },
      { title: 'Criado Por', key: 'created_by' },
      { title: 'Modificado Por', key: 'modified_by' },
      { title: 'Criado Em', key: 'created_at' },
      { title: 'Modificado Em', key: 'modified_at' }
    ],
    totalItems: 0,
    options: {
      page: 1,
      itemsPerPage: 10,
      tutor: [],
      pet: []
    },
  }),

  actions: {
    async fetchTutorPets(tutor) {
      this.loading = true;
      try {
        const response = await api.get('tutores/listar-pets/', {
          params: {
            page: this.options.page,
            page_size: this.options.itemsPerPage,
            tutor: this.tutor,
            pet: this.pet,
            tutor_id:tutor
          }
        });
        this.tutorsPets = response.data.results;
       
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
    setSelectedTutorPet(pet) {
      this.selectedTutorPet = pet;
    },

    clearSelectedTutorPet() {
      this.selectedTutorPet = null;
    },

    async updateTutorPet(pet) {
      // Código para atualizar o pet na API
      try {
        const response = await api.put(`tutores/alterar-pet/${pet.id}/`, pet);
        // Atualize o pet na lista ou refaça a busca
        this.fetchPet();
      } catch (error) {
        console.error('Error updating pet:', error);
      }
    },
  },
});
