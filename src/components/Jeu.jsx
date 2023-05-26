import React, { useState, useContext, useEffect } from "react";
import { JeuxContext } from "../contexts/JeuxContext";
import { useNavigate } from "react-router";

const Jeu = ({ tour, setTour }) => {
	const { partie, postMove, getPartie } = useContext(JeuxContext);
	const [gagnant, setGagnant] = useState("");
	const navigate = useNavigate();

	async function funcMove(move) {
		postMove(move, tour);
		setTour(tour + 1);
	}

	useEffect(() => {
		getPartie();
		if (partie.winner && partie.turns.length >= 3) {
			if (partie.winner === null) {
				setGagnant("Egalité");
			} else {
				partie.winner.username !== null
					? setGagnant(partie.winner.username + " a gagner")
					: setGagnant("Egalité");
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tour]);

	return (
		<>
			{gagnant !== "" ? (
				<span>
					<h3>{gagnant}</h3>
					<button onClick={() => navigate("/rejoindre")}>Quitter la partie</button>
				</span>
			) : (
				<>
					<span>
						<button onClick={() => funcMove("rock")}>Pierre</button>
						<button onClick={() => funcMove("paper")}>Feuille</button>
						<button onClick={() => funcMove("scissors")}>Ciseaux</button>
					</span>
				</>
			)}
		</>
	);
};

export default Jeu;
