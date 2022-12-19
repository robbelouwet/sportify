import React, { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from "../pages/Login"
import ChangePreferences from "../pages/preferences/ChangePreferences"
import Recommendations from "../pages/recommendations/Recommendations"
import Results from "../pages/Results"
import SelectPreferences from "../pages/preferences/SelectPreferences"
import '../../style/App.css';
import NavBar from './NavBar'
import { NotificationContainer } from "react-notifications";
import { UserContext } from "../../contexts";
import { notify } from "../../utils";


const Component = () => {
    const navigate = useNavigate()
    const [user, updateUser] = useState(null);

    const setUser = (usr) => {
        updateUser(usr)
        localStorage.setItem("sportify-user", JSON.stringify(usr))
    }

    useEffect(() => {
        const usr = localStorage.getItem("sportify-user")
        if (usr !== null) {
            const parsedUsr = JSON.parse(usr)
            //console.log("net expiration time: ", (parsedUsr.user.stsTokenManager.expirationTime - Date.now()) * 2.777777e-7, " hours")
            //console.log(parsedUsr)
            if (parsedUsr.user.expirationTime < Date.now()) {
                notify("warning", "Login expired, please log in.")
                navigate("/login")
            } else {
                updateUser(parsedUsr)
            }
        }
    }, [])

    return (
        <UserContext.Provider value={user}>
            <NotificationContainer />
            <NavBar />
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/select-preferences" element={<SelectPreferences />} />
                <Route path="/change-preferences" element={<ChangePreferences />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/results" element={<Results />} />
            </Routes>
        </UserContext.Provider>
    )

}

export default Component