import React, { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from "../pages/Login"
import ChangePreferences from "../pages/preferences/ChangePreferences"
import Recommendations from "../pages/recommendations/Recommendations"
import Results from "../pages/Results"
import SelectPreferences from "../pages/preferences/SelectPreferences"
import '../../style/App.scss';
import NavBar from './NavBar'
import { NotificationContainer } from "react-notifications";
import { UserContext } from "../../contexts";
import { notify, back_end } from "../../utils/auth";
import Spinner from 'react-bootstrap/Spinner';
import { Col, Container, Row } from "react-bootstrap";


const Component = () => {
	const navigate = useNavigate()
	const [user, updateUser] = useState();
	const [loaded, setLoaded] = useState(false)

	const setUser = (usr) => {
		updateUser(usr)
		localStorage.setItem("sportify-user", JSON.stringify(usr))
	}

	useEffect(() => {
		const usr = JSON.parse(localStorage.getItem("sportify-user"))
		if (usr !== null && Object.entries(usr).length !== 0) {
			if (usr.user.expirationTime < Date.now()) {
				console.log("User login expired")
				notify("warning", "Login expired, please log in.")
				navigate("/login")
			} else {
				console.log("retrieved stored user:", usr)
				updateUser(usr)
			}
		} else console.log("didn't find stored user!")
		fetch(`${back_end}/health-check`)
			.then(data => data.json())
			.then(_ => setLoaded(true))
	}, [])

	return (
		<UserContext.Provider value={user}>
			{/* Let's only render when useEffect has updated the user object to prevent 'user == null' chaos in the children */}
			<NotificationContainer />
			<NavBar updateUser={updateUser} />
			{loaded ?
				<Routes>
					<Route path='/' element={<Navigate to="/login" />} />
					<Route path="/login" element={<Login setUser={setUser} />} />
					{user !== null &&
						<>
							<Route path="/select-preferences" element={<SelectPreferences />} />
							<Route path="/change-preferences" element={<ChangePreferences />} />
							<Route path="/recommendations" element={<Recommendations />} />
							<Route path="/results" element={<Results />} />
						</>
					}
				</Routes>
				:
				<Container className="text-center">
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</Container>

			}
		</UserContext.Provider>
	)

}

export default Component