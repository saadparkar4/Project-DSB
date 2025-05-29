import { my } from "@/api/auth";
import TransactionCard from "@/components/TransactionCard";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const PRIMARY_COLOR = "#000042";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_TITLE = 28;
const BUTTON_HEIGHT = 48;

const formatDate = (dateString: string) => {
	const d = new Date(dateString);
	const day = String(d.getDate()).padStart(2, "0");
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const year = d.getFullYear();
	return `${day}-${month}-${year}`;
};

export default function Index() {
	const {
		data = [],
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["transaction"],
		queryFn: my,
	});

	const [filterType, setFilterType] = useState("All");
	const [search, setSearch] = useState("");
	const [fromDate, setFromDate] = useState<Date | null>(null);
	const [toDate, setToDate] = useState<Date | null>(null);
	const [showFromPicker, setShowFromPicker] = useState(false);
	const [showToPicker, setShowToPicker] = useState(false);

	// Platform-specific fix for DateTimePicker on Windows/Android/Web
	const handleFromChange = (event: any, date: Date | undefined) => {
		setShowFromPicker(false);
		if (date) setFromDate(date);
	};
	const handleToChange = (event: any, date: Date | undefined) => {
		setShowToPicker(false);
		if (date) setToDate(date);
	};

	// Filter and sort transactions based on date, filterType and search
	const filteredTransactions = data
		.filter((transaction: any) => {
			const txDate = new Date(transaction.createdAt);
			let inDateRange = true;
			if (fromDate && txDate < new Date(fromDate.setHours(0, 0, 0, 0))) inDateRange = false;
			if (toDate && txDate > new Date(toDate.setHours(23, 59, 59, 999))) inDateRange = false;

			const matchesSearch = String(transaction.amount).includes(search);
			if (filterType === "All") {
				return inDateRange && matchesSearch;
			} else {
				return inDateRange && matchesSearch && transaction.type && transaction.type.toLowerCase() === filterType.toLowerCase();
			}
		})
		.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			{/* Date Range Filter */}
			<View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => setShowFromPicker(true)} style={[styles.filterButton, { minWidth: 100 }]}>
					<Text>From: {fromDate ? fromDate.toLocaleDateString() : "Select"}</Text>
				</TouchableOpacity>
				{showFromPicker && Platform.OS !== "web" ? (
					<DateTimePicker
						value={fromDate || new Date()}
						mode="date"
						display={Platform.OS === "android" ? "calendar" : "default"}
						onChange={handleFromChange}
					/>
				) : null}
				{showFromPicker && Platform.OS === "web" ? (
					<input
						type="date"
						style={{ marginLeft: 8, marginRight: 8 }}
						value={fromDate ? fromDate.toISOString().slice(0, 10) : ""}
						onChange={(e) => {
							setShowFromPicker(false);
							setFromDate(e.target.value ? new Date(e.target.value) : null);
						}}
					/>
				) : null}
				<Text style={{ marginHorizontal: 8 }}>to</Text>
				<TouchableOpacity activeOpacity={0.7} onPress={() => setShowToPicker(true)} style={[styles.filterButton, { minWidth: 100 }]}>
					<Text>To: {toDate ? toDate.toLocaleDateString() : "Select"}</Text>
				</TouchableOpacity>
				{showToPicker && Platform.OS !== "web" ? (
					<DateTimePicker
						value={toDate || new Date()}
						mode="date"
						display={Platform.OS === "android" ? "calendar" : "default"}
						onChange={handleToChange}
					/>
				) : null}
				{showToPicker && Platform.OS === "web" ? (
					<input
						type="date"
						style={{ marginLeft: 8, marginRight: 8 }}
						value={toDate ? toDate.toISOString().slice(0, 10) : ""}
						onChange={(e) => {
							setShowToPicker(false);
							setToDate(e.target.value ? new Date(e.target.value) : null);
						}}
					/>
				) : null}
				{!!(fromDate || toDate) && (
					<TouchableOpacity
						onPress={() => {
							setFromDate(null);
							setToDate(null);
						}}
						style={[styles.filterButton, { backgroundColor: "#eee", marginLeft: 8 }]}>
						<Text style={{ color: "#c00" }}>Clear</Text>
					</TouchableOpacity>
				)}
			</View>
			<View style={{ alignItems: "center", marginBottom: 10 }}>
				{/* Search Input */}
				<TextInput placeholder="Search for amount" style={styles.searchInput} onChangeText={(value) => setSearch(value)} />
			</View>
			<ScrollView style={styles.viewCenter}>
				{isLoading || isFetching ? (
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 40 }}>
						<ActivityIndicator size="large" color={PRIMARY_COLOR} />
					</View>
				) : (
					<>
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
						{/* Table Header */}
						<View style={[styles.row, { backgroundColor: "#e3e3e3", borderTopLeftRadius: 8, borderTopRightRadius: 8 }]}>
							<Text style={[styles.cell, { fontWeight: "bold" }]}>Amount</Text>
							<Text style={[styles.cell, { fontWeight: "bold" }]}>Date</Text>
							<Text style={[styles.cell, { fontWeight: "bold" }]}>Type</Text>
						</View>
						{filteredTransactions?.map((transaction: any) => (
							<TransactionCard
								key={transaction._id}
								transaction={{ ...transaction, createdAt: formatDate(transaction.createdAt) }}
								setTransaction={() => {}}
								displayTransaction={filterType}
							/>
						))}
					</>
				)}
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
	viewCenter: {
		backgroundColor: BG_COLOR,
		paddingHorizontal: 16,
		width: CONTENT_WIDTH,
		alignSelf: "center",
	},
	submitButton: {
		backgroundColor: PRIMARY_COLOR,
		width: "100%",
		height: BUTTON_HEIGHT,
		borderRadius: BORDER_RADIUS,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 18,
		marginBottom: 10,
		elevation: 2,
	},
	searchInput: {
		width: "100%",
		borderWidth: 1.5,
		borderColor: BORDER_COLOR,
		borderRadius: BORDER_RADIUS,
		padding: 10,
		marginBottom: 10,
		backgroundColor: "#fff",
		fontSize: 16,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 12,
		paddingHorizontal: 8,
	},
	cell: {
		flex: 1,
		alignItems: "center",
	},
});
