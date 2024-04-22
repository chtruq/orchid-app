import api from "./api";

// //get
const getAuctions = async (body) => {
  try {
    const params = new URLSearchParams(body).toString();
    if (params === "") {
      const response = await api.get("/auctions/list?per_page=20&page=1");
      return response.data;
    } else {
      const response = await api.get(
        `/auctions/list?${params}&&per_page=20&page=1`
      );
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const getAuctionsByID = async (id) => {
  try {
    const response = await api.get(`/auctions/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAuctionsByID, getAuctions };
