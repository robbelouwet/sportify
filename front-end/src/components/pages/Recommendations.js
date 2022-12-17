import Recommendation from "./Recommendation";
import data from '../../data/sports'
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function Recommendations() {
    const [sports, setSports] = useState([])
    const {state} = useLocation();
    const {preferences} = state;

    useEffect(() => {
        fetch(`http://localhost:4000/recommendations/?sports=${preferences.join(',')}`)
            .then(response => response.json())
            .then(data => setSports(data));
    }, [])

    const sportItems = sports.map(s => {
        const ref = data.find(e => e.id === s.sport).kuleuvenref
        return <Recommendation key={s.sport} sport={s.sport} location={'GDN'} time={'18:00'} kuleuvenref={ref}/>
    })

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md">{sportItems}</div>
                <div className="col-md">GRAPHIC</div>
            </div>
        </div>
    )
}

export default Recommendations
