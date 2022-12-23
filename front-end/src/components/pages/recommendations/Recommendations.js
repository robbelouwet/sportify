import Recommendation from "./Recommendation";
import data from '../../../data/sports'
import {useEffect, useState, useContext} from "react";
import {back_end} from "../../../utils/auth";
import {fetchPreferences} from "../../../utils/firestore";
import {UIContext, UserContext} from "../../../contexts";
import Accordion from 'react-bootstrap/Accordion';
import {Container, Row, Col} from "react-bootstrap";
import PreferencesOverview from "../preferences/PreferencesOverview";
import BarChart from "./BarChart"
import {commonTags} from "../../../utils/sportsUtils"
import SportsCoach from "./SportsCoach";

function Recommendations() {
    const uiContext = useContext(UIContext)
    const user = useContext(UserContext)
    const [preferences, setPreferences] = useState([])
    const [topTags, setTopTags] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [surveyVisible, setSurveyVisible] = useState(false)
    const surveyLink1 = 'https://forms.office.com/e/gm5WmeA1JP'
    const surveyLink2 = 'https://forms.office.com/e/hDDKHBwV8r'

    // Show survey after 30 seconds
    setTimeout(() => {
        setSurveyVisible(true);
    }, 30_000);

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
                    <Accordion defaultActiveKey={0} onClick={(e) => {
                        const toptags = getTopTags(preferences,[e.target.innerText])
                        setTopTags(toptags)
                    }}>
                        {recommendations
                            .map((r, i) => {
                                const ref = data.find(e => e.id === r.sport).kuleuvenref;
                                return < Recommendation key={i} eventKey={i} sport={r.sport} score={r.score}
                                                        location={"Sporthal"} time={"Friday 19h"} kuleuvenref={ref}/>
                            })}
                    </Accordion>
                </Col>
                <Col>
                    {uiContext === "statistics" ? <StatisticsUI topTags={topTags}/> :
                        <SportsCoachUI topTags={topTags}/>}
                </Col>
            </Row>
            <div className={!surveyVisible ? 'd-none' : ''}>
                <h3 className="display-4">
                    Please fill in the <a href={uiContext === "statistics" ? surveyLink1 : surveyLink2}
                                          target="blank">Survey</a>
                </h3>
            </div>
        </Container>

    )

    function getTopTags(preferences, selectedSports){
        const cTagsPreferences = commonTags(preferences)
        const cTagsRecommendation = commonTags(selectedSports)
        const cTags = []
        Object.entries(cTagsRecommendation).forEach(t =>
            cTags.push(Object.entries(cTagsPreferences).find(pt => pt[0] === t[0]))
        )
        return cTags.sort((a, b) => b[1] - a[1]).slice(0, 10).filter(i => i)
    }
}

const StatisticsUI = ({topTags}) =>
    <>
        <Row>
            <Col>
                <h3>Words that describe your interests</h3>
                {topTags.length !== 0 && <BarChart tags={topTags}/>}
            </Col>


        </Row>
        <hr/>
        <Row className="pt-5">
            <Col>
                <h3>Your preferences</h3>
                <PreferencesOverview/>
            </Col>
        </Row>
    </>

const SportsCoachUI = ({topTags}) => {
    const [text, setText] = useState("")

    useEffect(() => {
        setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
            .split(" "))
    }, [])

    return (
        <>
            <SportsCoach topTags={topTags} text={text} setText={() => setText}/>
        </>)

}


export default Recommendations
