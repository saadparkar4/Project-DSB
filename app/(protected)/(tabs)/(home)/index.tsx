import { deleteToken } from "@/api/storage";
import CategoryCard from "@/components/CategoryCard";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Build, extract, refactor */}
      <View
        style={{
          flexDirection: "row",
          gap: 80,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CategoryCard cardTitle="Tips" />
        <CategoryCard cardTitle="Yoga Videos" />
        <CategoryCard cardTitle="Music" />
        <CategoryCard cardTitle="Meditation" />
      </View>

      <TouchableOpacity onPress={deleteToken} style={styles.submitButton}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Bye Bye Hab!b!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewCenter: {
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    width: "60%",

    borderRadius: 20,
    padding: 10,
  },
  inputLabel: {
    alignItems: "flex-start",
    width: "60%",
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
    width: "60%",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
});
