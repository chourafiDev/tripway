import { useUser } from "@clerk/clerk-expo";
import { Image, Text, View } from "react-native";
import RideLayout from "../../components/RideLayout";
import { useDriverStore, useLocationStore } from "../../store";
import { icons } from "../../constants";
import { formatTime } from "../../lib/utils";
import Payment from "../../components/Payment";
import { StripeProvider } from "@stripe/stripe-react-native";
import MapArrowRightBold from "../../assets/icons/map-arrow-right-bold.svg";
import MapPoint from "../../assets/icons/map-point.svg";

const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver
  )[0];

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.tripway" // required for Apple Pay
      urlScheme="myapp" // required for 3D Secure and bank redirects
    >
      <RideLayout title="Ride information" snapPoints={["75"]}>
        <View className="bg-brand pb-4 pt-1 px-4">
          <Text className="text-white text-base">
            Select a rider for your own destination.
          </Text>
        </View>
        <View className="p-5 rounded-t-2xl bg-white flex-1 justify-between">
          <View>
            <View className="mt-4 flex flex-row items-center gap-x-4">
              <View className="w-16 h-16 border border-navy/5 p-[2px] rounded-full">
                <Image
                  source={{ uri: driverDetails?.profile_image_url }}
                  className="w-full h-full rounded-full"
                />
              </View>

              <View>
                <Text className="text-xl text-navy font-JakartaBold mb-1">
                  {driverDetails?.title}
                </Text>
                <View className="flex flex-row items-center space-x-1">
                  <Image
                    source={icons.star}
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                  <Text className="text-lg text-navy/60 font-JakartaSemiBold pb-1">
                    {driverDetails?.rating}
                  </Text>
                </View>
              </View>
            </View>

            <View className="rounded-3xl bg-ghost-white border border-navy/5 p-3 mt-7">
              <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                <Text className="text-lg text-navy/80 font-JakartaMedium">
                  Ride Price
                </Text>
                <Text className="text-lg font-JakartaSemiBold text-[#0CC25F]">
                  ${driverDetails?.price}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between w-full border-b border-white py-3">
                <Text className="text-lg text-navy/80 font-JakartaMedium">
                  Pickup Time
                </Text>
                <Text className="text-lg text-navy font-JakartaSemiBold">
                  {formatTime(parseInt(`${driverDetails?.time!}`))}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between w-full py-3">
                <Text className="text-lg text-navy/80 font-JakartaMedium">
                  Car Seats
                </Text>

                <Text className="text-base font-JakartaSemiBold text-brand bg-brand/10 px-4 pb-[7px] pt-[5px] rounded-full">
                  {driverDetails?.car_seats} Seats
                </Text>
              </View>
            </View>

            <View className="flex flex-col w-full items-start justify-center mt-4">
              <View className="flex flex-row items-center justify-start mt-3 border-b border-navy/10 w-full py-3">
                <MapArrowRightBold width={24} height={24} color="#0262E4" />
                <Text className="text-lg text-navy font-JakartaSemiBold ml-4 pb-[2px]">
                  {userAddress}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-start w-full py-3">
                <MapPoint width={24} height={24} color="#0262E4" />
                <Text className="text-lg text-navy font-JakartaSemiBold ml-4 pb-[2px]">
                  {destinationAddress}
                </Text>
              </View>
            </View>
          </View>

          <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.id!}
            rideTime={driverDetails?.time!}
          />
        </View>
      </RideLayout>
    </StripeProvider>
  );
};

export default BookRide;
