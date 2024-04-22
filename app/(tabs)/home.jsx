import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProducts } from "../../lib/actions/product";
import { rechargeWalletByUserID } from "../../lib/actions/wallet";
import SearchInput from "../../components/SearchInput";
import Wallet from "../../components/Wallet";
import Filter from "../../components/Filter";
import Card from "../../components/Card";
import { getAuctions } from "../../lib/actions/auction";
import { router } from "expo-router";

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [auctionData, setAuctionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState();

  const check = async () => {
    try {
      const active = true;
      const response = await getProducts(active);
      console.log(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  const recharge = async () => {
    try {
      const userID = 3;
      const amount = 10000;
      const response = await rechargeWalletByUserID(userID, amount);

      const canOpen = await Linking.canOpenURL(response);
      if (canOpen) {
        await Linking.openURL(response);
      } else {
        console.log("Cannot open");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterSelect = (selectedFilter) => {
    setSelectedFilter(selectedFilter);
  };

  const handleSearchParams = (search) => {
    setSearch(search);
    console.log("search", search);
  };

  const getAuction = async () => {
    setIsLoading(true);
    try {
      let params = {};
      if (search) {
        params = { search: search };
      }
      if (selectedFilter !== "ALL") {
        params = { status: selectedFilter };
      }
      if (search && selectedFilter !== "ALL") {
        params = { status: selectedFilter, search: search };
      }

      // if (selectedFilter !== "ALL") {
      //   params = { status: selectedFilter };
      // } else if (search) {
      //   params = { search: search };
      // } else if (search && selectedFilter !== "ALL") {
      //   params = { status: selectedFilter, search: search };
      // } else {
      //   params = {};
      // }
      const response = await getAuctions(params);
      setAuctionData(response.payload.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuction();
  }, [selectedFilter, search]);

  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        className={`${auctionData.length === 0 && "h-[100vh]"} ${
          isLoading && "h-[100vh]"
        } `}
      >
        <View className="m-2">
          <SearchInput onSearch={handleSearchParams} />

          <Wallet />
          <Filter onPress={handleFilterSelect} />

          {/* card fetch api base on filter */}
          {isLoading ? (
            <View className="h-[50vh] items-center justify-center">
              <ActivityIndicator size="large" color="#FFAD41" />
            </View>
          ) : auctionData.length > 0 ? (
            auctionData.map((item, index) => <Card key={item.id} data={item} />)
          ) : (
            <View className="h-[50vh] items-center justify-center">
              <Text className="text-center text-xl">There is no product</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
