import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SearchInput = ({ onSearch }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(onSearch || "");

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-white rounded-2xl border-2 border-gray-200 shadow-md focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-black-100 flex-1 font-pregular"
        value={query}
        placeholder="Search for a auction..."
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        className="flex items-center justify-center w-12 rounded-2xl"
        onPress={() => {
          // if (query === "")
          //   return Alert.alert(
          //     "Missing Query",
          //     "Please input something to search results across database"
          //   );
          onSearch(query);
        }}
      >
        <FontAwesome name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
