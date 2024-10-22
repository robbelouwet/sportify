import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './components/App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB98NyPAHBjtp_781XKNcqOYRv4QOn9j0Y",
  authDomain: "sportify-hci.firebaseapp.com",
  projectId: "sportify-hci",
  storageBucket: "sportify-hci.appspot.com",
  messagingSenderId: "120062063813",
  appId: "1:120062063813:web:7e62d1b1e60f02cf49ecac",
  measurementId: "G-F8MBHS758V"
};
export const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // TODO: be sure to remove this once in production!
    //  what happens behind the scenes -> React Strictmode will render each component twice in dev mode (NOT production!)
    //  in order to detect any problems with your code and warn you about them (which can be quite useful)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
