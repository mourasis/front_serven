// stores/petStore.js
import { defineStore } from 'pinia';
import api from '@/http';


export const usePetStore = defineStore('petStore', {
  state: () => ({
    pets: [],
    loading: false,
    error: null,
    petColumns: [
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
      nome: '',
      animal: '',
      raca: '',
      observacoes: '',
      cor: ''
    },
  }),

  actions: {
    async fetchData(id=null) {
      this.loading = true;
      try {
        const response = await api.get('carteiras/pets/', {
          params: {
            page: this.options.page,
            page_size: this.options.itemsPerPage,
            nome: this.nome,
            animal: this.animal,
            cor: this.cor,
            raca: this.raca,
            observacoes: this.observacoes,
            id:id
          }
        });
        this.pets = response.data.results;
       
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
    setSelectedPet(pet) {
      this.selectedPet = pet;
    },

    clearSelectedPet() {
      this.selectedPet = null;
    },
    async updatePet(pet) {

      // Extrair apenas os IDs dos objetos relacionados
      const petPayload = {
        id: pet.id,
        animal: pet.animal.id,
        raca: pet.raca.id,
        cor: pet.cor.id,
        nome: pet.nome,
        ativo: pet.ativo,
        observacoes: pet.observacoes,
        modified_by: pet.modified_by, // se necessário
      };
    
      try {
        const response = await api.put(`carteiras/pet/${pet.id}/`, petPayload);
        // Atualize o pet na lista ou refaça a busca
        this.fetchData();
      } catch (error) {
        console.error('Error updating pet:', error);
      }
    }
  },
});
