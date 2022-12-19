import Recommendation from "./Recommendation";
import data from '../../../data/sports'
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { back_end } from "../../../utils/auth";
import { fetchPreferences } from "../../../utils/firestore";
import { UserContext } from "../../../contexts";

function Recommendations() {
    const user = useContext(UserContext)
    const [sports, setSports] = useState([])
    const { state } = useLocation();

    useEffect(() => {
        (async () => {
            console.log("fetching...")
            const preferences = (await (await fetchPreferences(user.user.email)).data()).sports
            console.log("preferences:", preferences)

            fetch(`${back_end}/recommendations/?sports=${preferences.join(',')}`)
                .then(resp => resp.json())
                .then(data => setSports(data))
        })()
    }, [])

    return (
        <div className="container mt-3">
            <h1 className="display-4 text-center">Recommendations</h1>
            <div className="row">
                <div className="col-md">{sports.map(s => {
                    const ref = data.find(e => e.id === s.sport).kuleuvenref
                    return <Recommendation key={s.sport} sport={s.sport} location={'GDN'} time={'18:00'} kuleuvenref={ref} />
                })}</div>
                <div className="col-md">GRAPHIC</div>
            </div>
        </div>
    )
}

export default Recommendations
