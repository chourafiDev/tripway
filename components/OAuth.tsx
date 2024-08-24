import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "../constants";

const OAuth = () => {
  const handleGoogleSignIn = () => {
    // Google Sign In Logic
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center my-3 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="mx-2 w-5 h-5"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
