import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import FormikPostUploader from "./FormikPostUploader";

const AddNewPost = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {/*formik post uploader */}
      <FormikPostUploader navigation={navigation} />
    </View>
  );
};

export default AddNewPost;

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        style={styles.headerBackIcon}
        source={{
          uri: "https://img.icons8.com/ios-glyphs/60/ffffff/back.png",
        }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>New Post</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBackIcon: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20,
  },
});
