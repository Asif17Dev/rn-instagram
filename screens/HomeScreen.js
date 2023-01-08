import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import BottomTabs from "../components/Home/BottomTabs";
import { db } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collectionGroup("posts").onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((post) => ({ id: post.id, ...post.data() })));
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {!!posts.length > 0 ? (
          posts.map((post, index) => <Post post={post} key={index} />)
        ) : (
          <Text style={{ color: "white", textAlign: "center" }}>
            No post to see!
          </Text>
        )}
      </ScrollView>
      <BottomTabs icons={BottomTabsIcons} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
const BottomTabsIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/60/ffffff/home",
    inactive: "https://img.icons8.com/fluency-systems-regular/60/ffffff/home",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search",
    inactive: "https://img.icons8.com/ios/500/ffffff/search",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/500/ffffff/instagram-reel",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel",
  },
  {
    name: "Shop",
    active: "https://img.icons8.com/fluency-systems-filled/60/ffffff/shop",
    inactive: "https://img.icons8.com/fluency-systems-regular/60/ffffff/shop",
  },
  {
    name: "Profile",
    active:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
    inactive:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg",
  },
];
