import Recommendation from "./Recommendation";
import data from '../../../data/sports'
import { useEffect, useState, useContext } from "react";
import { back_end } from "../../../utils/auth";
import { fetchPreferences } from "../../../utils/firestore";
import { UserContext } from "../../../contexts";
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col } from "react-bootstrap";
import PreferencesOverview from "../preferences/PreferencesOverview";
import BarChart from "./BarChart"

function Recommendations() {
	const user = useContext(UserContext)
	const [recommendations, setRecommendations] = useState([])

	useEffect(() => {
		(async () => {
			console.log("fetching...")
			const preferences = (await fetchPreferences(user.user.email)).data().sports
			console.log("preferences:", preferences)

			fetch(`${back_end}/recommendations/?sports=${preferences.join(',')}`)
				.then(resp => resp.json())
				.then(data => setRecommendations(data.sort((a, b) => a.score < b.score)))
		})()
	}, [])

	return (
		<Container>
			<Row className="pt-4">
				<Col>
					<h3>Recommendations</h3>
					<Accordion defaultActiveKey={0}>
						{recommendations
							.map((r, i) => {
								console.log("Recommendation: ", r)
								const ref = data.find(e => e.id === r.sport).kuleuvenref;
								console.log("i: ", i)
								return < Recommendation key={i} eventKey={i} sport={r.sport} score={r.score} location={"Sporthal"} time={"Friday 19h"} kuleuvenref={ref} />
							})}
					</Accordion>
				</Col>
				<Col>
					<Row>						<Col>
						<h3>What you seem to like</h3>
						<BarChart recommendations={dummyRecommendations} />
					</Col>


					</Row>
					<Row className="pt-5">
						<Col>
							<h3>Your preferences</h3>
							<PreferencesOverview />
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>

	)
}

export default Recommendations


const dummyRecommendations = [
	{
		"recommendation": "Soccer1",
		"tags": ["ball sport", "team sport"]
	},
	{
		"recommendation": "Soccer2",
		"tags": ["ball sport"]
	}, {
		"recommendation": "Soccer3",
		"tags": ["ball sport"]
	}, {
		"recommendation": "Soccer4",
		"tags": ["ball sport", "team sport"]
	}, {
		"recommendation": "Swimming",
		"tags": ["water", "team sport", "splashing", "pushing kids of the water slide"]
	}, {
		"recommendation": "Soccer6",
		"tags": ["ball sport", "team sport"]
	}]