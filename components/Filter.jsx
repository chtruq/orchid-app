import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Filter = ({ onPress }) => {
  const [selectedButton, setSelectedButton] = useState("ALL");

  const statusData = [
    { label: "All", value: "ALL" },
    { label: "Coming", value: "COMING" },
    { label: "Live", value: "LIVE" },
    { label: "Ended", value: "END" },
  ];

  return (
    <ScrollView>
      <View className="flex flex-row justify-between">
        {statusData.map((item, index) => (
          <View
            key={index}
            className={`flex-1 m-1 p-2  border-gray-200 shadow-sm rounded-2xl ${
              selectedButton === item.value
                ? "bg-orange-500 border-orange-500 "
                : "bg-white"
            }`}
          >
            <TouchableOpacity
              onPress={() => {
                onPress(item.value);
                setSelectedButton(item.value);
              }}
            >
              <Text
                className={`text-center ${
                  selectedButton === item.value
                    ? "text-white"
                    : "text-black-100"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Filter;
