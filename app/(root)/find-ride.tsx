import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "../../store";
import { GoogleTextInput } from "../../components/GoogleTextInput";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import RideLayout from "../../components/RideLayout";
import MapPoint from "../../assets/icons/map-point.svg";
import MapArrowDown from "../../assets/icons/map-arrow-down.svg";
import ArrowRight from "../../assets/icons/arrow-right.svg";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout title="Check Ride" snapPoints={["55"]}>
      <View className="bg-brand pb-4 pt-1 px-4">
        <Text className="text-white text-base">
          Check your destination and click on find now.
        </Text>
      </View>
      <View className="p-3 rounded-t-2xl bg-white flex-1 justify-between">
        <View className="flex flex-row bg-ghost-white border border-navy/5 p-4 mt-3 rounded-3xl">
          <View className="flex-1">
            <View className="mb-3 pb-4 border-b border-dashed border-navy/10">
              <Text className="text-navy/50 font-JakartaSemiBold text-[17px] mb-2">
                From
              </Text>

              <GoogleTextInput
                initialLocation={userAddress!}
                handlePress={(location) => setUserLocation(location)}
              />
            </View>
            <View>
              <Text className="text-navy/50 font-JakartaSemiBold text-[17px] mb-2">
                To
              </Text>

              <GoogleTextInput
                initialLocation={destinationAddress!}
                handlePress={(location) => setDestinationLocation(location)}
              />
            </View>
          </View>
          <View className="relative justify-between border-l border-navy/5 pl-4">
            <View className="w-10 h-10 rounded-full border border-navy/5 p-[2px]">
              <View className="bg-navy w-full h-full rounded-full flex justify-center items-center">
                <MapArrowDown width={18} height={18} color="#ffffff" />
              </View>
            </View>
            <View className="absolute top-12 left-8 h-[90px] w-1 border-r border-dashed border-navy/10"></View>
            <View className="absolute top-[80px] -left-[18px] h-8 w-8 bg-ghost-white rounded-full"></View>
            <View className="w-10 h-10 rounded-full border border-navy/5 p-[2px]">
              <View className="bg-brand w-full h-full rounded-full flex justify-center items-center">
                <MapPoint width={19} height={19} color="#ffffff" />
              </View>
            </View>
          </View>
        </View>

        <CustomButton
          title="Find Now"
          onPress={() => router.push(`/(root)/confirm-ride`)}
          className="mt-5"
          IconRight={() => (
            <ArrowRight width={20} height={20} color="#ffffff" />
          )}
        />
      </View>
    </RideLayout>
  );
};

export default FindRide;
