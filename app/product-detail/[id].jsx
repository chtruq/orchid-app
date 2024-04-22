import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { getAuctionsByID } from "../../lib/actions/auction";
import { getProductsByID } from "../../lib/actions/product";
import Carousel from "pinar";
import ListImageProduct from "./components/ListImageProduct";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [auction, setAuction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = useGlobalSearchParams("id");

  //id.id mới lấy được id cua auction
  console.log("id", id.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auctionResponse = await getAuctionsByID(id.id);
        setAuction(auctionResponse.payload);
        const productResponse = await getProductsByID(
          auctionResponse.payload.productID
        );
        setProduct(productResponse.payload);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);
  console.log("product", product);
  console.log("auction", auction);
  console.log("product Id", auction.productID);
  console.log("list image", product.productImages);
  if (isLoading || !product || !auction) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView className="bg-white">
      <View className="m-2">
        <Text className="text-2xl text-black-5">{auction.title}</Text>
      </View>
      <ListImageProduct data={product} />
      <View className="flex-row items-center">
        <TouchableOpacity className="bg-cyan-200 ml-4 p-3 rounded-lg border border-black-3">
          <Text className="text-black-5 text-[18] font-blod">
            Register Auction
          </Text>
        </TouchableOpacity>
        <View className="ml-10">
          <Text className="text-[18px] text-red-600">End day: 1d-22H-30</Text>
        </View>
      </View>
      <View className="flex-row ml-4 mt-3">
        <Text className="font-bold">Product name: </Text>
        <Text>{auction.productName}</Text>
      </View>
      <View className='ml-4 mt-1'>
        <Text className="font-bold">Description: </Text>
        <Text>{product.description}</Text>
      </View>
      <View className="m-4 border border-black p-3">
        <Text>Auction now</Text>
        <Text>Actual value: </Text>
        <TextInput
          className=" pl-2 border border-gray"
          placeholder="Enter your price"
          keyboardType="number-pad"
          scrollEnabled={true}
        />
        <View className="flex-row justify-around items-center">
          <TouchableOpacity className="m -2 rounded-md border border-black">
            <Text className="p-1.5">Place bid</Text>
          </TouchableOpacity>
          <TouchableOpacity className="m-2 rounded-md border border-black">
            <Text className="p-1.5">Raise (*)</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>Top Bidding</Text>
        <View className="flex-row justify-around">
          <Text>Nguyen Van A Cam</Text>
          <Text>200000000VND</Text>
        </View>
        <View className="flex-row justify-around">
          <Text>Nguyen Van A Cam</Text>
          <Text>200000000VND</Text>
        </View>
        <View className="flex-row justify-around">
          <Text>Nguyen Van A Cam</Text>
          <Text>200000000VND</Text>
        </View>
        <View className="flex-row justify-around">
          <Text>Nguyen Van A Cam</Text>
          <Text>200000000VND</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;
