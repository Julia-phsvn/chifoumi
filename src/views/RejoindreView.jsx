import React, { useContext } from "react";
import { AuthentificationContext } from "../contexts/AuthentificationContext";
import { JeuxContext } from "../contexts/JeuxContext";
import { useNavigate } from "react-router-dom";

const Play = () => {
	const { logout } = useContext(AuthentificationContext);
	const { postPartie } = useContext(JeuxContext);
	const navigate = useNavigate();

	function funcRejoindre() {
		postPartie();
		navigate("/jeux");
	}

	return (
		<div>
			<button onClick={funcRejoindre}>Trouver une partie</button>
			<button onClick={logout}>Se déconnecter</button>
		</div>
	);
};

export default Play;
