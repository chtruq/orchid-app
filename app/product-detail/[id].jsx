import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { getAuctionsByID } from "../../lib/actions/auction";

const ProductDetails = () => {
  const [auction, setAuction] = useState([]);
  const id = useGlobalSearchParams("id");

  //id.id mới lấy được id cua auction
  // console.log("id", id.id);

  const getAutions = async () => {
    try {
      const response = await getAuctionsByID(id.id);
      setAuction(response.payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAutions();
  }, []);

  console.log("auction", auction);

  return (
    <View>
      <Text>{auction.title}</Text>
    </View>
  );
};

export default ProductDetails;
