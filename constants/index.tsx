import { StyleSheet, Platform } from "react-native";
import dollar from "../assets/icons/dollar.png";
import google from "../assets/icons/google.png";
import marker from "../assets/icons/marker.png";
import pin from "../assets/icons/pin.png";
import selectedMarker from "../assets/icons/selected-marker.png";
import star from "../assets/icons/star.png";
import check from "../assets/images/check.png";
import getStarted from "../assets/images/get-started.png";
import message from "../assets/images/message.png";
import noResult from "../assets/images/no-result.png";
import onboarding1 from "../assets/images/onboarding1.png";
import onboarding2 from "../assets/images/onboarding2.png";
import onboarding3 from "../assets/images/onboarding3.png";
import signUpCar from "../assets/images/signup-car.png";
import verification from "../assets/images/verification.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  noResult,
  message,
  verification,
};

export const icons = {
  dollar,
  google,
  marker,
  pin,
  selectedMarker,
  star,
};

export const onboarding = [
  {
    id: 1,
    title: "The perfect ride is just a tap away!",
    description:
      "Your journey begins with Trip Way. Find your ideal ride effortlessly.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Best car in your hands with Trip Way",
    description:
      "Discover the convenience of finding your perfect ride with Trip Way",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Your ride, your way. Let's go!",
    description:
      "Enter your destination, sit back, and let us take care of the rest.",
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};

// confirmation code field style
export const CELL_SIZE = 53;
export const CELL_BORDER_RADIUS = 18;
export const DEFAULT_CELL_BG_COLOR = "#F7F9FC";
export const NOT_EMPTY_CELL_BG_COLOR = "#0262E4";
export const ACTIVE_CELL_BG_COLOR = "#F7F9FC";

export const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    marginTop: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  cell: {
    marginHorizontal: 2,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - -14,
    ...Platform.select({ web: { lineHeight: 65 } }),
    fontSize: 30,
    textAlign: "center",
    borderRadius: CELL_BORDER_RADIUS,
    color: "#0262E4",
    borderWidth: 1,
    borderColor: "rgba(12, 32, 61, 0.3)",
    borderStyle: "solid",
  },
});
