import { createContext, useState } from "react";

export const JeuxContext = createContext();

export default function JeuxProvider({ children }) {
	const [partie, setpartie] = useState();

	async function getPartie() {
		const token = localStorage.getItem("token");
		const response = await fetch("http://fauques.freeboxos.fr:3000/matches", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer  ${token}`,
			},
		});
		if (response.status === 200) {
			const data = await response.json();
			setpartie(data[data.length - 1]);
		} else {
			throw new Error(response);
		}
	}

	async function postPartie() {
		const token = localStorage.getItem("token");
		const response = await fetch("http://fauques.freeboxos.fr:3000/matches", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.status === 201) {
			getPartie();
		} else {
			throw new Error(response);
		}
	}

	async function postMove(move, currentTurn) {
		const token = localStorage.getItem("token");
		const response = await fetch(
			`http://fauques.freeboxos.fr:3000/matches/${partie._id}/turns/${currentTurn}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ move: `${move}` }),
			}
		);
		if (response.status === 202) {
			getPartie();
			console.log(response)
		} else {
			throw new Error(response);
		}
	}

	return (
		<JeuxContext.Provider
			value={{
				getPartie,
				postPartie,
				postMove,
				partie,
			}}
		>
			{children}
		</JeuxContext.Provider>
	);
}
