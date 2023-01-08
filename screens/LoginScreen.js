import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

import LoginForm from "../components/Login/LoginForm";

const insta_logo =
  "https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Instagram-512.png";
const LoginScreen = ({ navigation }) => {
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

      <LoginForm navigation={navigation} />
    </View>
  );
};

export default LoginScreen;

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
