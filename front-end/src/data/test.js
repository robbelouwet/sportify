const fs = require("fs");
const { parse } = require("csv-parse");

let events = {}

fs.createReadStream("./time_locations.csv")
    .pipe(parse({ delimiter: ";" }))
    .on("data", (row) => {

        if (row[0] === '') return
        if (!Object.keys(events).includes(row[0])) { events[row[0]] = [] }

        const [time, loc] = filter(row[1], row[2])
        events[row[0]].push([time, loc])
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