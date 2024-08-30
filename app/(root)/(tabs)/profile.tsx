import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../../../components/InputField";
import HamburgerMenu from "../../../assets/icons/hamburger-menu.svg";
import AltArrowLeft from "../../../assets/icons/alt-arrow-left.svg";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

const Profile = () => {
  const { user } = useUser();

  // open drawer
  const navigation = useNavigation();
  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-regent-grey/10 w-10 h-10 rounded-full flex justify-center items-center"
          >
            <AltArrowLeft width={20} height={20} color="#0C203D" />
          </TouchableOpacity>
          <Text className="text-[22px] font-JakartaExtraBold text-navy">
            Profile
          </Text>
          <TouchableOpacity onPress={handleOpenDrawer}>
            <HamburgerMenu width={25} height={25} color="#0C203D" />
          </TouchableOpacity>
        </View>

        <View className="flex items-center justify-center my-5">
          <View className="border-2 border-brand/80 rounded-full p-1">
            <Image
              source={{
                uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
              }}
              style={{ width: 100, height: 100, borderRadius: 110 / 2 }}
              className="h-[100px] w-[100px]  shadow-xl shadow-regent-grey"
            />
          </View>
        </View>

        <View className="flex flex-col items-start justify-start w-full mt-3">
          <InputField
            label="First name"
            placeholder={user?.firstName || "Not Found!"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />

          <InputField
            label="Last name"
            placeholder={user?.lastName || "Not Found!"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />

          <InputField
            label="Email"
            placeholder={
              user?.primaryEmailAddress?.emailAddress || "Not Found!"
            }
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />

          <InputField
            label="Phone"
            placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found!"}
            containerStyle="w-full"
            inputStyle="p-3.5"
            editable={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
