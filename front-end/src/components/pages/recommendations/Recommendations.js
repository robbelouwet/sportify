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
import { commonTags } from "../../../utils/sportsUtils"
import SportsCoach from "./SportsCoach";

function Recommendations() {
	const user = useContext(UserContext)
	const [topTags, setTopTags] = useState([])
	const [recommendations, setRecommendations] = useState([])

	useEffect(() => async () => {
		console.log("fetching...")
		const preferences = (await fetchPreferences(user.user.email)).data().sports
		console.log("preferences:", preferences)

		await fetch(`${back_end}/recommendations/?sports=${preferences.join(',')}`)
			.then(resp => resp.json())
			.then(data => {
				console.log("data: ", data)
				const sortedRecommendations = data.sort((a, b) => a.score < b.score)
				setRecommendations(sortedRecommendations)

				const cTags = commonTags(sortedRecommendations.map(r => r.sport))
				setTopTags(Object.entries(cTags).sort((a, b) => a[1] < b[1]).slice(0, 10))
				console.log("Common tags:", topTags)
			})

	}, [])

	return (
		<Container>
			<Row className="pt-4">
				<Col>
					<h3>Recommendations</h3>
					<Accordion defaultActiveKey={0}>
						{recommendations
							.map((r, i) => {
								//console.log("Recommendation: ", r)
								const ref = data.find(e => e.id === r.sport).kuleuvenref;
								//console.log("i: ", i)
								return < Recommendation key={i} eventKey={i} sport={r.sport} score={r.score} location={"Sporthal"} time={"Friday 19h"} kuleuvenref={ref} />
							})}
					</Accordion>
				</Col>
				<Col>
					{false ? <StatisticsUI topTags={topTags} /> : <SportsCoachUI topTags={topTags} />}
				</Col>
			</Row>
		</Container>

	)
}

const StatisticsUI = ({ topTags }) =>
	<>
		<Row>
			<Col>
				<h3>Words that describe your interests</h3>
				{topTags.length !== 0 && <BarChart tags={topTags} />}
			</Col>


		</Row>
		<hr />
		<Row className="pt-5">
			<Col>
				<h3>Your preferences</h3>
				<PreferencesOverview />
			</Col>
		</Row>
	</>

const SportsCoachUI = ({ topTags }) => {
	const [text, setText] = useState("")

	useEffect(() => {
		setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
			.split(" "))
	}, [])

	return (
		<>
			<SportsCoach topTags={topTags} text={text} setText={() => setText} />
		</>)

}



export default Recommendations