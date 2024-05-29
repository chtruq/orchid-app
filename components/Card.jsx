import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

const Card = ({ data }) => {
  return (
    <View className="bg-white shadow-lg shadow-slate-300 rounded-lg border-black-200 p-3 m-2 ">
      <Image
        className="h-40 w-[90wh] rounded-md"
        source={{ uri: data.image_url }}
      />
      <View
        className={` w-[25%] mt-2 mr-4 absolute right-0 bottom-2 p-2 bg-white border-2 rounded-lg border-gray-400 ${
          data.status === "END" ? "bg-gray-800" : "bg-white"
        } ${data.status === "COMING" ? "bg-orange-200" : "bg-white"} ${
          data.status === "LIVE" ? "bg-green-200" : "bg-white"
        } `}
      >
        <Text
          className={`text-center capitalize ${
            data.status === "END" ? "text-gray-400" : ""
          } ${data.status === "COMING" ? "text-black-200" : ""}`}
        >
          {data.status}
        </Text>
      </View>

      <Text className="text-xl">{data.title}</Text>

      <Text className="text-sm">Quantity: {data.quantity} </Text>
      <Text>
        Bidding Price:{" "}
        {data.biddingPrice === null ? "Not yet" : data.biddingPrice}{" "}
      </Text>
      <Text>
        Start:{" "}
        {new Date(data.startDate).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      <Text>
        End:{" "}
        {new Date(data.endDate).toLocaleString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      {
        //show null if data do not have any data
        data === null || data === undefined ? (
          <Text>There is no product</Text>
        ) : null
      }
    </View>
  );
};

export default Card;
