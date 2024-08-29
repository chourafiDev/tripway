import { View, FlatList, Text } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { useDriverStore, useLocationStore } from "../../store";
import DriverCard from "../../components/DriverCard";
import RideLayout from "../../components/RideLayout";
import ArrowRight from "../../assets/icons/arrow-right.svg";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();
  const { userAddress, destinationAddress } = useLocationStore();

  return (
    <RideLayout title="Choose a Rider" snapPoints={["80"]}>
      <View className="bg-brand pb-4 pt-1 px-4">
        <Text className="text-white text-base">
          Select a rider for your own destination.
        </Text>
        <Text className="text-white/80 text-[15px] font-JakartaMedium mt-2 mb-1">
          <Text className="text-white">From |</Text> {userAddress}
        </Text>
        <Text className="text-white/80 text-[15px] font-JakartaMedium">
          <Text className="text-white">To |</Text> {destinationAddress}
        </Text>
      </View>
      <View className="p-3 rounded-t-2xl bg-white flex-1 justify-between">
        <FlatList
          data={drivers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DriverCard
              item={item}
              selected={selectedDriver!}
              setSelected={() => setSelectedDriver(Number(item.id)!)}
            />
          )}
          className="mt-3"
        />
        <CustomButton
          title="Select Rider"
          onPress={() => router.push("/(root)/book-ride")}
          IconRight={() => (
            <ArrowRight width={20} height={20} color="#ffffff" />
          )}
        />
      </View>
    </RideLayout>
  );
};

export default ConfirmRide;
