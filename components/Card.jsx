import { View, Text, Image, ScrollView } from "react-native";
import React from "react";

const Card = ({ data }) => {
  return (
    <View className="bg-white border-2 rounded-lg border-black-200 p-3 pt-5 m-2 ">
      <Image className="h-40 w-[90wh] " source={{ uri: data.image_url }} />
      <View
        className={` mt-2 mr-2 absolute right-0 bottom-2 p-2 bg-white border-2 rounded-lg border-black-100 ${
          data.status === "END" ? "bg-gray-800" : "bg-white"
        } ${data.status === "COMING" ? "bg-green-400" : "bg-white"} `}
      >
        <Text
          className={`${data.status === "END" ? "text-black" : ""} ${
            data.status === "COMING" ? "text-black-200" : ""
          }`}
        >
          {data.status}
        </Text>
      </View>

      <Text>{data.title}</Text>
      <Text>{data.startDate}</Text>
      <Text>{data.endDate}</Text>
      <Text>{data.remindDate}</Text>
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
