import React, { createContext, useState } from "react"
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

function App() {
  // the function pointer to call to print an error modal
  // printError("Unauthorized"), for example
  const [printErrorMsg, updateErrorCallback] = useState(null)
  const [printInfo, updateInfoCallback] = useState(null)

  return (
    <ErrorContext.Provider value={printErrorMsg}>
      <InfoContext.Provider value={printInfo}>
        <BrowserRouter>
          <Error callback={updateErrorCallback} />
          <Info callback={updateInfoCallback} />
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
      </InfoContext.Provider>
    </ErrorContext.Provider>
  );
}

export default App;
