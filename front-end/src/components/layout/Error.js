import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Error(props) {
    const [show, updateShow] = useState(false)
    const [msg, updateMsg] = useState("")

    // when the component is rendered, send the updateMsg() function pointer back to the callback
    useEffect(() => {
        // wrap in an empty lambda because react will otherwise execute during component mount
        props.callback(() => (msg) => {
            console.log("Displaying error!")
            updateMsg(msg)
            updateShow(true)
        })
    }, [])

    return (
        <Modal show={show} onHide={() => { updateShow(false); updateMsg("") }}>
            <Modal.Header closeButton>
                <Modal.Title>Something went wrong!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{msg}</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => { updateShow(false); updateMsg("") }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Error;