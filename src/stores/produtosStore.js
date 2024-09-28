import { defineStore } from 'pinia';
import http from '@/http'; // Usaremos Axios para fazer a requisição HTTP
import { Timestamp } from 'firebase/firestore';


// Função para converter os segundos em String Date e Time
function converteParaStringDateTime(seconds) {
  // Cria um novo objeto Date com base no Unix Timestamp (segundos)
  const dateObj = new Date(seconds * 1000); // Multiplica por 1000 para converter para milissegundos

  // Extrai a parte de data no formato YYYY-MM-DD
  const stringDate = dateObj.toISOString().split('T')[0];

  // Extrai a parte de tempo no formato HH:mm:ss
  const stringTime = dateObj.toTimeString().split(' ')[0];

  return {
    _nanoseconds: stringDate,
    _seconds: stringTime
  };
}


export const useProdutosStore = defineStore('produtos', {
  state: () => ({
    dialog: false,
    resumo:{},
    produtos: [{
      id: null,
      categoria_id: null,
      fim: Timestamp,
      inicio: Timestamp,
      nome: null,
      ordem: null,
      preco: null,
      imagens: [],
      ativo: true,
      status: { cor: null, nome: null },
      tipo: null,
      observacoes: null
    }],
    loading: false,
    error: null,
    snackbar: {
      show: false,
      message: '',
      color: 'error', // Define a cor padrão como 'error' (vermelho)
    },
    produtoColumns: [
      { title: 'Ordem', key: 'ordem' },
      { title: 'Nome', key: 'nome' },
      { title: 'Categoria', key: 'categoria_id' },
      { title: 'Imagens', key: 'imagens', align: 'start' },
      { title: 'Ativo', key: 'ativo' },
      { title: 'Status', key: 'status' },
      { title: 'Ações', key: 'actions' }
    ]
  }),

  actions: {// src/stores/produtosStore.js
    updateImagem(novaUrl) {
      // Atualiza a URL da imagem no estado
      this.produto.imagem = novaUrl;
    },

    async fetchProdutos(params = null) {
      this.loading = true;
      this.error = null;
      try {
        // Faz a requisição GET para a API de produtos
        const response = await http.get('/produtos', { params });
        this.produtos = response.data

          .map(e => {
            e.categoria_id = e.hasOwnProperty('categoria_id') ? e.categoria_id : null;
            e.fim = e.hasOwnProperty('fim') ? e.fim : null; // ou 'new Timestamp()' se quiser instanciar como Timestamp
            e.inicio = e.hasOwnProperty('inicio') ? e.inicio : null;
            e.nome = e.hasOwnProperty('nome') ? e.nome : null;
            e.ordem = e.hasOwnProperty('ordem') ? e.ordem : null;
            e.preco = e.hasOwnProperty('preco') ? e.preco : null;
            e.imagens = e.hasOwnProperty('imagens') ? e.imagens : [];
            e.ativo = e.hasOwnProperty('ativo') ? e.ativo : true;
            e.status = e.hasOwnProperty('status') ? e.status : { cor: null, nome: null };
            e.tipo = e.hasOwnProperty('tipo') ? e.tipo : null;
            e.observacoes = e.hasOwnProperty('observacoes') ? e.observacoes : null;
            return e
          });

      } catch (error) {
        this.error = 'Erro ao buscar produtos';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async countProdutos(params = null) {
      this.loading = true;
      this.error = null;
      try {
        // Faz a requisição GET para a API de produtos
        const response = await http.get('/produtos', { params });
        this.resumo = response.data

      } catch (error) {
        this.error = 'Erro ao buscar produtos';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async updateProduto(produto) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.put(`/admin/produtos/${produto.id}`, produto);
        const updatedproduto = response.data;

        if (response.status !== 200) {
          // Configura o snackbar para mostrar o erro
          this.snackbar = {
            show: true,
            message: `Falha ao atualizar a produto: ${response.data.message || 'Erro desconhecido'}`,
            color: 'error',
          };
          return;
        }

        const index = this.produtos.findIndex((cat) => cat.id === produto.id);
        if (index !== -1) {
          this.produtos[index] = { ...updatedproduto };
        }
      } catch (error) {
        this.error = 'Erro ao atualizar a produto';
        this.snackbar = {
          show: true,
          message: `Erro ao atualizar a produto: ${error.message}`,
          color: 'error',
        };

        console.error(error);
      } finally {
        this.loading = false;
      }
    }
    ,
    async postProduto(produto) {
      this.loading = true;
      this.error = null;
      try {
        const response = await http.post(`/admin/produtos`, produto);
        const postproduto = response.data;

        const index = this.produtos.findIndex((cat) => cat.id === produto.id);
        if (index !== -1) {
          this.produtos[index] = { ...postproduto };
        }
      } catch (error) {
        this.error = 'Erro ao atualizar a produto';
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
