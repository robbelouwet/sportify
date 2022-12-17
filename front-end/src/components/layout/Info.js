import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Info(props) {
    const [show, updateShow] = useState(false)
    const [body, updateBody] = useState("")
    const [title, updateTitle] = useState("")

    // when the component is rendered, send the updateMsg() function pointer back to the callback
    useEffect(() => {
        // wrap in an empty lambda because react will otherwise execute during component mount
        props.callback(() => (title, body) => {
            console.log("Displaying info modal")
            updateBody(body)
            updateTitle(title)
            updateShow(true)
        })
    }, [])

    return (
        <Modal show={show} onHide={() => { updateShow(false); updateBody(""); updateTitle("") }}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={() => { updateShow(false); updateBody(""); updateTitle("") }}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Info;