import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Form, ListGroup } from 'react-bootstrap';
import sports from '../../../data/sports';
import { useContext, useEffect, useState } from 'react';
import { addPreferences, removePreference, fetchPreferences } from '../../../utils/firestore';
import { UserContext } from '../../../contexts';

function ChangePreferences() {
    const [text, setText] = useState("")
    const [preferences, setPreferences] = useState([])
    const user = useContext(UserContext)

    const addPreference = async (sport) => {
        await addPreferences(sport, user.user.email)

        const newPrefs = (await fetchPreferences(user.user.email)).data().sports
        setPreferences(newPrefs)
        console.log("preferences after adding one: ", newPrefs)
    }

    const removePreference = async (s) => {
        // remove preference...
    }

    useEffect(() => {
        fetchPreferences(user.user.email)
            .then(data => {
                const sports = data.exists() && data.data().sports !== undefined ? data.data().sports : []
                setPreferences(sports)
            })
    }, [])

    return (
        <div className='container mt-3'>
            <h1 className='display-4 text-center'>Edit Preferences</h1>

            <Form className='d-flex'>
                <Form.Control
                    type='search'
                    placeholder='Search'
                    className='me-2'
                    aria-label='Search'
                    onChange={(e) => setText(e.target.value)}
                />
            </Form>
            <ListGroup>
                {sports
                    .map(s => s.id)
                    .filter(s => s.toUpperCase().includes(text.toUpperCase()))
                    .sort((x, y) => {
                        if (preferences.includes(x) && !preferences.includes(y)) return -1
                        if (preferences.includes(y) && !preferences.includes(x)) return 1
                        return 0
                    })
                    .map(s =>
                        <ListGroup.Item key={s}
                            onClick={() => preferences.includes(s) ? removePreference(s) : addPreference(s)}>
                            <div>
                                <FontAwesomeIcon
                                    style={{ visibility: preferences.includes(s) ? '' : 'hidden', color: "green" }}
                                    icon={faCheck} />
                                {s}
                            </div>
                        </ListGroup.Item>)}
            </ListGroup>
        </div>
    )
}

export default ChangePreferences
