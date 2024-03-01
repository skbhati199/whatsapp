import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import welcomeImage from "@/assets/images/welcome.png";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
const welcome_image = Image.resolveAssetSource(welcomeImage).uri;
import * as WebBrowser from "expo-web-browser";

import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
 
WebBrowser.maybeCompleteAuthSession();
const Page = () => {
  useWarmUpBrowser();

  const onLinkPress = () => {
    Linking.openURL("https://www.whatsapp.com/legal/#privacy-policy");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcomeImage} />
      <Text style={styles.headline}>Welcome to WhatsApp Clone</Text>
      <Text style={styles.description}>
        Read Our{" "}
        <Text style={styles.link} onPress={onLinkPress}>
          Privacy Policy
        </Text>
        . {'Tap "Agree and continue" to accept the '}
        <Text style={styles.link} onPress={onLinkPress}>
          Terms of Service
        </Text>
      </Text>
      <Link href={"/otp"} replace asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agree and continue</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  welcomeImage: {
    width: "100%",
    height: 300,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
    marginBottom: 80,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: "bold",
  },
});
