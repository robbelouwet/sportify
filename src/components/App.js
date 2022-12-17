import React, { useState } from "react"
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Login from "./pages/Login"
import ChangePreferences from "./pages/ChangePreferences"
import Recommendations from "./pages/Recommendations"
import Results from "./pages/Results"
import SelectPreferences from "./pages/SelectPreferences"
import '../style/App.css';
import NavBar from './layout/NavBar'
import Error from "./layout/Error"
import Info from "./layout/Info";
import { ErrorContext, InfoContext } from "../contexts";
import { NotificationContainer } from "react-notifications";

function App() {
  return (

    <BrowserRouter>
      <NotificationContainer />
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/select-preferences" element={<SelectPreferences />} />
        <Route path="/change-preferences" element={<ChangePreferences />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
