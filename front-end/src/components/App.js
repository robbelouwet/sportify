import React from "react"
import { BrowserRouter } from 'react-router-dom';
import NavigationWrapper from "./layout/NavigationWrapper"

function App() {

    return (
        <BrowserRouter>
            <NavigationWrapper />
        </BrowserRouter>
    );
}

export default App;
