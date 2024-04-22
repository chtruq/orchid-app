import api from "./api";

// //get
const getAuctions = async (body) => {
  try {
    const params = new URLSearchParams(body).toString();
    console.log("params", params);
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

export { getAuctions };
