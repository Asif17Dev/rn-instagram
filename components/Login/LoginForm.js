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
import firebase from "../../firebase";

const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password has to have at least 8 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("firebase login successfully", email, password);
      // navigation.push("HomeScreen");
    } catch (error) {
      Alert.alert(
        "My Lord",
        error.message + "\n\n... What would you like to next...?",
        [
          {
            text: "OK",
            onPress: () => console.log("OK"),
            style: "cancel",
          },
          {
            text: "Sign Up",
            onPress: () => navigation.push("SignupScreen"),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          values,
          isSubmitting,
        }) => (
          <View>
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
                autoFocus={true}
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
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account </Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6bb0f5" }}>SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

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
  signupContainer: {
    flexDirection: "row",
    marginTop: 50,
    width: "100%",
    justifyContent: "center",
  },
});
