import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => { },
	onLogin: (email, password) => { },
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storeduserinfo =
			localStorage.getItem("isLoggedIn");

		if (storeduserinfo === "Logged In") {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		localStorage.setItem("isLoggedIn", "Logged In");
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
		localStorage.removeItem("isLoggedIn");
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

/* We export default context to enable the usage in the components in the app
-any component that want to make of this context must be wrapped by it
-Likewise any component that wants to mak use of the context must listen to it
using the compose atribute as well
-be still if we need the context in all components in the application we just wrap
our app component with it at once. and we use it everywhere
-know that we can just with context alone because its not a component, so it cant wrap
other component, instead we use <Context.Provider> 
*/
