import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { getAuctionsByID } from "../../lib/actions/auction";
import { getProductsByID } from "../../lib/actions/product";
import ListImageProduct from "./components/ListImageProduct";
import CountdownTimer from "./components/CountdownTimer";
import ModalRegisterAuction from "./components/ModalRisgterAuction";
import { useGlobalContext } from "../../context/GlobalProvider";
import { createBidding, getBiddings } from "../../lib/actions/bidding";
import { useToast } from "react-native-toast-notifications";
const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [auction, setAuction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [bidList, setBidList] = useState([]); // [1,2,3,4,5,6,7,8,9,10
  const { user } = useGlobalContext();
  const [biddingJump, setBiddingJump] = useState(0); // [1,2,3,4,5,6,7,8,9,10
  const [actualPrice, setActualPrice] = useState(0);
  const [actualPrice2, setActualPrice2] = useState(0); // [1,2,3,4,5,6,7,8,9,10
  const id = useGlobalSearchParams("id");
  const userId = user.id;
  const [list, setList] = useState([]);
  const [biddingPrices, setBiddingPrices] = useState(0); // [1,2,3,4,5,6,7,8,9,10
  const toast = useToast();
  const [biddingPrice, setBiddingPrice] = useState(0);
  const [error, setError] = useState("");

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
  }, []);

  const getAuctionByAuctionid = async (id) => {
    try {
      const response = await getAuctionsByID(id);
      // setAuction(response.payload);
      setBidList(response.payload.bidList);
      setBiddingJump(response.payload.depositPrice);
      setActualPrice(
        response.payload.biddingPrice === null
          ? response.payload.startPrice
          : response.payload.biddingPrice
      );

      if (response.payload.biddingPrice === null) {
        setBiddingPrices(response.payload.startPrice);
      } else {
        {
          setBiddingPrices(response.payload.biddingPrice);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuctionByAuctionid(id.id);
  }, []);

  const getBiddingList = async () => {
    try {
      const response = await getBiddings(id.id);
      setList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBiddingList();
  }, []);

  const handleBidding = () => {
    const bridge = Number(actualPrice) + Number(biddingJump);
    bidding(bridge);
  };

  const handlePlaceBid = (text) => {
    const bridge = Number(text);
    if (bridge === "" || bridge === 0) {
      setBiddingPrices(text);
      setError("Minimum amount is 10000");
    } else if (bridge > actualPrice + biddingJump) {
      setBiddingPrices(text);
      setError("");
    } else {
      setBiddingPrices(text);
      setError("Bid must be greater than actual price + bidding jump");
    }
  };

  const handlePlaceBidding = () => {
    bidding(biddingPrices);
  };

  const bidding = async (abc) => {
    const body = {
      auctionID: id.id,
      biddingPrice: abc,
      userID: userId,
    };
    try {
      const response = await createBidding(body);
      if (response.status === 200) {
        toast.show("Bidding successfully", {
          type: "success",
        });
        getAuctionByAuctionid(id.id);
        getBiddingList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !product || !auction) {
    return (
      <View className="h-[100vh] items-center justify-center">
        <ActivityIndicator size="large" color="#FFAD41" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView className="bg-white pb-6">
        <View className="m-2">
          <View className="">
            <Text className="text-2xl text-black-5">{auction.title}</Text>
          </View>
          <ListImageProduct data={product} />
          <View className="flex-row items-center">
            {!bidList.some((bid) => bid.userID === userId) ? (
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-cyan-200 p-3 rounded-lg border border-black-3"
              >
                <Text className="text-black-5 text-[18] font-blod">
                  Register Auction
                </Text>
              </TouchableOpacity>
            ) : (
              <View className="p-3">
                <Text>Registered</Text>
              </View>
            )}
            <View className="">
              <CountdownTimer data={auction} />
            </View>
          </View>
          <View className="flex-row ml-mt-3">
            <Text className="font-bold">Product name: </Text>
            <Text>{auction.productName}</Text>
          </View>
          <View className="mt-1">
            <Text className="font-bold">Description: </Text>
            <Text>{product.description}</Text>
          </View>

          <View>
            <Text className="font-pmedium">
              Actual value:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(actualPrice)}{" "}
            </Text>

            <View>
              <View>
                <TextInput
                  className="pl-2 border border-gray p-4 rounded-lg hover:border-secondary-200 "
                  placeholder="Enter your price"
                  keyboardType="number-pad"
                  scrollEnabled={true}
                  value={biddingPrices.toString()}
                  onChangeText={(text) => handlePlaceBid(text)}
                />
                {error && <Text className="text-red-500">{error}</Text>}
                <View className="flex-row justify-around mt-3">
                  {!error ? (
                    <TouchableOpacity
                      onPress={() => {
                        handlePlaceBidding();
                      }}
                      className="rounded-md border border-black"
                    >
                      <Text className="p-2 ">Place bid</Text>
                    </TouchableOpacity>
                  ) : (
                    <View className="rounded-md border bg-gray-400 border-black">
                      <Text className="p-2 text-gray-100 ">Place bid</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      handleBidding();
                    }}
                    className="rounded-md border border-black"
                  >
                    <Text className="p-2">
                      Raise{" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(biddingJump)}{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <Text>*Place bid = actual value + raise</Text>
            </View>
          </View>

          {list && list.length > 0 ? (
            <View>
              <Text>Top Bidding</Text>

              {list.map((item, index) => (
                <View key={index} className="flex-row justify-around">
                  <View className="w-[45%]">
                    <Text>User Name {item.userName}</Text>
                    <Text>Ratings: {item.ratings}</Text>
                  </View>

                  <Text className="w-[45%]">
                    Bidding :{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.biddingPrice)}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text>Still not have no one bidding</Text>
            </View>
          )}
          <ModalRegisterAuction
            data={auction}
            isVisible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductDetails;
