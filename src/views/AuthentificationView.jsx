import React, { useContext, useEffect } from "react";
import { AuthentificationContext } from "../contexts/AuthentificationContext";
import { useNavigate } from "react-router-dom";

const AuthentificationView = () => {
	const { register, user, login } = useContext(AuthentificationContext);
	const navigate = useNavigate();

	useEffect(() => {
		// eslint-disable-next-line
		if (user != false) return navigate("/authentification");
	}, [user, navigate]);

	function funcRegister(event) {
		event.preventDefault();
		const data = Object.values(
			Object.fromEntries(new FormData(event.currentTarget))
		);
		register(...data)
			.then(() => navigate("/rejoindre"))
			.catch((e) => console.error(e.message));
	}

	function funcLogin(event) {
		event.preventDefault();
		const data = Object.fromEntries(new FormData(event.currentTarget));
		login(data.username, data.password)
			.then(() => navigate("/rejoindre"))
			.catch((e) => console.error(e.message));
	}

	return (
		<>
			<div>
				<form onSubmit={funcRegister}>
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="password" placeholder="Password" />
					<input type="submit" value="s'inscrire" />
				</form>
			</div>
			<div>
				<form onSubmit={funcLogin}>
					<input type="text" name="username" placeholder="Username" />
					<input type="password" name="password" placeholder="Password" />
					<input
						type="submit"
						value="se connecter"
					/>
				</form>
			</div>
		</>
	);
};

export default AuthentificationView;
