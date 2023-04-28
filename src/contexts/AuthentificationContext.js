import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthentificationContext = createContext();

export default function AuthentificationProvider({ children }) {
	const [user, setUser] = useState(null);
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setUser(token);
		} else {
			setUser(false);
		}
	}, []);

	async function login(username, password) {
		const response = await fetch("http://fauques.freeboxos.fr:3000/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		if (response.status === 200) {
			const data = await response.json();
			localStorage.setItem("token", data.token);
			setUser(data.token);
		} else {
			throw new Error("Login failed:", response.status);
		}
	}
	async function register(username, password) {
		const response = await fetch("http://fauques.freeboxos.fr:3000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		if (response.status === 201) {
			const data = await response.json();
			login(data.username, data.password)
			setUser(data.token);
			navigate("/jeux");
		} else {
			throw new Error("Registration failed:");
		}
	}

	async function logout() {
		localStorage.removeItem("token");
		setUser(false);
		console.log("Succefully logout");
	}

	return (
		<AuthentificationContext.Provider value={{ user, login, logout, register }}>
			{children}
		</AuthentificationContext.Provider>
	);
}
