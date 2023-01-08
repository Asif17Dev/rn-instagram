import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import firebase from "../../firebase";
const Header = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      Alert.alert("Alert Message", "Signed out successfully");
    } catch (error) {
      Alert.alert("Oops!", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image
          style={styles.logo}
          source={require("../../assets/Instagram.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image
            style={styles.icon}
            source={require("../../assets/add-new.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/favorite.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/messenger.png")}
          />
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  unreadBadge: {
    backgroundColor: "#ff3250",
    position: "absolute",
    right: 0,
    bottom: 18,
    left: 20,
    width: 25,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    borderRadius: 25,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});
