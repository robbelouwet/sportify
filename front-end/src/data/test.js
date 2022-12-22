const fs = require("fs")

const remove = ["indoor", "outdoor", "large", "beginner", "intermediate", "advance", "specific", "genres", "type", "use", "videos", "online", ""]


const distinctTags = () => {
    const _json = JSON.parse(fs.readFileSync("./newSports.json", null, () => null))
    let allTags = []
    for (let i = 0; i < _json.length; i++) {
        allTags = allTags.concat(_json[i].content.split(" "))

    }
    const uniqueSet = new Set(allTags)
    console.log(uniqueSet)
}

const commonTags = (sports) => {
    const allSports = JSON.parse(fs.readFileSync("./sports.json"))
    const lowerSports = sports.map(s => s.toLocaleLowerCase())
    let tags = {}

    allSports.forEach(({ id, content }) => {
        // For every sport, iterate its tags
        if (lowerSports.includes(id.toLocaleLowerCase())) {

            // for every tag, count its occurencies
            content.split(" ").forEach(tag => {
                if (Object.keys(tags).includes(tag))
                    tags[tag]++
                else tags[tag] = 1
            })
        }
    });

    return tags
}

const allSports = JSON.parse(fs.readFileSync("./sports.json"))
let contentOnlySPorts = []
for (let i = 0; i < allSports.length; i++) {
    const sport = allSports[i]
    sport.content += sport.tags.join(" ")
    delete sport.tags
    contentOnlySPorts.push(sport)
}

// doe die hiit weg
contentOnlySPorts = JSON.parse(JSON.stringify(contentOnlySPorts).replace("hiit", "intense"))

//console.log(contentOnlySPorts)

const cTags = commonTags(contentOnlySPorts.map(s => s.id))
const cTagsOne = Object.entries(cTags).filter(a => a[1] === 1)
for (tag of cTagsOne) {
    contentOnlySPorts = JSON.parse(JSON.stringify(contentOnlySPorts).replace(tag[1], " "))
}

distinctTags()

const fileString = `
const sports = ${JSON.stringify(contentOnlySPorts)}\nexport default sports
`
fs.writeFileSync("./sports.js", fileString)