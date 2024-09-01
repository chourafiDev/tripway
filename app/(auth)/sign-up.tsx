import { Alert, Image, ScrollView, Text, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import React, { useState } from "react";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import OAuth from "../../components/OAuth";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { images } from "../../constants";
import { fetchAPI } from "../../lib/fetch";
import EmailIcon from "../../assets/icons/email.svg";
import LockIcon from "../../assets/icons/lock.svg";
import PersonIcon from "../../assets/icons/person.svg";
import ConfirmationCodeFiled from "../../components/ConfirmationCodeFiled";
import { LinearGradient } from "expo-linear-gradient";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [codeValue, setCodeValue] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: codeValue,
      });

      if (completeSignUp.status === "complete") {
        // Add user to database
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        // state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.banner} className="w-full h-[250px] z-0" />
          <View className="absolute -bottom-3 left-0 right-0 h-full w-full">
            <LinearGradient
              colors={[
                "transparent",
                "rgba(255, 255, 255, 0.2)",
                "rgba(255, 255, 255, 0.5)",
                "rgba(255, 255, 255, 0.8)",
                "#ffffff",
              ]}
              locations={[0.1, 0.3, 0.5, 0.7, 0.9]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="h-full w-full"
            />
          </View>
          <Text className="text-2xl text-navy font-JakartaBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          <View className="mb-4">
            <InputField
              label="Name"
              placeholder="Enter your name"
              Icon={() => <PersonIcon width={20} height={20} color="#858F9E" />}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
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

          <CustomButton title="Sign Up" onPress={onSignUpPress} />
          <OAuth />

          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center text-navy font-JakartaMedium mt-5"
          >
            <Text>Already have an account? </Text>
            <Text className="text-brand">Sign In</Text>
          </Link>
        </View>

        {/* Verification modal */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            verification.state === "success" && setShowSuccessModal(true);
          }}
        >
          <View className="bg-white p-3 rounded-2xl min-h-[300px]">
            <Text className="text-3xl text-navy pt-4 text-center font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Image
              className="w-20 h-20 mx-auto mb-4 mt-6"
              source={images.verification}
            />
            <Text className="font-JakartaMedium text-navy/60 text-[16px] text-center mb-5">
              Please enter the verification code{"\n"}
              we send to your email address{" "}
              <Text className="text-brand">{form.email}</Text>
            </Text>

            <ConfirmationCodeFiled value={codeValue} setValue={setCodeValue} />

            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className="w-20 h-20 mx-auto my-5" />
            <Text className="text-3xl text-navy font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-navy/50 mt-2 font-JakartaMedium text-center">
              You have successfully verified your account.
            </Text>
            <CustomButton
              title="Browse home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
