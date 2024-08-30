import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useNavigation } from "expo-router";
import * as Location from "expo-location";
import { useUser } from "@clerk/clerk-expo";
import RideCard from "../../../components/RideCard";
import { GoogleTextInput2 } from "../../../components/GoogleTextInput";
import Map from "../../../components/Map";
import { useLocationStore } from "../../../store";
import { useFetch } from "../../../lib/fetch";
import { images } from "../../../constants";
import HamburgerMenu from "../../../assets/icons/hamburger-menu.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Ride } from "../../../types/ride";
import { DrawerActions } from "@react-navigation/native";

export default function Page() {
  const { user } = useUser();

  // fetch recent rides
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  );

  // handle use location
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  // handle destination search
  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    console.log("test");
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  // open drawer
  const navigation = useNavigation();
  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View className="flex-1 bg-ghost-white">
      <View className="bg-brand relative rounded-b-3xl shadow-xl shadow-regent-grey/80 px-4 py-8 mb-3">
        <View className="flex flex-row items-center justify-between mt-5 mb-8">
          <View className="absolute -top-36 -right-5 w-56 h-96 rotate-[65deg]">
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.4)", "transparent"]}
              className="h-full"
            />
          </View>
          <View className="absolute top-8 -right-0 w-28 h-96 rotate-[65deg]">
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.4)", "transparent"]}
              className="h-full"
            />
          </View>

          <View>
            <Text className="text-white text-[26px] mb- font-JakartaExtraBold">
              Trip Way
            </Text>
            <Text className="text-white/80 text-base font-JakartaMedium">
              Ride in minutes!
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleOpenDrawer}
            className="border border-white/10 p-[3px] rounded-full flex flex-row items-center gap-x-2"
          >
            <HamburgerMenu width={25} height={25} color="#ffffff" />
            <Image
              source={{ uri: user?.imageUrl }}
              className="w-9 h-9 rounded-full"
            />
          </TouchableOpacity>
        </View>

        <GoogleTextInput2 handlePress={handleDestinationPress} />
      </View>

      <View className="p-4 mb-3">
        <Text className="text-xl text-navy font-JakartaBold mb-3">
          Your current location
        </Text>
        <View className="flex flex-row items-center justify-center bg-white p-1 rounded-3xl overflow-hidden h-[300px]">
          <Map />
        </View>
      </View>

      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="mx-4"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm text-navy font-JakartaSemiBold">
                  No recent rides found
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <Text className="text-xl text-navy font-JakartaBold mb-3">
            Recent Rides
          </Text>
        }
      />
    </View>
  );
}
