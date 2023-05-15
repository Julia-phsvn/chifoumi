import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthentificationProvider from "./contexts/AuthentificationContext";
import JeuxProvider from "./contexts/JeuxContext";
import RoutesPrive from "./components/RoutesPrive";
import AuthentificationView from "./views/AuthentificationView";
import JeuxView from "./views/JeuxView";
import RejoindreView from "./views/RejoindreView";

function App() {
	return (
		<div>
			<h1>SHIFUMI</h1>
			<BrowserRouter>
				<AuthentificationProvider>
					<Routes>
						<Route
							path="/"
							element={<Navigate to="/authentification" />}
						></Route>
						<Route
							path="/authentification"
							element={<AuthentificationView />}
						></Route>
						<Route
							path="/rejoindre"
							element={
								<RoutesPrive>
									<JeuxProvider>
										<RejoindreView />
									</JeuxProvider>
								</RoutesPrive>
							}
						></Route>
						<Route
							path="/jeux"
							element={
								<RoutesPrive>
									<JeuxProvider>
										<JeuxView />
									</JeuxProvider>
								</RoutesPrive>
							}
						></Route>
					</Routes>
				</AuthentificationProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
