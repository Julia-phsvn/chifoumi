import React, { useContext } from "react";
import { JeuxContext } from "../contexts/JeuxContext";

const Versus = () => {
	const { partie } = useContext(JeuxContext);
	return (
		<div>
			<span>
				<h5>
					{partie.user1.username ? partie.user1.username : "en attente ..."}-
					contre -
					{partie.user2 !== null ? partie.user2.username : "en attente ..."}
				</h5>
			</span>
		</div>
	);
};

export default Versus;
