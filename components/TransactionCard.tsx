import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TransactionCardProps {
  amount: number;
  date: string;
  type: string;
}

const TransactionCard = ({ amount, date, type }: TransactionCardProps) => {
  return (
    <View style={styles.viewCenter}>
      <View>
        <Text style={styles.balance}>{amount ? amount : "No Amount"}</Text>
        <Text style={styles.balance}>{date ? date : "No Date"}</Text>
        <Text style={styles.balance}>{type ? type : "No Type"}</Text>
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  viewCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
    width: "100%",
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
