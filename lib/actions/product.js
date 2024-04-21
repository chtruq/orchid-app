import api from "./api";

const getProducts = async (body) => {
  try {
    const response = await api.get(`/products?${body}`);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};

export { getProducts };
