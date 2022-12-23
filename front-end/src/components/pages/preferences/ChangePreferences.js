import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons'
import {Form, ListGroup, Container, Col, Row} from 'react-bootstrap'
import sports from '../../../data/sports'
import {useContext, useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'
import {
    addPreferences,
    removePreference,
    fetchPreferences,
} from '../../../utils/firestore'
import {UserContext} from '../../../contexts'
import {useNavigate} from 'react-router-dom'

function ChangePreferences() {
    const navigate = useNavigate()
    const [preferences, setPreferences] = useState([])
    const [filteredSports, setFilteredSports] = useState([])
    const user = useContext(UserContext)

    const addPreference = async (sport) => {
        await addPreferences(sport, user.user.email)
        const newPrefs = (await fetchPreferences(user.user.email)).data().sports
        setPreferences(newPrefs)
        setFilteredSports(filteredSports.filter(s => s !== sport))
        console.log('preferences after adding one: ', newPrefs)
    }

    const rmPreference = async (s) => {
        console.log('before:', preferences)
        await removePreference(s, user.user.email)
        const newPrefs = (await fetchPreferences(user.user.email)).data().sports
        setPreferences(newPrefs)
        console.log('Deleted a preference: ', newPrefs)
    }

    function searchSports(text) {
        setFilteredSports(text !== '' ? sports
            .filter(s => !preferences.includes(s.id))
            .map(s => s.id)
            .filter(s => s.toUpperCase().includes(text.toUpperCase())) : []
        )
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
            <h1 className="display-4 text-center mt-3">Current Preferences</h1>
            <Row>
                <Col></Col>
                <Col className="">
                    <ListGroup>
                        {preferences.map(e =>
                            <ListGroup.Item key={e}>
                                <FontAwesomeIcon className="text-danger" icon={faTrash}
                                                 onClick={() => rmPreference(e)}/>
                                <div className="d-inline" style={{marginLeft: '20px'}}>
                                    {e}
                                </div>
                            </ListGroup.Item>)}
                    </ListGroup>
                </Col>
                <Col></Col>
            </Row>
            <h1 className="display-4 text-center mt-3">Add sports</h1>
            <Form className='d-flex'>
                <Form.Control
                    type='search'
                    placeholder='Search'
                    className='me-2'
                    aria-label='Search'
                    onChange={(e) => searchSports(e.target.value)}
                />
                <div>
                    <Button
                        style={{display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', flexFlow: 'row nowrap', minHeight: '50px'}}
                        onClick={() => navigate('/recommendations')}
                        variant="success"
                    >
                        <div className="d-inline" style={{marginRight: '10px'}}>Save</div>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </Button>
                </div>
            </Form>
            <ListGroup>
                {filteredSports
                    .map(s =>
                        <ListGroup.Item key={s}>
                            <FontAwesomeIcon icon={faPlus}
                                             onClick={() => addPreference(s)}/>
                            <div className="d-inline" style={{marginLeft: '20px'}}>
                                {s}
                            </div>
                        </ListGroup.Item>
                    )
                }
            </ListGroup>
        </Container>
    )
}

export default ChangePreferences
