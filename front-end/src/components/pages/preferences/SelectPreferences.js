import { useContext, useEffect, useState } from "react";
import PreferenceChoice from "./PreferenceChoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../../contexts";
import { back_end } from "../../../utils";

function SelectPreferences() {
    const [sports, setSports] = useState([])

    useEffect(() => {
        fetch(`${back_end}/most-popular-sports`)
            .then(response => response.json())
            .then(data => setSports(data));
    }, [])

    const sportItems = sports.map((v, i) =>
        i % 2 === 0 ?
            <PreferenceChoice key={sports[i] + sports[++i]} sport1={sports[i]} sport2={sports[++i]} />
            : undefined
    )

    return (
        <div className="container mt-3">
            <h1 className="display-4 text-center">Preferences</h1>
            {sportItems}
            <div className="text-center">
                <button type="button" className="btn btn-dark">
                    Proceed <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
            </div>
        </div>
    )
}

export default SelectPreferences
