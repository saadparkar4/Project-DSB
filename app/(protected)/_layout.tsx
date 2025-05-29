import { deleteToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";

const ProtectedLayout = () => {
	const { isAuthenticated } = useContext(AuthContext);

	const handleLogout = () => {
		deleteToken();
		// Simple way to refresh: reload the window (web) or reset navigation (native)
		if (typeof window !== "undefined" && window.location) {
			window.location.reload();
		}
	};
	if (!isAuthenticated) {
		return <Redirect href={"/(auth)/Login"} />;
	} else {
		return (
			<Stack
				screenOptions={{
					headerShown: false,
					headerRight: () => (
						<TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
							<Feather name="power" size={24} color="#c00" />
						</TouchableOpacity>
					),
				}}>
				<Stack.Screen name="(tabs)" />
			</Stack>
		);
	}
};

export default ProtectedLayout;
