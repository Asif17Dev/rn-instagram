import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

import SignupForm from "../components/Signup/SignupForm";

const insta_logo =
  "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-512.png";
const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: insta_logo,
          }}
        />
      </View>

      <SignupForm navigation={navigation} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});
