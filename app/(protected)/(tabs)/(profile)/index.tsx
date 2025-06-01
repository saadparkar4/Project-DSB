import { me } from "@/api/auth";
import ProfileCard from "@/components/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

const PRIMARY_COLOR = "#000042";
const BG_COLOR = "#f5f6fa";
const BORDER_COLOR = "#c5cae9";
const CONTENT_WIDTH = "85%";
const BORDER_RADIUS = 16;
const FONT_SIZE_LABEL = 16;
const FONT_SIZE_TITLE = 28;
const BUTTON_HEIGHT = 48;

export default function Index() {
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ["myprofile"],
		queryFn: me,
	});

	// const [showDepositLink, setShowDepositLink] = useState(false);
	// const [depositLinkAmount, setDepositLinkAmount] = useState(0);
	const [generatedLink, setGeneratedLink] = useState("");
	const [mistakes, setMistakes] = useState("");

	// const handleGenerateLink = () => {
	// 	if (!data?.username || !depositLinkAmount) {
	// 		setMistakes("Please enter an amount to generate a link.");
	// 		return;
	// 	}
	// 	const link = `https://localhost:8081/deposit-link?username=${encodeURIComponent(data.username)}&amount=${depositLinkAmount}`;
	// 	setGeneratedLink(link);
	// 	setShowDepositLink(true);
	// };

	return (
		<View style={styles.container}>
			<View style={styles.viewCenter}>
				<ProfileCard username={data?.username} image={data?.image} balance={data?.balance?.toLocaleString()} />
				{/* {!showDepositLink && (
					<View style={{ width: "100%", marginTop: 24, marginBottom: 16 }}>
						<Text style={{ fontWeight: "bold", color: PRIMARY_COLOR, marginBottom: 8 }}>Generate Deposit Link</Text>
						{!!mistakes && <Text style={{ color: "#d32f2f", marginBottom: 8 }}>{mistakes}</Text>}
						<TextInput
							placeholder="Amount to deposit"
							style={styles.input}
							keyboardType="numeric"
							onChangeText={(text) => {
								if (/^\d*$/.test(text)) setDepositLinkAmount(Number(text));
							}}
							value={depositLinkAmount ? String(depositLinkAmount) : ""}
							autoCapitalize="none"
							autoCorrect={false}
						/>
						<TouchableOpacity onPress={handleGenerateLink} style={styles.submitButton}>
							<Text style={{ color: "white", fontWeight: "bold" }}>Generate Link</Text>
						</TouchableOpacity>
					</View>
				)}
				{showDepositLink && (
					<View style={{ width: "100%", marginTop: 24, marginBottom: 16, alignItems: "center" }}>
						<Text style={{ marginBottom: 8, color: PRIMARY_COLOR, fontWeight: "bold" }}>Share this link:</Text>
						<Text selectable style={{ color: PRIMARY_COLOR, marginBottom: 8, textAlign: "center" }}>
							{generatedLink}
						</Text>
						<TouchableOpacity onPress={() => setShowDepositLink(false)} style={styles.submitButton}>
							<Text style={{ color: "white", fontWeight: "bold" }}>Create Another</Text>
						</TouchableOpacity>
					</View>
				)} */}
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
	input: {
		height: 48,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderRadius: BORDER_RADIUS,
		paddingHorizontal: 16,
		fontSize: FONT_SIZE_LABEL,
		color: PRIMARY_COLOR,
		marginBottom: 16,
	},
});
