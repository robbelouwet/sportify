import Accordion from 'react-bootstrap/Accordion';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Recommendation({ eventKey, sport, score, location, time, kuleuvenref }) {
	return (
		<Accordion.Item eventKey={eventKey}>
			<Accordion.Header><h5 style={{ color: "gray" }}>{sport}</h5></Accordion.Header>
			<Accordion.Body>

				<h6>{Math.round(score * 100)}% match</h6>
				<p>{location}, {time}</p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
				minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea commodo consequat. Duis aute irure dolor in
				reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
				pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
				culpa qui officia deserunt mollit anim id est laborum.
				<br /><br />
				<a href={kuleuvenref}>Check it out!<FontAwesomeIcon style={{ marginLeft: "6px" }} icon={faArrowUpRightFromSquare} /></a>
			</Accordion.Body>
		</Accordion.Item>
	);
}

export default Recommendation;
