// stores/tutorStore.js
import { defineStore } from 'pinia';
import api from '@/http';

export const useTutorStore = defineStore('tutorStore', {
  state: () => ({
    tutors: [],
    loading: false,
    error: null,
    tutorColumns: [
      { title: '#', key: 'id' },
      { title: 'Nome', key: 'nome' },
      { title: 'Cpf', key: 'cpf' },
      { title: 'login', key: 'usuario.username' },
      { title: 'Data Nasc', key: 'data_nascimento' },
      { title: 'Criado Por', key: 'created_by' },
      { title: 'Modificado Por', key: 'modified_by' },
      { title: 'Criado Em', key: 'created_at' },
      { title: 'Modificado Em', key: 'modified_at' },
      { title: 'Ações', key: 'action' },
    ],
    totalItems: 0,
    options: {
      page: 1,
      itemsPerPage: 10,
      nome: '',
      cpf: '',
      data_nascimento: ''
    },
  }),

  actions: {
    async fetchTutors() {
      this.loading = true;
      try {
        const response = await api.get('tutores/listar/', {
          params: {
            page: this.options.page,
            page_size: this.options.itemsPerPage,
            nome: this.options.nome,
            data_nascimento: this.options.data_nascimento,
            cpf: this.options.cpf,
          }
        });
        this.tutors = response.data.results;
       
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
    setSelectedTutor(tutor) {
      this.selectedTutor = tutor;
    },

    clearSelectedTutor() {
      this.selectedTutor = null;
    },

    async updateTutor(tutor) {
      // Código para atualizar o tutor na API
      try {
        const response = await api.put(`tutores/alterar/${tutor.id}/`, tutor);
        // Atualize o tutor na lista ou refaça a busca
        this.fetchTutors();
      } catch (error) {
        console.error('Error updating tutor:', error);
      }
    },
  },
});
