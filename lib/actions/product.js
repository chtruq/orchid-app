import api from "./api";

const getProducts = async (body) => {
  try {
    const response = await api.get(`/products?${body}`);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};
const getProductsByID = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getProducts, getProductsByID };
