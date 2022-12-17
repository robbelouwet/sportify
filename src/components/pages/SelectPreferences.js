import {useEffect, useState} from "react";
import data from "../../data/sports";
import Recommendation from "./Recommendation";

function SelectPreferences() {
    const [sports, setSports] = useState([])

    useEffect(() => {
        fetch('http://localhost:4000/most-popular-sports')
            .then(response => response.json())
            .then(data => setSports(data));
    }, [])

    const sportItems = sports.map((s) => {
        return <div className="card text-center">
            <div className="card-body">
                <h5 className="card-title">{s}</h5>
            </div>
        </div>
    })

    return (
        <div className="container mt-3">
            <h1 className="display-4 text-center">Preferences</h1>
            {
                sportItems.map((v, i) =>
                    i % 2 === 0 ?
                        <div key={i} className="row my-3">
                            <div className="col-5">{sportItems[i]}</div>
                            <div className="col-2"><p className="text-center">vs.</p></div>
                            <div className="col-5">{sportItems[++i]}</div>
                        </div> : undefined
                )
            }
        </div>
    )
}

export default SelectPreferences
