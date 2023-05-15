import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthentificationContext } from "../contexts/AuthentificationContext";

export default function RoutesPrive({ children }) {
	const { user } = useContext(AuthentificationContext);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		if (user === false) return navigate("/authentification");
	}, [user, pathname, navigate]);

	// eslint-disable-next-line eqeqeq
	if (user == false) return <></>;
	return children;
}
