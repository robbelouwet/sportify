const fs = require("fs");
const { parse } = require("csv-parse");
const { exit } = require("process");

let events = {}

fs.createReadStream("./time_locations.csv")
    .pipe(parse({ delimiter: ";" }))
    .on("data", ([sport, time, loc]) => {
        if (sport === '') return
        if (!Object.keys(events).includes(sport)) { events[sport] = [] }

        const [_time, _loc] = filter(time, loc)
        //events[sport].push([time, _loc])

        for (let i = 0; i < events[sport].length; i++) {
            const event = events[sport][i]
            if (event.join(" ") === [_time, _loc].join(" ")) {
                console.log("Duplicate! existing: ", event.join(" "), " to be added: ", [_time, _loc].join(" "))
                return
            }
        }
        events[sport].push([_time, _loc])
    })
    .on("error", (error) => {
        console.error(error)
    })
    .on("end", () => {
        console.log(events);
        console.log("finished")
    })


const filter = (time, loc) => {

    let filteredTime = ""
    for (let i = 0; i < time.length; i++) {
        if (time.charCodeAt(i) >= 127 || time.charCodeAt(i) < 32) {
            filteredTime += " "
        } else filteredTime += time[i]
    }

    let filteredLoc = ""
    for (let i = 0; i < loc.length; i++) {
        if (loc.charCodeAt(i) >= 127 || loc.charCodeAt(i) < 32) {
            filteredLoc += " "
        } else filteredLoc += loc[i]
    }

    return [filteredTime, filteredLoc]
}