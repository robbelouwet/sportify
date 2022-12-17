import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
    const navigate = useNavigate()

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Sportify</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid">
                        <Nav.Item className="ms-auto">
                            <Nav.Link onClick={() => navigate("/change-preferences")}>
                                <div className="btn btn-dark rounded-circle btn-icon">
                                    <FontAwesomeIcon icon={faPencil}/>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
