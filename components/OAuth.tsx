import { View, Text, Image, Alert } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "../constants";
import { useCallback } from "react";
import { useOAuth } from "@clerk/clerk-expo";
import { googleOAuth } from "../lib/auth";
import { router } from "expo-router";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.code === "session_exists" || result.code === "success") {
        router.replace("/(root)/(tabs)/home");
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View className="flex flex-row justify-center items-center my-3 gap-x-3">
        <View className="flex-1 h-[1px] bg-regent-grey/10" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-regent-grey/10" />
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
