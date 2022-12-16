import React, { useContext } from "react"
import { useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ErrorContext, InfoContext } from "../../contexts";


export default function () {
    const printError = useContext(ErrorContext)
    const printInfo = useContext(InfoContext)
    const navigate = useNavigate()
    const [email, updateEmail] = useState("")
    const [pwd, updatePwd] = useState("")

    const [valid, setValid] = useState("")

    const submit = async e => {
        e.preventDefault()

        try {
            await signInWithEmailAndPassword(getAuth(), email, pwd)
            printInfo("Success", "Logged in successfully!")
            navigate("/select-preferences")
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                printError("User does not exist, creating new user...")
                try {
                    await createUserWithEmailAndPassword(getAuth(), email, pwd);
                    navigate("/select-preferences")
                } catch (err2) {
                    printError(err2.code)
                }
            } else {
                printError(error.code)
            }
        }
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
                            onChange={v => { updateEmail(v.target.value); validate(v.target.value) }}
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