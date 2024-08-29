import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { InputFieldProps } from "../types/type";

const InputField = ({
  label,
  Icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`text-lg text-navy font-JakartaSemiBold mb-3 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-brand/5 rounded-[20px] border border-brand/5 focus:border-brand  ${containerStyle}`}
          >
            {Icon && (
              <View className="ml-4">
                <Icon />
              </View>
            )}
            <TextInput
              className={`rounded-full text-navy p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              placeholderTextColor="#858F9E"
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
