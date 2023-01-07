import Recommendation from "./Recommendation";
import data from '../../../data/sports'
import { useEffect, useState, useContext } from "react";
import { back_end } from "../../../utils/auth";
import { fetchPreferences } from "../../../utils/firestore";
import { UIContext, UserContext } from "../../../contexts";
import Accordion from 'react-bootstrap/Accordion';
import { Container, Row, Col } from "react-bootstrap";
import PreferencesOverview from "../preferences/PreferencesOverview";
import BarChart from "./BarChart"
import { commonTags } from "../../../utils/sportsUtils"
import SportsCoach from "./SportsCoach";
import { faSpaghettiMonsterFlying, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const surveyLink1 = 'https://forms.office.com/e/gm5WmeA1JP'
const surveyLink2 = 'https://forms.office.com/e/hDDKHBwV8r'

function Recommendations() {
    const uiContext = useContext(UIContext)
    const user = useContext(UserContext)
    const [preferences, setPreferences] = useState([])
    const [topTags, setTopTags] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [surveyVisible, setSurveyVisible] = useState(false)
    const [selectedRecommendation, setSelectedRecommendation] = useState("")

    // Show survey after 30 seconds
    setTimeout(() => {
        setSurveyVisible(true);
    }, 60_000);



    useEffect(() => { console.log("recommendations @ useEffect", recommendations); setSelectedRecommendation(recommendations[0]) }, [recommendations])

    useEffect(() => async () => {
        const prefs = (await fetchPreferences(user.user.email)).data().sports
        setPreferences(prefs)

        await fetch(`${back_end}/recommendations/?sports=${prefs.join(',')}`)
            .then(resp => resp.json())
            .then(data => {
                const sortedRecommendations = data.sort((a, b) => b.score - a.score)
                setRecommendations(sortedRecommendations)
                setTopTags(getTopTags(prefs, data.slice(0, 1).map(el => el.sport)))
            })

    }, [])

    return (
        <Container>
            <Row className={!surveyVisible ? 'pt-4' : 'd-none'}>
                <Col>
                    <h3>Recommendations</h3>
                    <Accordion defaultActiveKey={0} onSelect={(e) => {
                        const toptags = getTopTags(preferences, [recommendations[e].sport])
                        setSelectedRecommendation(recommendations[e])
                        setTopTags(toptags)
                    }}>
                        {recommendations
                            .map((r, i) => {
                                const ref = data.find(e => e.id === r.sport).kuleuvenref;
                                return <Recommendation key={i} eventKey={i} sport={r.sport} score={r.score} kuleuvenref={ref} />
                            })}
                    </Accordion>
                </Col>
                <Col>
                    {uiContext === "statistics" ? <StatisticsUI topTags={topTags} /> :
                        selectedRecommendation != null && <SportsCoachUI recommendedSport={selectedRecommendation} preferences={preferences} topTags={topTags} />}
                </Col>
            </Row>
            <div className={!surveyVisible ? 'd-none' : ''}>
                <h3 className="display-4">
                    If you participated in both experiments (2 websites), please fill in the <a href={uiContext === "statistics" ? surveyLink1 : surveyLink2}
                        target="blank">Survey</a>
                </h3>
            </div>
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

const SportsCoachUI = ({ recommendedSport, preferences, topTags }) => {
    const [text, setText] = useState([])

    useEffect(() => {
        console.log("sport @ useEffect SCUI:", recommendedSport)
        let msg = `
        Hi there!\

        I see you really like ${preferences.join(", ")}. Looking at how I would describe the kind of sports you like (like ${topTags.map(t => t[0]).join(", ")}), 
        I would recommend ${recommendedSport.sport}. 
        `

        if ((recommendedSport.score * 100) < 50) msg += `Although I'm only ${Math.round(recommendedSport.score)}% sure!`
        setText(msg
            .split(" ")
        )
    }, [recommendedSport, preferences, topTags])

    useEffect(() => {
        console.log("##################################################Setting text:", text)
        //text !== "" && text !== undefined && text !== null && setText(text.split(" "))
    }, [])

    return <SportsCoach topTags={topTags} text={text} setText={() => setText} />
}

function getTopTags(preferences, selectedSports) {
    const cTagsPreferences = commonTags(preferences)
    const cTagsRecommendation = commonTags(selectedSports)
    const cTags = []
    Object.entries(cTagsRecommendation).forEach(t =>
        cTags.push(Object.entries(cTagsPreferences).find(pt => pt[0] === t[0]))
    )
    return cTags.sort((a, b) => b[1] - a[1]).slice(0, 10).filter(i => i)
}


export default Recommendations
