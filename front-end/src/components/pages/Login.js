import React, { useContext, useEffect } from "react"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login, notify } from "../../utils";
import { propTypes } from "react-bootstrap/esm/Image";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../index";


export default function (props) {
    const navigate = useNavigate()
    const [email, updateEmail] = useState("")
    const [pwd, updatePwd] = useState("")
    const [valid, setValid] = useState("")

    const submit = async e => {
        e.preventDefault()

        const data = await fetchPreferences(email);

        let usr = await login(email, pwd, data, navigate)
        props.setUser(usr)
    }

    const validate = v => {
        const isValid = /^(r[0-9]{7}@kuleuven.be)|([a-z]*.[a-z]*@student.kuleuven.be)$/.test(v)
        setValid(isValid ? "is-valid" : "is-invalid")
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className={`form-control mt-1 ${valid}`}
                            placeholder="Enter email"
                            onChange={v => {
                                updateEmail(v.target.value);
                                validate(v.target.value)
                            }}
                            value={email}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={pwd}
                            onChange={v => updatePwd(v.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" onClick={submit} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

async function fetchPreferences(email) {
    const db = getFirestore(app);

    // 1. Get Preferences from user
    const docRef = doc(db, "liked_sports", email);
    return getDoc(docRef);
}