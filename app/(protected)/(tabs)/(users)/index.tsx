import { allUsers } from "@/api/auth";
import React from "react";
import { ActivityIndicator, FlatList, TextInput, View } from "react-native";

import UserProfileCard from "@/components/UserProfileCard";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";

const PRIMARY_COLOR = "#000042";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_TITLE = 28;
const BUTTON_HEIGHT = 48;

export default function Index() {
	const {
		data = [],
		isLoading,
		isFetching,
	} = useQuery({
		queryKey: ["users"],
		queryFn: allUsers,
	});

	const [search, setSearch] = React.useState("");
	const [visibleCount, setVisibleCount] = React.useState(40);

	// Filter and sort users
	const filteredUsers = data
		.filter((user: any) => (user.username ? user.username.toLowerCase().includes(search.toLowerCase()) : false))
		.sort((a: any, b: any) => (a.username && b.username ? a.username.localeCompare(b.username) : 0));

	const handleLoadMore = () => {
		if (visibleCount < filteredUsers.length) {
			setVisibleCount((prev) => prev + 20);
		}
	};

	return (
		<View style={styles.viewCenter}>
			<TextInput
				placeholder="Search users"
				style={{
					borderWidth: 1.5,
					borderColor: BORDER_COLOR,
					borderRadius: BORDER_RADIUS,
					padding: 10,
					marginBottom: 10,
					backgroundColor: "#fff",
					fontSize: 16,
					width: "100%",
				}}
				value={search.toLowerCase()}
				onChangeText={setSearch}
			/>
			<FlatList
				data={filteredUsers.slice(0, visibleCount)}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => <UserProfileCard username={item.username} image={item.imageNotNeeded} balance={item.balance.toLocaleString()} />}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				ListFooterComponent={
					visibleCount < filteredUsers.length ? <ActivityIndicator size="small" color={PRIMARY_COLOR} style={{ margin: 16 }} /> : null
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	viewCenter: {
		flex: 1,
		backgroundColor: BG_COLOR,
		paddingHorizontal: 16,
		width: CONTENT_WIDTH,
		alignSelf: "center",
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
});
