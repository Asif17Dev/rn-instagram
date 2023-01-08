import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Button } from "react-native";
import validUrl from "valid-url";
import firebase, { db } from "../../firebase";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL is required"),
  caption: Yup.string().max(2200, "Caption has reached the character"),
});

const Placeholder_img =
  "https://archive.org/download/placeholder-image/placeholder-image.jpg";

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailImg, setThumbnailImg] = useState(Placeholder_img);

  const [currentLoggedinUser, setCurrentLoggedinUser] = useState(null);
  console.log(currentLoggedinUser);

  useEffect(() => {
    const getUsername = () => {
      const user = firebase.auth().currentUser;
      const unsubscribe = db
        .collection("users")
        .where("owner_uid", "==", user.uid)
        .limit(1)
        .onSnapshot((snapshot) =>
          snapshot.docs.map((doc) => {
            setCurrentLoggedinUser({
              username: doc.data().username,
              profile_picture: doc.data().profile_picture,
            });
          })
        );
      return unsubscribe;
    };

    return getUsername();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl: imageUrl,
        user: currentLoggedinUser.username,
        profile_picture: currentLoggedinUser.profile_picture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => navigation.goBack());

    return unsubscribe;
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFirebase(values.imageUrl, values.caption);
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View
            style={{
              margin: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: validUrl.isUri(thumbnailImg)
                  ? thumbnailImg
                  : Placeholder_img,
              }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                placeholder="Write a caption..."
                placeholderTextColor="gray"
                multiline={true}
                style={{ color: "white", fontSize: 20, marginLeft: 8 }}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>
          <Divider orientation="vertical" width={0.2} />
          <TextInput
            onChange={(e) => setThumbnailImg(e.nativeEvent.text)}
            placeholder="Enter Image Url"
            placeholderTextColor="gray"
            style={{ color: "white", fontSize: 18, marginTop: 8 }}
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />
          {errors.imageUrl && (
            <Text style={{ color: "red", fontSize: 10 }}>
              {errors.imageUrl}
            </Text>
          )}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
