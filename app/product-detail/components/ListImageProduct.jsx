import { View, Text, Image } from "react-native";
import React from "react";
import Carousel from "pinar";

const ListImageProduct = ({ data }) => {
    const images = data.productImages
  return (
    <View className="p-4">
      <Carousel className="w-full h-72 border-2 rounded-lg" showsControls={false}>
        {images.map((image) => (
          <Image
            key={image.id}
            className="w-full h-72 rounded-lg"
            source={{ uri: image.image_url }}
          />
        ))}
      </Carousel>
    </View>
  );
};

export default ListImageProduct;
