import allSports from "../data/sports"

export const commonTags = (sports) => {
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