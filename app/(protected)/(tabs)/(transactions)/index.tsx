import { my } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import TransactionCard from "@/components/TransactionCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
	const { data = [] } = useQuery({
		queryKey: ["transaction"],
		queryFn: my,
	});

	const [filterType, setFilterType] = useState("All");
	const [search, setSearch] = useState(""); // Changed initial state to an empty string for TextInput

	// Filter transactions based on filterType and search
	const filteredTransactions = data.filter((transaction: any) => {
		// First, handle the amount search. Convert amount to string for includes().
		// If search is empty, this part is effectively skipped.
		const matchesSearch = String(transaction.amount).includes(search);

		// Second, handle the type filter.
		if (filterType === "All") {
			return matchesSearch; // If "All" is selected, only search by amount
		} else {
			// Otherwise, filter by both amount and type
			return matchesSearch && transaction.type && transaction.type.toLowerCase() === filterType.toLowerCase();
		}
	});
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			{/* Search Input */}
			<TextInput placeholder="Search for amount" style={styles.searchInput} onChangeText={(value) => setSearch(value)} />
			<ScrollView style={styles.viewCenter}>
				<View style={styles.filterContainer}>
					<TouchableOpacity style={styles.filterButton} onPress={() => setFilterType("All")}>
						<Text>All</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.filterButton} onPress={() => setFilterType("Deposit")}>
						<Text>Deposit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.filterButton} onPress={() => setFilterType("Withdraw")}>
						<Text>Withdraw</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.filterButton} onPress={() => setFilterType("Transfer")}>
						<Text>Transfer</Text>
					</TouchableOpacity>
				</View>
				{filteredTransactions?.map((transaction: any) => (
					<TransactionCard key={transaction._id} transaction={transaction} setTransaction={() => {}} displayTransaction={filterType} />
				))}
				<TouchableOpacity onPress={deleteToken} style={styles.submitButton}>
					<Text style={{ color: "white", fontWeight: "bold" }}>Bye Bye Hab!b!</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	filterContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
	},
	filterButton: {
		backgroundColor: "#eee",
		borderRadius: 10,
		padding: 10,
		marginRight: 10,
	},
	viewCenter: {},
	submitButton: {
		backgroundColor: "#000035",
		width: "40%",
		borderRadius: 20,
		padding: 10,
		alignItems: "center",
		marginTop: 20,
		marginBottom: 20,
	},
	searchInput: {
		width: "100%",
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
		backgroundColor: "#fff",
		borderColor: "#000",
	},
});
