import { useEffect, useState, useContext } from "react";
import PreferenceChoice from "./PreferenceChoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faWifiStrong } from "@fortawesome/free-solid-svg-icons";
import { back_end, notify } from "../../../utils/auth";
import { setPreferences } from "../../../utils/firestore";
import { UserContext } from "../../../contexts";
import { useNavigate } from "react-router-dom";

function SelectPreferences() {
    const navigate = useNavigate()
    const user = useContext(UserContext)
    const [sports, setSports] = useState([])
    const [choices, setChoices] = useState([])
    const [ready, setReady] = useState(false)

    const setChoice = (chosenSport, sport2) => {
        let copy = choices

        // remove first sport if exists
        const firstIndex = copy.indexOf(chosenSport)
        if (firstIndex !== -1) copy.splice(firstIndex, 1);

        // remove second sport if exists
        const secondIndex = copy.indexOf(sport2)
        if (secondIndex !== -1) copy.splice(secondIndex, 1)

        // now add the chosen sport
        copy.push(chosenSport)
        setChoices(copy)
        if (copy.length === 5) {
            setReady(true)
        }
    }

    const submit = async () => {
        if (user.user.email === null) {
            notify("error", "Something went wrong, please try to login again")
            console.error("User not set, can't set preferences!")
            return
        }
        await setPreferences(user.user.email, choices)
        notify("success", "submitted!")
        navigate("/recommendations")
    }


    useEffect(() => {
        fetch(`${back_end}/most-popular-sports`)
            .then(response => response.json())
            .then(data => {
                //console.log("popular sports: ", data)
                setSports(data)
            });
    }, [])

    return (
        <div className="container mt-3">
            <h1 className="display-4 text-center">Preferences</h1>
            {sports.map((v, i) =>
                i % 2 === 0 ?
                    <PreferenceChoice key={sports[i] + sports[++i]} sport1={sports[i]} sport2={sports[++i]} setChoice={setChoice} />
                    : undefined
            )}
            <div className="text-center">
                <button type="button" className="btn btn-dark" disabled={!ready} onClick={submit}>
                    Proceed <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
            </div>
        </div>
    )
}

export default SelectPreferences
