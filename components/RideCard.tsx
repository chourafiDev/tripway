import { Text, View } from "react-native";
import { Ride } from "../types/ride";
import { formatDate, formatTime } from "../lib/utils";
import MapArrowRightBold from "../assets/icons/map-arrow-right-bold.svg";
import MapPoint from "../assets/icons/map-point.svg";
import Calendar from "../assets/icons/calendar.svg";

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <View className="p-4 bg-white rounded-3xl shadow-xl shadow-neutral-100 mb-3">
      <View className="flex flex-col gap-y-3 flex-1">
        <View className="flex flex-row items-center gap-x-4">
          <MapArrowRightBold width={17} height={17} color="#0262E4" />
          <Text
            className="text-base text-navy font-JakartaBold mb-1"
            numberOfLines={1}
          >
            {ride.origin_address}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-x-4">
          <MapPoint width={17} height={17} color="#0262E4" />
          <Text
            className="text-base text-navy font-JakartaBold mb-1"
            numberOfLines={1}
          >
            {ride.destination_address}
          </Text>
        </View>
        <View className="flex flex-row items-center gap-x-4">
          <Calendar width={17} height={17} color="#0262E4" />
          <Text
            className="text-base text-navy font-JakartaBold mb-1"
            numberOfLines={1}
          >
            {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
          </Text>
        </View>
      </View>

      <View className="mt-5 pt-5 border-t border-dashed border-navy/10">
        <View className="flex flex-row items-center w-full justify-between mb-4 border-b border-navy/5 pb-4">
          <Text className="text-[15px] font-JakartaSemiBold text-navy/70">
            Driver
          </Text>
          <Text className="text-base font-JakartaSemiBold text-navy">
            {ride.driver.first_name} {ride.driver.last_name}
          </Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between mb-4 border-b border-navy/5 pb-4">
          <Text className="text-[15px] font-JakartaSemiBold text-navy/70">
            Car Seats
          </Text>
          <Text className="text-[15px] font-JakartaSemiBold text-brand bg-brand/10 px-4 pb-1 rounded-full">
            {ride.driver.car_seats} Seats
          </Text>
        </View>

        <View className="flex flex-row items-center w-full justify-between">
          <Text className="text-md font-JakartaSemiBold text-navy/70">
            Payment Status
          </Text>
          <Text
            className={`text-[15px] capitalize font-JakartaSemiBold px-3 pb-1 rounded-full ${
              ride.payment_status === "paid"
                ? "text-green bg-green/10"
                : "text-red-500 bg-red-300"
            }`}
          >
            {ride.payment_status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
