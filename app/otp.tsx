import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaskInput from "react-native-mask-input";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

const INDIA_PHONE_MASK = [
  "+",
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  const { bottom } = useSafeAreaInsets();
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const openLink = () => {
    Linking.openURL("https://www.whatsapp.com/legal/#privacy-policy");
  };

  const sendOtp = async () => {
    setLoading(true);

    try {
      await signUp!.create({
        phoneNumber,
      });
      signUp!.preparePhoneNumberVerification();
      router.push(`/verify/${phoneNumber}`);
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        if (error.errors[0].code === "form_identifier_exists") {
          console.log("User already exists");
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert("Error", error.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    const { supportedFirstFactors } = await signIn!.create(
      {
        identifier: phoneNumber,
      }
    );

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === "phone_code"
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: "phone_code",
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);

  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>Sending Code</Text>
          </View>
        )}
        <Text style={styles.description}>
          Whatsapp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listItemText}>
            <Text>India</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />
          <MaskInput
            value={phoneNumber}
            keyboardType="numeric"
            autoFocus
            placeholder="+91 your phone number"
            style={styles.input}
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked); // you can use the unmasked value as well

              // assuming you typed "9" all the way:
              console.log(masked); // (99) 99999-9999
              console.log(unmasked); // 99999999999
            }}
            mask={INDIA_PHONE_MASK}
          />
        </View>

        <Text>
          You must be{" "}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{" "}
          to register. Learn how whatsApp works with the{" "}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies
          </Text>
          .
        </Text>

        <View style={{ width: "100%", flex: 1 }} />

        <TouchableOpacity
          onPress={sendOtp}
          style={[
            styles.button,
            phoneNumber.length !== 0 ? styles.enabled : null,
            [{ marginBottom: bottom }],
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber.length !== 0 ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  list: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  listItemText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.lightGray,
    marginLeft: 50,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: Colors.primary,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  input: {
    fontSize: 16,
    padding: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Page;
