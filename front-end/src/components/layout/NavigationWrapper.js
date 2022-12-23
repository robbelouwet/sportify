import React, { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes, UNSAFE_LocationContext, useNavigate, useSearchParams } from 'react-router-dom';
import Login from "../pages/Login"
import ChangePreferences from "../pages/preferences/ChangePreferences"
import Recommendations from "../pages/recommendations/Recommendations"
import Results from "../pages/Results"
import SelectPreferences from "../pages/preferences/SelectPreferences"
import '../../style/App.scss';
import NavBar from './NavBar'
import { NotificationContainer } from "react-notifications";
import { UserContext, UIContext } from "../../contexts";
import { notify, back_end } from "../../utils/auth";
import Spinner from 'react-bootstrap/Spinner';
import { Container } from "react-bootstrap";


const Component = () => {
	const navigate = useNavigate()
	const [user, updateUser] = useState();
	const [loaded, setLoaded] = useState(false)
	const [queryParams, setQueryParams] = useSearchParams()
	const [ui, setUI] = useState(null)

	const setUser = (usr) => {
		updateUser(usr)
		localStorage.setItem("sportify-user", JSON.stringify(usr))
	}

	useEffect(() => {
		// only set at the very first render
		if (ui === null) {
			if (queryParams.get("ui") === null) { console.log("setting ui default"); setUI("statistics") }
			//console.log("first render, setting ui:", queryParams.get("ui"))
			else setUI(queryParams.get("ui"))
		}

		console.log("query params NavWrapper:", queryParams.get("ui"))
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
			<UIContext.Provider value={ui}>
				{/* Let's only render when useEffect has updated the user object to prevent 'user == null' chaos in the children */}
				<NotificationContainer />
				<NavBar updateUser={updateUser} />
				{loaded ?
					<Routes>
						<Route path='/' element={<Navigate to="/login" />} />
						<Route path="/login" element={<Login setUser={setUser} />} />
						{user !== null && ui !== null &&
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

				}</UIContext.Provider>
		</UserContext.Provider>
	)

}

export default Component