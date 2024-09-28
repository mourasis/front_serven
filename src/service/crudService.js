import api from '../http'; // Usa o axios configurado em http/index.js

// Função genérica para buscar itens de uma coleção
export const getItems = async (collection, params=null) => {
  try {
    
    const response = await api.get(`/${collection}`, { params }); // Faz requisição para o backend
    // console.log(api)
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    throw error;
  }
};
