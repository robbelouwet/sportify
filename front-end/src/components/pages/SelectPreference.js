import Preference from "./Preference";
import {useState} from "react";

export default function ({sport1, sport2}) {
    const [selectedSport, setSelectedSport] = useState()

    return (
        <div className="row my-3">
            <div className="col-5" onClick={() => {setSelectedSport(sport1)}}>
                <Preference key={sport1} sport={sport1} isSelected={selectedSport === sport1}/>
            </div>
            <div className="col-2"><p className="text-center">vs.</p></div>
            <div className="col-5" onClick={() => setSelectedSport(sport2)}>
                <Preference key={sport2} sport={sport2} isSelected={selectedSport === sport2}/>
            </div>
        </div>
    )
}
