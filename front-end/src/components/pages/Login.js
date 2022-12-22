import React, { useContext, useEffect } from "react"
import { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts";
import { login, notify } from "../../utils/auth";
import { fetchPreferences } from "../../utils/firestore";


export default function (props) {
	const user = useContext(UserContext)
	const navigate = useNavigate()
	const [email, updateEmail] = useState("")
	const [pwd, updatePwd] = useState("")
	const [valid, setValid] = useState("")

	const submit = async e => {
		e.preventDefault()

		const data = await fetchPreferences(email);

		let usr = await login(email, pwd, data, navigate)
		//console.log("Login user:", usr)
		if (usr === null || usr === undefined) return
		localStorage.setItem("sportify-user", JSON.stringify(usr))
		props.setUser(usr)
	}

	const validate = v => {
		const isValid = /^(r[0-9]{7}@kuleuven.be)|([a-z]+.[a-z]+@student.kuleuven.be)$/.test(v)
		setValid(isValid ? "is-valid" : "is-invalid")
	}

	useEffect(() => {
		//console.log("state user @ login render: ", user)
		if (user !== undefined && user !== null) {
			console.log("nav at login!")
			navigate("/recommendations")
		}
	}, [])

	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign In</h3>
					<div className="form-group mt-3">
						<label>Email address
							<br />
							<div className="text-muted" style={{ fontSize: "13px" }}>If you don't have an account, one will be created.</div>
						</label>
						<input
							type="email"
							className={`form-control mt-1 ${valid}`}
							placeholder="KU Leuven email"
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
						<button type="submit" onClick={submit} disabled={valid !== "is-valid"} className="btn btn-primary">
							Submit
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}


