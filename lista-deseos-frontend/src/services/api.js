import axios from 'axios';

const API_URL = 'http://localhost:3000/api/deseos';

export const getDeseos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const crearDeseo = async (deseo) => {
  const response = await axios.post(API_URL, deseo);
  return response.data;
};

export const actualizarDeseo = async (id, deseo) => {
  const response = await axios.put(`${API_URL}/${id}`, deseo);
  return response.data;
};

export const borrarDeseo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};