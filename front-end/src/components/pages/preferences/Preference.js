
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export default function ({sport, isSelected}) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <div className="row">
                        <div className={isSelected ? 'col-2' : 'invisible'}>
                            <FontAwesomeIcon icon={faTrophy}/>
                        </div>
                        <div className='col-10'>{sport}</div>
                    </div>
                </h5>
            </div>
        </div>
    )
}