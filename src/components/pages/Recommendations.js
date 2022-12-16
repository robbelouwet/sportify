import {useEffect, useState} from 'react';
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

function Recommendation() {
    const [sports, updateSports] = useState([]);

    initializeApp();
    const db = getFirestore();

    useEffect(() => {
        const sport = 'Football'
        fetch(`http://localhost:4000/recommendations/${sport}`)
            .then(response => response.json())
            .then(data => updateSports(data))
            .catch((error) => {
                console.error(error)
            });
    })

    const sportItems = sports.map(s => <li key={s.sport}>Sport: {s.sport}, Score: {s.score}</li>)

    return (<ul>{sportItems}</ul>)
}

export default Recommendation
