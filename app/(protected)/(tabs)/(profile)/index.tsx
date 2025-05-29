import { me } from "@/api/auth";
import { deleteToken } from "@/api/storage";
import ProfileCard from "@/components/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PRIMARY_COLOR = "#1a237e";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_TITLE = 28;
const BUTTON_HEIGHT = 48;

export default function Index() {
	const { data } = useQuery({
		queryKey: ["myprofile"],
		queryFn: me,
	});

	return (
		<View style={styles.container}>
			<View style={styles.viewCenter}>
				<ProfileCard username={data?.username} image={data?.image} balance={data?.balance} />

				<TouchableOpacity onPress={deleteToken} style={styles.submitButton}>
					<Text style={{ color: "white", fontWeight: "bold" }}>Bye Bye Hab!b!</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: BG_COLOR,
		paddingHorizontal: 16,
	},
	viewCenter: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: CONTENT_WIDTH,
	},
	title: {
		fontSize: FONT_SIZE_TITLE,
		fontWeight: "bold",
		color: PRIMARY_COLOR,
		marginBottom: 24,
		textAlign: "center",
	},
	username: {
		padding: 10,
		fontWeight: "bold",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		alignSelf: "flex-start",
	},
	balance: {
		padding: 10,
		fontWeight: "bold",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		alignSelf: "flex-start",
	},
	textLabel: {
		padding: 10,
		fontWeight: "bold",
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		alignSelf: "flex-start",
	},
	image: {
		height: 120,
		width: 120,
		borderRadius: 60,
		marginBottom: 24,
		alignSelf: "center",
		backgroundColor: "#e8eaf6",
		borderWidth: 2,
		borderColor: BORDER_COLOR,
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
