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

const getOrderByOrderId = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (id, body) => {
  try {
    console.log("body", body);
    const response = await api.put(`/orders/update-order/${id}`, body);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getOrderByUserId, getOrderByOrderId, updateOrder };
