import { deleteToken } from "@/api/storage";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const _layout = () => {
	// Side effect: refresh screen on logout
	const handleLogout = () => {
		deleteToken();
		// Simple way to refresh: reload the window (web) or reset navigation (native)
		if (typeof window !== "undefined" && window.location) {
			window.location.reload();
		}
	};

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				tabBarStyle: {
					backgroundColor: "white",
					borderTopColor: "#000042",
					height: 60,
					paddingBottom: 0,
					marginBottom: 0,
				},
				tabBarActiveTintColor: "#000042",
				tabBarInactiveTintColor: "black",
				headerRight: () => (
					<TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
						<Feather name="power" size={24} color="#c00" />
					</TouchableOpacity>
				),
			}}>
			<Tabs.Screen
				name="(home)/index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="(transactions)/index"
				options={{
					title: "Transactions",
					tabBarIcon: ({ color, size }) => <Feather name="dollar-sign" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="(users)/index"
				options={{
					title: "Users",
					tabBarIcon: ({ color, size }) => <Feather name="users" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="(profile)/index"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
};

export default _layout;

const styles = StyleSheet.create({});
