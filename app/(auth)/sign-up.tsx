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

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
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
        code: verification.code,
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
        state: "failed",
      });
    }
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="w-full h-[250px] z-0" />
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
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Text className="font-JakartaMedium mb-5">
              We have sent verification code to {form.email}
            </Text>

            {/* <InputField
              label="Verification Code"
              placeholder="Enter verification code"
              value={verification.code}
              icon={icons.lock}
              onChangeText={(value) =>
                setVerification({ ...verification, code: value })
              }
              keyboardType="number-pad"
            /> */}

            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className="w-20 h-20 mx-auto my-5" />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 mt-2 font-JakartaMedium text-center">
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
