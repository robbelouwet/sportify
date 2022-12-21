import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Form, ListGroup, Container } from 'react-bootstrap'
import sports from '../../../data/sports'
import { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import {
	addPreferences,
	removePreference,
	fetchPreferences,
} from '../../../utils/firestore'
import { UserContext } from '../../../contexts'
import { useNavigate } from 'react-router-dom'

function ChangePreferences() {
	const navigate = useNavigate()
	const [text, setText] = useState('')
	const [preferences, setPreferences] = useState([])
	const user = useContext(UserContext)
	const [show, setShow] = useState(false)

	const addPreference = async (sport) => {
		await addPreferences(sport, user.user.email)

		const newPrefs = (await fetchPreferences(user.user.email)).data().sports
		setPreferences(newPrefs)
		console.log('preferences after adding one: ', newPrefs)
	}

	const rmPreference = async (s) => {
		console.log('before:', preferences)
		await removePreference(s, user.user.email)

		const newPrefs = (await fetchPreferences(user.user.email)).data().sports
		setPreferences(newPrefs)
		console.log('Deleted a preference: ', newPrefs)
	}

	useEffect(() => {
		fetchPreferences(user.user.email).then((data) => {
			const sports =
				data.exists() && data.data().sports !== undefined
					? data.data().sports
					: []
			setPreferences(sports)
		})
	}, [])

	return (
		<Container>
			<h1 className="display-4 text-center">Edit Preferences</h1>
			<Form className="d-flex" onSubmit={e => { e.preventDefault(); navigate("/recommendations") }}>
				<Form.Control
					id="search-input"
					value={text}
					onFocus={e => { console.log("focus event: ", e); setShow(true) }}
					type="search"
					placeholder="Search"
					className="me-2"
					aria-label="Search"
					onChange={(e) => setText(e.target.value)}
				/>
				<Button
					onClick={() => navigate('/recommendations')}
					variant="outline-success"
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</Button>
			</Form>
			{show ?
				<ListGroup>
					{sports
						.map((s) => s.id)
						.filter((s) => s.toUpperCase().includes(text.toUpperCase()))
						.sort((x, y) => {
							if (preferences.includes(x) && !preferences.includes(y)) return -1
							if (preferences.includes(y) && !preferences.includes(x)) return 1
							return 0
						})
						.map((s) => (
							<ListGroup.Item
								key={s}
								onClick={(_) => {
									preferences.includes(s) ? rmPreference(s) : addPreference(s)
									setText("")
									document.getElementById("search-input").focus()
								}}
							>
								<FontAwesomeIcon
									style={{
										visibility: preferences.includes(s) ? 'visible' : 'hidden',
										color: 'green',
									}}
									icon={faCheck}
								/>

								{s}
							</ListGroup.Item>
						))}
				</ListGroup> : <></>}
		</Container>
	)
}

export default ChangePreferences
