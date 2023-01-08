import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import validator from "email-validator";
import firebase, { db } from "../../firebase";

const SignupForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    username: Yup.string().required().min(2, "A Username is required"),
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password has to have at least 8 characters"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      console.log("firebase signup successfull");

      db.collection("users")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        });

      // navigation.push("HomeScreen");
    } catch (error) {
      Alert.alert("My Lord", error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
        onSubmit={(values) => {
          onSignup(values.email, values.password, values.username);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          errors,
          values,
          touched,
        }) => (
          <View>
            <View
              style={[
                styles.input,
                {
                  borderColor:
                    1 > values.username.length || values.username.length >= 2
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Username"
                placeholderTextColor="#444"
                autoCapitalize="none"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                autoFocus={true}
              />
            </View>
            <View
              style={[
                styles.input,
                {
                  borderColor:
                    values.email.length < 1 || validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Phone number, username or email"
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.input,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 8
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#444"
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
                textContentType="password"
              />
            </View>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6bb0f5" }}>Forgot Password?</Text>
            </View>

            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>

            <View style={styles.loginContainer}>
              <Text>Already have an account </Text>
              <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
                <Text style={{ color: "#6bb0f5" }}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  input: {
    color: "#000",
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#fafafa",
    marginBottom: 10,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096ff" : "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: { color: "white", fontWeight: "600", fontSize: 20 },
  loginContainer: {
    flexDirection: "row",
    marginTop: 50,
    width: "100%",
    justifyContent: "center",
  },
});
