import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ({ sport, isSelected }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                    <div className="row">
                        <div>
                            {isSelected ?
                                <div>{sport} <FontAwesomeIcon icon={faTrophy} />
                                </div>
                                : sport}
                        </div>
                    </div>
                </h5>
            </div>
        </div>
    )
}
