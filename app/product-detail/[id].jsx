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
      console.log(id);
      const response = await getAuctionsByID(id.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAutions();
  }, [auction]);

  return (
    <View>
      <Text>ProductDetails</Text>
    </View>
  );
};

export default ProductDetails;
