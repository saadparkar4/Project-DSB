import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface UserCardProps {
  imageUrl: string;
  username: string;
  balance: number;
}

const UserProfileCard = ({ username, imageUrl, balance }: UserCardProps) => {
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos", "livePhotos"],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.viewCenter}>
      <Image
        source={{
          uri: imageUrl
            ? imageUrl
            : "https://upload.wikimedia.org/wikipedia/commons/1/1a/24701-nature-natural-beauty.jpg",
          height: 200,
          width: 200,
        }}
      />

      <View>
        <Text style={styles.username}>
          {username ? username.toUpperCase() : "No Username"}
        </Text>
        <Text style={styles.balance}>
          Balance: {balance ? balance : "No balance"}
        </Text>
        {imageUrl ? (
          imageUrl
        ) : (
          <Text style={styles.textLabel} onPress={pickImage}>
            upload your profile picture
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={{ color: "white", fontWeight: "bold" }}>save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  viewCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    width: "60%",
    borderRadius: 20,
    padding: 10,
  },
  username: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  balance: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  textLabel: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  image: {
    height: 200,
    width: 200,
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#000035",
    width: "40%",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
