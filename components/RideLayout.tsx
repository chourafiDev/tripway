import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Map from "./Map";
import AltArrowLeft from "../assets/icons/alt-arrow-left.svg";

const RideLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex gap-x-3 flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <AltArrowLeft width={20} height={20} color="#0C203D" />
              </View>
            </TouchableOpacity>
            <View className="bg-white rounded-full h-10 px-7">
              <Text className="text-lg text-navy pb-[5px] my-auto font-JakartaSemiBold">
                {title || "Go Back"}
              </Text>
            </View>
          </View>

          <Map />
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["50%", "70%", "85%"]}
          index={0}
          backgroundStyle={{ backgroundColor: "#0262E4" }}
          handleIndicatorStyle={{ backgroundColor: "#ffffff" }}
          // handleStyle={{ backgroundColor: "#0262E4", borderWidth: 0 }}
        >
          <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
