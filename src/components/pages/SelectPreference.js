export default function ({ sport1, sport2 }) {
    return(
        <div key={sport1+sport2} className="row my-3">
            <div className="col-5">{sportItems[i]}</div>
            <div className="col-2"><p className="text-center">vs.</p></div>
            <div className="col-5">{sportItems[++i]}</div>
        </div>
    )
}
