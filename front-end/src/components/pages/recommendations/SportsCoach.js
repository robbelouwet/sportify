import React, { useState, useEffect } from "react"
import { Button, Image } from "react-bootstrap"

var stop = false

const SportsCoach = ({ text, setText }) => {
	const [visibleText, setVisibleText] = useState("")
	const timeout = 50

	// recursive to avoid using await, by doing it like this,
	// every displayChar is executed after each other
	const showVisibleText = () => {
		//console.log("text:", text)
		setTimeout(() => { displayChar(0) }, timeout)
	}
	const displayChar = (i) => {
		if (i > text.length) return
		if (i === 0 && stop) { stop = false }
		if (i !== 0 && stop) { stop = false; return }

		text !== "" && setVisibleText(text.slice(0, i).join(" "))
		//console.log("visible words set to:", text.slice(0, i).join(" "))
		setTimeout(() => displayChar(i + 1), timeout)
	}

	const skipShowAll = () => {
		stop = true
		setVisibleText(text.join(" "))
	}

	// every time our real text changes,
	// reset the balloon and start typing from the beginning
	useEffect(() => {
		stop = true
		setVisibleText("")
		showVisibleText()
	}, [text])

	return (
		<>
			<p className="speech">
				{visibleText}
			</p>
			<div className="text-center">
				<Image style={{ width: "60%", height: "auto" }} src="/sportscoach.png" />
			</div>
		</>)
}

export default SportsCoach