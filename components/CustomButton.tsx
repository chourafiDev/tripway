import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "../types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green";
    case "outline":
      return "bg-ghost-white border-regent-grey/20 border-[0.5px]";
    default:
      return "bg-brand";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`w-full rounded-[20px] p-4 flex flex-row justify-center items-center ${getBgVariantStyle(
        bgVariant
      )} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-bold mx-4 ${getTextVariantStyle(textVariant)}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
