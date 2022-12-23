import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts";
import { signOut } from "../../utils/auth"

function NavBar({ updateUser }) {
	const navigate = useNavigate()
	const user = useContext(UserContext)

	useEffect(() => {
		console.log("Navbar render, state user:", user)
		if (user === null || user === undefined) navigate("/")
	}, [user])

	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand>Sportify</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link onClick={() => navigate("/change-preferences")}>Preferences</Nav.Link>
					</Nav>
					<Nav className="ml-auto">
						<Nav.Link className={(user === null || user === undefined ? 'd-none' : '')} onClick={() => { signOut(updateUser) }}>Sign out</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default NavBar;
