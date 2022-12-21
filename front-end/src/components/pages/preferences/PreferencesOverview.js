import { useEffect, useState, useContext } from "react"
import { ListGroup } from "react-bootstrap"
import { UserContext } from "../../../contexts"
import { fetchPreferences } from "../../../utils/firestore"


const PreferencesOverview = () => {
	const user = useContext(UserContext)
	const [preferences, setPreferences] = useState(null)

	useEffect(() => async () => {
		const prefs = (await fetchPreferences(user.user.email)).data().sports
		setPreferences(prefs)
	}, [])
	return (preferences != null &&
		<div className="pt-4">
			<ListGroup>
				{preferences.map(p => <ListGroup.Item key={p}>{p}</ListGroup.Item>)}
			</ListGroup>
		</div>
	)
}

export default PreferencesOverview