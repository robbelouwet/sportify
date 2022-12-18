import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark, faCheck, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Form, ListGroup} from 'react-bootstrap';
import sports from '../../data/sports';
import {useContext, useEffect, useState} from 'react';
import {doc, getDoc, updateDoc, arrayUnion, arrayRemove, getFirestore} from 'firebase/firestore';
import {app} from '../../index';
import {UserContext} from '../../contexts';

function ChangePreferences() {
    const [preferences, setPreferences] = useState([])
    const [filteredSports, setFilteredSports] = useState([])
    const user = useContext(UserContext)

    function addSport(sport) {
        console.log(`I have been clicked ${sport}`)
        addPreference(sport, user.user.email)
    }

    function removeSport(sport) {
        console.log(`I have been clicked ${sport}`)
        removePreference(sport, user.user.email)
    }

    function searchSports(text) {
        setFilteredSports(text !== '' ? sports
            .map(s => s.id)
            .filter(s => s.toUpperCase().includes(text.toUpperCase()))
            .map(s => <ListGroup.Item key={s} onClick={() => addSport(s)}>{s}</ListGroup.Item>) : []
        )
    }

    useEffect(() => {
        fetchPreferences(user.user.email)
            .then(data => {
                const sports = data.exists() && data.data().sports !== undefined ? data.data().sports : []
                setPreferences(
                    sports.map(s =>
                        <ListGroup.Item key={s}>
                            {s}
                            <button type="button" className="btn btn-dark" onClick={() => removeSport(s)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>
                        </ListGroup.Item>)
                )
            });
    })

    return (
        <div className='container mt-3'>
            <h1 className='display-4 text-center'>Edit Preferences</h1>
            {/* Buttons at top */}
            <div>
                <div className='btn btn-default btn-dark rounded-circle btn-icon'>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                <div className='btn btn-default btn-success rounded-circle btn-icon'>
                    <FontAwesomeIcon icon={faCheck}/>
                </div>
            </div>
            {/* Current Preferences */}
            <div>
                <ListGroup>
                    {preferences}
                </ListGroup>
            </div>
            {/* Search bar other sports */}
            <h1 className='display-4 text-center'>Add new sport</h1>
            <Form className='d-flex'>
                <Form.Control
                    type='search'
                    placeholder='Search'
                    className='me-2'
                    aria-label='Search'
                    onChange={(e) => searchSports(e.target.value)}
                />
            </Form>
            <ListGroup>
                {filteredSports}
            </ListGroup>
        </div>
    )
}

async function fetchPreferences(email) {
    const db = getFirestore(app);

    // 1. Get Preferences from user
    const docRef = doc(db, 'liked_sports', email);
    return getDoc(docRef);
}

async function addPreference(sport, email) {
    const db = getFirestore(app);

    // 1. Get Preferences from user
    const docRef = doc(db, 'liked_sports', email);
    return updateDoc(docRef, {
        sports: arrayUnion(sport)
    });
}

async function removePreference(sport, email) {
    const db = getFirestore(app);

    // 1. Get Preferences from user
    const docRef = doc(db, 'liked_sports', email);
    return updateDoc(docRef, {
        sports: arrayRemove(sport)
    });
}

export default ChangePreferences
