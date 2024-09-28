import { defineStore } from 'pinia';
import http from '@/http'; // Usaremos Axios para fazer a requisição HTTP

export const useCategoriasStore = defineStore('categorias', {
  state: () => ({
    dialog: false,
    categorias: [{
      id: null,
      nome: null,
      ordem: null,
      imagem: null,
      ativo: true,
      params:null,
      observacoes: null
    }],
    loading: false,
    error: null,
    snackbar: {
      show: false,
      message: '',
      color: 'error', // Define a cor padrão como 'error' (vermelho)
    },
    categoriaColumns: [
      { title: '#', key: 'id' },
      { title: 'Nome', key: 'nome' },
      { title: 'Ordem', key: 'ordem' },
      { title: 'Imagem', key: 'imagem' },
      { title: 'Ativo', key: 'ativo' },
      { title: 'Observações', key: 'observacoes' },
      { title: 'Ações', key: 'actions' }
    ]
  }),

  actions: {
    async fetchCategorias() {
      this.loading = true;
      this.error = null;
      try {
        // Faz a requisição GET para a API de categorias
        const response = await http.get('/categorias');
        this.categorias = response.data;
      } catch (error) {
        this.error = 'Erro ao buscar categorias';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async updateCategoria(categoria) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.put(`/admin/categorias/${categoria.id}`, categoria);
        const updatedCategoria = response.data;

        if (response.status !== 200) {
          // Configura o snackbar para mostrar o erro
          this.snackbar = {
            show: true,
            message: `Falha ao atualizar a categoria: ${response.data.message || 'Erro desconhecido'}`,
            color: 'error',
          };
          return;
        }

        const index = this.categorias.findIndex((cat) => cat.id === categoria.id);
        if (index !== -1) {
          this.categorias[index] = { ...updatedCategoria };
        }
      } catch (error) {
        this.error = 'Erro ao atualizar a categoria';
        this.snackbar = {
          show: true,
          message: `Erro ao atualizar a categoria: ${error.message}`,
          color: 'error',
        };

        console.error(error);
      } finally {
        this.loading = false;
      }
    }
    ,
    async postCategoria(categoria) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.post(`/admin/categorias`, categoria);
        const postCategoria = response.data;

        const index = this.categorias.findIndex((cat) => cat.id === categoria.id);
        if (index !== -1) {
          this.categorias[index] = { ...postCategoria };
        }
      } catch (error) {
        this.error = 'Erro ao atualizar a categoria';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    // Método para fechar o snackbar
    closeSnackbar() {
      this.snackbar.show = false;
    },

  }
});
