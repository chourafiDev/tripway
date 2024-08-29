import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DriverCardProps } from "../types/type";
import { icons } from "../constants";
import { cn, formatTime } from "../lib/utils";

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  console.log("selected", selected);
  console.log("item.id", item.id);
  return (
    <TouchableOpacity
      onPress={setSelected}
      activeOpacity={0.8}
      className={cn(
        "flex flex-row items-center justify-between py-4 px-3 rounded-3xl border mb-3",
        selected === item.id
          ? "bg-brand/10 border-brand/40"
          : "bg-white border-gray-100"
      )}
    >
      <Image
        source={{ uri: item.profile_image_url }}
        className="w-14 h-14 rounded-full"
      />

      <View className="flex-1 flex flex-col items-start justify-center mx-3">
        <View className="flex flex-row items-center justify-start mb-2">
          <Text className="text-lg text-navy font-JakartaSemiBold">
            {item.title}
          </Text>

          <View className="flex flex-row items-center space-x-1 ml-2">
            <Image source={icons.star} className="w-3.5 h-3.5" />
            <Text className="text-sm text-navy font-JakartaMedium">4.6</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start">
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} className="w-4 h-4" />
            <Text className="text-sm text-navy/80 font-JakartaMedium ml-1">
              ${item.price}
            </Text>
          </View>

          <Text className="text-sm text-navy/80 font-JakartaMedium text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm text-navy/80 font-JakartaMedium text-general-800">
            {formatTime(parseInt(`${item.time}`))}
          </Text>

          <Text className="text-sm text-navy/80 font-JakartaMedium text-general-800 mx-1">
            |
          </Text>

          <Text className="text-sm text-navy/80 font-JakartaMedium text-general-800">
            {item.car_seats} seats
          </Text>
        </View>
      </View>

      <Image
        source={{ uri: item.car_image_url }}
        className="h-16 w-16"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default DriverCard;
