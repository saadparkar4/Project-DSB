import { my } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import TransactionCard from "@/components/TransactionCard";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Index() {
  const { data } = useQuery({
    queryKey: ["transaction"],
    queryFn: my,
  });

  return (
    <ScrollView style={styles.viewCenter}>
      {data?.map((transaction: any) => (
        <TransactionCard
          key={transaction._id}
          amount={transaction?.amount}
          date={transaction?.createdAt.slice(0, 10)}
          type={transaction?.type}
        />
      ))}
      <TouchableOpacity onPress={deleteToken} style={styles.submitButton}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Bye Bye Hab!b!
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewCenter: {
    flex: 1,
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
    width: "40%",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
