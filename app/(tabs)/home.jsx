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
import {
  getWalletByUserID,
  rechargeWalletByUserID,
} from "../../lib/actions/wallet";
import SearchInput from "../../components/SearchInput";
import Wallet from "../../components/Wallet";
import Filter from "../../components/Filter";
import Card from "../../components/Card";
import { getAuctions } from "../../lib/actions/auction";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [auctionData, setAuctionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState();
  const [balance, setBalance] = useState(0); // [1
  const { user } = useGlobalContext();

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
      const userID = 4;
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
  };

  const handleShowBalance = async () => {
    try {
      const response = await getWalletByUserID(user.id);
      setBalance(response.balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowBalance();
  }, []);

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
        {/* <TouchableOpacity onPress={() => recharge()}>
          <Text>Check</Text>
        </TouchableOpacity> */}

        <View className="m-2">
          <SearchInput onSearch={handleSearchParams} />

          <Wallet
            //  onDeposit={() => handleDeposit()}
            balance={balance}
          />
          <Filter onPress={handleFilterSelect} />

          {/* card fetch api base on filter */}
          {isLoading ? (
            <View className="h-[50vh] items-center justify-center">
              <ActivityIndicator size="large" color="#FFAD41" />
            </View>
          ) : auctionData.length > 0 ? (
            auctionData.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  router.navigate({
                    pathname: `/product-detail/[id]`,
                    params: { id: item.id },
                  })
                }
              >
                <Card data={item} />
              </TouchableOpacity>
            ))
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
