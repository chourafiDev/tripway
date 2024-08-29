import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapArrowRight from "../assets/icons/map-arrow-right.svg";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

interface GoogleInputProps {
  initialLocation?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

export const GoogleTextInput = ({
  initialLocation,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View className="flex flex-row items-center justify-center relative z-50 rounded-xl pr-4">
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where you want to go?"
        debounce={200}
        styles={{
          textInput: {
            backgroundColor: "#ffffff",
            fontSize: 18,
            fontWeight: "800",
            borderRadius: 10,
          },
          listView: {
            backgroundColor: "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 20,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        textInputProps={{
          placeholderTextColor: "#0C203D",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
      />
    </View>
  );
};

export const GoogleTextInput2 = ({
  initialLocation,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View className="bg-white rounded-3xl p-4">
      <Text className="text-navy font-JakartaBold text-[21px] mb-2 border-b border-dashed border-navy/10 pb-3">
        Where do you want to go?
      </Text>
      <View className="flex flex-row items-center justify-center relative z-50 rounded-xl">
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Find the location..."
          debounce={200}
          styles={{
            textInputContainer: {
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              position: "relative",
              shadowColor: "#d4d4d4",
            },
            textInput: {
              backgroundColor: "white",
              fontSize: 16,
              fontWeight: "600",
              marginTop: 5,
              width: "100%",
              borderRadius: 200,
            },
            listView: {
              backgroundColor: "white",
              position: "relative",
              top: 0,
              width: "100%",
              borderRadius: 10,
              shadowColor: "#d4d4d4",
              zIndex: 99,
            },
          }}
          onPress={(data, details = null) => {
            console.log("test 2 -----------------");
            handlePress({
              latitude: details?.geometry.location.lat!,
              longitude: details?.geometry.location.lng!,
              address: data.description,
            });
          }}
          query={{
            key: googlePlacesApiKey,
            language: "en",
          }}
          renderLeftButton={() => (
            <View className="flex justify-center items-center w-7 h-7 bg-brand rounded-full mr-1">
              <MapArrowRight width={17} height={17} color="#ffffff" />
            </View>
          )}
          textInputProps={{
            placeholderTextColor: "rgba(12, 32, 61, 0.4)",
            placeholder: initialLocation ?? "Find the location...",
          }}
        />
      </View>
    </View>
  );
};
