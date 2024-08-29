import { Tabs } from "expo-router";
import { View } from "react-native";
import { cn } from "../../../lib/utils";
import UserIcon from "../../../assets/icons/user.svg";
import DialogIcon from "../../../assets/icons/dialog.svg";
import StreetsMapIcon from "../../../assets/icons/streets-map.svg";
import GlobalIcon from "../../../assets/icons/global.svg";

type TabIconProps = {
  focused: boolean;
  Icon: any;
};

const TabIcon = ({ focused, Icon }: TabIconProps) => (
  <View
    className={cn(
      "flex w-12 h-12 justify-center items-center rounded-2xl",
      focused && "bg-brand"
    )}
  >
    <Icon />
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0C203D",
          borderRadius: 24,
          overflow: "hidden",
          marginHorizontal: 16,
          marginBottom: 20,
          height: 70,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              Icon={() => <GlobalIcon color="#ffffff" width={30} height={30} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              Icon={() => (
                <StreetsMapIcon color="#ffffff" width={30} height={30} />
              )}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              Icon={() => <DialogIcon color="#ffffff" width={30} height={30} />}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              Icon={() => <UserIcon color="#ffffff" width={30} height={30} />}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
