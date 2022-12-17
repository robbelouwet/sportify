export default function ({ sport, location, time, kuleuvenref }) {
    return(
        <div className="card col-sm m-2">
            <div className="card-body">
                <h5 className="card-title">{sport}</h5>
                <p className="card-text">Location: {location}</p>
                <p className="card-text">Time: {time}</p>
                <a href={kuleuvenref} target="_blank" className="card-link">More info</a>
            </div>
        </div>
    )
}
