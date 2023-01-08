import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { users } from "../../data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView
        style={{ flexDirection: "row" }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {users.map((el, index) => (
          <TouchableOpacity key={index} style={styles.story}>
            <Image style={styles.StoryImg} source={{ uri: el.image }} />

            <Text style={{ color: "white" }}>
              {el.username.length > 11
                ? `${el.username.substring(0, 6)}...`
                : el.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  story: {
    marginLeft: 18,
    alignItems: "center",
  },
  StoryImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ff8501",
    marginBottom: 8,
  },
});
