import api from "./api";

const getWalletByUserID = async (userID) => {
  try {
    const response = await api.get(`/wallets/get-balance-by-userId/${userID}`);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};

const rechargeWalletByUserID = async (userID, amount) => {
  try {
    console.log("userID", userID, "recharge", amount);
    const response = await api.post(
      `/wallets/recharge-wallet-by-userId/${userID}`,
      {
        recharge: amount,
      }
    );
    return response.data.payload;
  } catch (error) {
    throw error;
  }
};

export { getWalletByUserID, rechargeWalletByUserID };
