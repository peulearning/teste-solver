import axios from 'axios';

const API_URL = 'http://localhost:5220/api/produto';

export const fetchProdutos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos', error);
    throw error;
  }
};

export const addProduto = async (produto) => {
  try {
    const response = await axios.post(API_URL, produto);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar produto', error);
    throw error;
  }
};

export const updateProduto = async (id, produto) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, produto);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto', error);
    throw error;
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir produto', error);
    throw error;
  }
};
