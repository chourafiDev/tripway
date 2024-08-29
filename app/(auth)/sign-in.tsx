import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import OAuth from "../../components/OAuth";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { images } from "../../constants";
import EmailIcon from "../../assets/icons/email.svg";
import LockIcon from "../../assets/icons/lock.svg";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      Alert.alert(err.errors[0].longMessage);
    }
  }, [isLoaded, form.email, form.password]);
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-[250px] z-0" />
          <Text className="text-2xl text-navy font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          <View className="mb-4">
            <InputField
              label="Email"
              placeholder="Enter your email"
              Icon={() => <EmailIcon width={20} height={20} color="#858F9E" />}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              Icon={() => <LockIcon width={20} height={20} color="#858F9E" />}
              value={form.password}
              secureTextEntry={true}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
          </View>

          <CustomButton title="Sign In" onPress={onSignInPress} />
          <OAuth />

          <Link
            href="/(auth)/sign-up"
            className="text-lg text-center font-JakartaMedium text-navy mt-8"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-brand">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
