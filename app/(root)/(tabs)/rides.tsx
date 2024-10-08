import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RideCard from "../../../components/RideCard";
import { images } from "../../../constants";
import { useFetch } from "../../../lib/fetch";
import { Ride } from "../../../types/ride";

const Rides = () => {
  const { user } = useUser();

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  return (
    <SafeAreaView className="flex-1 bg-ghost-white">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(_, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-base text-navy font-JakartaSemiBold">
                  No recent rides found
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#0262E4" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <Text className="text-2xl text-navy font-JakartaBold my-5">
            All Rides{" "}
            <Text className="text-brand">({recentRides?.length})</Text>
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
