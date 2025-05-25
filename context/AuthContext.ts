// i need a variable to store the status of the user (logged in or not logged in) Boolean
// i need a function to update the status

import { createContext } from "react";

const AuthContext = createContext({
	//blueprint
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated: boolean) => {},
});

export default AuthContext;
