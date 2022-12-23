import Accordion from 'react-bootstrap/Accordion';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sportEvents from "../../../data/sportsEvents"
import { useEffect, useState } from 'react';

function Recommendation({ eventKey, sport, score, kuleuvenref }) {
	const [events, setEvents] = useState([])

	useEffect(() => {
		setEvents(Object.entries(sportEvents).find(([a, b]) => a === sport)[1])
	}, [])

	return (
		<Accordion.Item eventKey={eventKey}>
			<Accordion.Header><h5 style={{ color: "gray" }}>{sport}</h5></Accordion.Header>
			<Accordion.Body>

				<h6>{Math.round(score * 100)}% match</h6>
				<ul>
					{events.map(([time, loc]) => <li>{time} {loc}</li>)}
				</ul>
				<br />
				<a href={kuleuvenref}>Check it out!<FontAwesomeIcon style={{ marginLeft: "6px" }} icon={faArrowUpRightFromSquare} /></a>
			</Accordion.Body>
		</Accordion.Item>
	);
}

export default Recommendation;
