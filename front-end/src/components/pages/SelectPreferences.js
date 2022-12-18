import {useContext, useEffect, useState} from "react";
import SelectPreference from "./SelectPreference";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import {UserContext} from "../../contexts";
import {useNavigate} from "react-router-dom";
import {notify} from "../../utils";

function SelectPreferences() {
    const [sports, setSports] = useState([])
    const [preferences, setPreferences] = useState({})
    const navigate = useNavigate()
    const user = useContext(UserContext)

    function check() {
        if (!Object.values(preferences).includes(false)) {
            navigate("/recommendations", {
                state: {
                    preferences: Object.values(preferences)
                }
            })
        } else {
            notify('warning', 'Oops!', 'Make sure you have selected 1 sport per row', 4000)
        }
    }

    useEffect(() => {
        fetch('http://localhost:4000/most-popular-sports')
            .then(response => response.json())
            .then(data => {
                const sportItems = data.map((v, i) =>
                    i % 2 === 0 ?
                        <SelectPreference key={data[i] + data[i + 1]} sport1={data[i]} sport2={data[i + 1]}
                                          prefs={preferences} setprefs={setPreferences}/>
                        : undefined
                ).filter(i => i != null && true)

                setSports(sportItems)

                let prefs = []
                sportItems.forEach(i => {
                    const k = i.key
                    prefs[k] = false
                })
                setPreferences(prefs)
            });
    }, [])

    return (
        <div className="container mt-3">
            <h1 className="display-4 text-center">Preferences</h1>
            {sports}
            <div className="text-center">
                <button type="button" className="btn btn-dark" onClick={() => check()}>
                    Proceed <FontAwesomeIcon icon={faArrowRightLong}/>
                </button>
            </div>
        </div>
    )
}

export default SelectPreferences
