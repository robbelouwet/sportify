import React, { useState } from "react"
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from "./pages/Login"
import ChangePreferences from "./pages/ChangePreferences"
import Recommendations from "./pages/Recommendations"
import Results from "./pages/Results"
import SelectPreferences from "./pages/SelectPreferences"
import '../style/App.css';
import NavBar from './layout/NavBar'
import { NotificationContainer } from "react-notifications";
import {UserContext} from "../contexts";

function App() {
  const [user, updateUser] = useState(null);

  return (
      <UserContext.Provider value={user}>
          <BrowserRouter>
              <NotificationContainer />
              <NavBar/>
              <Routes>
                  <Route path='/' element={<Navigate to="/login" />} />
                  <Route path="/login" element={<Login setUser={updateUser} />} />
                  <Route path="/select-preferences" element={<SelectPreferences />} />
                  <Route path="/change-preferences" element={<ChangePreferences />} />
                  <Route path="/recommendations" element={<Recommendations />} />
                  <Route path="/results" element={<Results />} />
              </Routes>
          </BrowserRouter>
      </UserContext.Provider>
  );
}

export default App;
