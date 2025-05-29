import AuthContext from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";

const ProtectedLayout = () => {
	const { isAuthenticated } = useContext(AuthContext);
	if (!isAuthenticated) {
		return <Redirect href={"/(auth)/Login"} />;
	} else {
		return (
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
			</Stack>
		);
	}
};

export default ProtectedLayout;
