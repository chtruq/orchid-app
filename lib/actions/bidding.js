import api from "./api";

const getBiddings = async (body) => {
  try {
    const response = await api.get(`/biddings/list?auctionId=${body}`);
    return response.data.payload.content;
  } catch (error) {
    console.log(error);
  }
};

const createBidding = async (body) => {
  try {
    const response = await api.post(`/biddings/bid`, body);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { createBidding, getBiddings };
