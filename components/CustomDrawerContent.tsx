import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { router } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import GlobalPoint from "../assets/icons/global.svg";
import StreetsMapPoint from "../assets/icons/streets-map.svg";
import ArrowRightPoint from "../assets/icons/map-arrow-right-bold.svg";
import HelpIcon from "../assets/icons/help.svg";
import LogoutIcon from "../assets/icons/logout.svg";
import SettingsIcon from "../assets/icons/settings.svg";
import NotificationIcon from "../assets/icons/notification.svg";

export default function CustomDrawerContent(props: any) {
  const { user } = useUser();
  const { signOut } = useAuth();

  // handle sign out
  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };
  return (
    <View className="p-4 flex-1">
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <View className="mb-6 flex-row items-center gap-x-3 border-b border-regent-grey/20 pb-6">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            className="h-14 w-14 rounded-full shadow-xl shadow-regent-grey"
          />
          {user?.firstName && user?.lastName ? (
            <Text className="font-JakartaBold text-xl">
              <Text>{user?.firstName} </Text>
              <Text>{user?.lastName}</Text>
            </Text>
          ) : (
            <Text className="font-JakartaBold text-xl">
              {user?.emailAddresses[0].emailAddress.split("@")[0]}
            </Text>
          )}
        </View>

        <View>
          <TouchableOpacity
            className="flex-row space-x-5 items-center mb-6"
            onPress={() => {
              router.navigate("/(root)/(tabs)/home");
            }}
          >
            <GlobalPoint width={22} height={22} color="#0C203D" />

            <Text className="text-navy text-lg font-JakartaBold">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row space-x-5 items-center mb-6"
            onPress={() => {
              router.navigate("/(root)/find-ride");
            }}
          >
            <ArrowRightPoint width={22} height={22} color="#0C203D" />

            <Text className="text-navy text-lg font-JakartaBold">Fin Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row space-x-5 items-center mb-6"
            onPress={() => {
              router.navigate("/(root)/(tabs)/rides");
            }}
          >
            <StreetsMapPoint width={22} height={22} color="#0C203D" />

            <Text className="text-navy text-lg font-JakartaBold">Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row space-x-5 items-center mb-6"
            onPress={() => {
              router.navigate("/(root)/notifications");
            }}
          >
            <NotificationIcon width={22} height={22} color="#0C203D" />

            <Text className="text-navy text-lg font-JakartaBold">
              Notifications
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row space-x-5 items-center mb-6"
            onPress={() => {
              router.navigate("/(root)/settings");
            }}
          >
            <SettingsIcon width={22} height={22} color="#0C203D" />
            <Text className="text-navy text-lg font-JakartaBold">Settings</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>

      <View className="border-t border-regent-grey/20 pt-6">
        <TouchableOpacity
          className="flex-row space-x-5 items-center mb-6"
          onPress={() => {
            router.navigate("/(root)/help");
          }}
        >
          <HelpIcon width={22} height={22} color="#0C203D" />
          <Text className="text-navy text-lg font-JakartaBold">Help</Text>
        </TouchableOpacity>
        <Pressable
          onPress={handleSignOut}
          className="flex-row space-x-5 items-center mb-6"
        >
          <LogoutIcon width={22} height={22} color="#0C203D" />
          <Text className="text-navy text-lg font-JakartaBold">Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
}
