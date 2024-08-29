import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { data } from "../../constants";
import CustomButton from "../../components/CustomButton";
import ArrowRight from "../../assets/icons/arrow-right.svg";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === data.onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="flex flex-row items-center w-full justify-end gap-x-1 p-5"
      >
        <Text className="text-navy text-md font-JakartaBold pb-1">Skip</Text>
        <ArrowRight color="#0C203D" width={17} height={17} />
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="bg-[#E2E8F0] w-[32px] h-[4px] mx-1 rounded-full"></View>
        }
        activeDot={
          <View className="bg-[#0286FF] w-[32px] h-[4px] mx-1 rounded-full"></View>
        }
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
      >
        {data.onboarding.map((item) => (
          <View key={item.id} className="flex justify-center items-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center mt-10 w-full">
              <Text className="text-navy text-3xl text-center font-bold mx-10">
                {item.title}
              </Text>
            </View>

            <Text className="text-navy/60 text-lg font-JakartaMedium text-center mx-10 mt-4">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className="w-11/12 my-10"
        IconRight={() => <ArrowRight color="#ffffff" width={17} height={17} />}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
