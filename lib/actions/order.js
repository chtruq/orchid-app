import api from "./api";

const getOrderByUserId = async (body) => {
  const params = new URLSearchParams(body).toString();

  console.log(params);
  try {
    const response = await api.get(`/orders/list?${params}`);
    return response.data.payload.content;
  } catch (error) {
    console.log(error);
  }
};

export { getOrderByUserId };
