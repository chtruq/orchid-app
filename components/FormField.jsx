import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black-200 font-pmedium">{title}</Text>

      <View className="w-full h-16 px-4 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 text-black-200 font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#A1A1A1"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Password" && !showPassword) ||
            (title === "Password Confirm" && !showConfirmPassword)
          }
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {title === "Password Confirm" && (
          <TouchableOpacity
            onPress={() => setConfirmShowPassword(!showConfirmPassword)}
          >
            <Image
              source={!showConfirmPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
