import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements/dist/divider/Divider";
import firebase, { db } from "../../firebase";

const Post = ({ post }) => {
  const currentUserEmail = firebase.auth().currentUser.email;
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(currentUserEmail);

    console.log(currentLikeStatus);

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(currentUserEmail)
          : firebase.firestore.FieldValue.arrayRemove(currentUserEmail),
      })
      .then(() => {
        console.log("Document successfully updated");
      })
      .catch((error) => {
        console.log("error on update", error);
      });
  };
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

export default Post;

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      marginHorizontal: 15,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: post.profile_picture }} style={styles.profile} />
      <Text style={{ color: "white", fontWeight: "600" }}>{post.user}</Text>
    </View>
    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ post, handleLike }) => {
  const currentUserEmail = firebase.auth().currentUser.email;
  const currentLikeStatus = !post.likes_by_users.includes(currentUserEmail);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={styles.leftFooerIcons}>
        <Icon
          onPress={() => handleLike(post)}
          imgStyle={styles.footerIcon}
          imgUrl={
            currentLikeStatus
              ? postFooterIcons[0].imageUrl
              : postFooterIcons[0].likedImageUrl
          }
        />
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[1].imageUrl}
        />
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[2].imageUrl}
        />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={postFooterIcons[3].imageUrl}
        />
      </View>
    </View>
  );
};

const Icon = ({ imgStyle, imgUrl, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <>
        <Text style={{ color: "gray" }}>
          View all {post.comments.length > 1 ? post.comments.length : ""}{" "}
          {post.comments.length > 1 ? "comments" : "comment"}
        </Text>
      </>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 4 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  profile: {
    marginRight: 5,
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1.6,
    borderColor: "#ff8501",
    marginBottom: 8,
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "32%",
  },
});

const postFooterIcons = [
  {
    name: "Like",
    imageUrl: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like",
    likedImageUrl: "https://img.icons8.com/ios-glyphs/90/fa314a/like",
  },
  {
    name: "Comments",
    imageUrl:
      "https://img.icons8.com/material-outlined/90/ffffff/speech-bubble",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/paper-plane",
  },
  {
    name: "Save",
    imageUrl: "https://img.icons8.com/ios-glyphs/60/ffffff/bookmark",
  },
];
