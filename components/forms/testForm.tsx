import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import styleCourse from 'styles/Course.module.scss'
import style from './form.module.scss'
import { postTest } from 'services/fetchStep'
import { toast } from 'react-toastify';
import SweetAlert from 'react-bootstrap-sweetalert'


interface Props {
    stepId: string
    onSave: () => void
    onCancel: () => void
}

function TestForm(props: Props) {
    const [message, setMessage] = useState<string>('')
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<string>('')
    const [alert, setAlert] = useState<React.ReactNode>(null)

    const save = () => {

        let alertMessage = null

        if (!message)
            alertMessage = "Message can't be empty"

        else if (!input)
            alertMessage = "Input can't be empty"

        else if (!output)
            alertMessage = "Output can't be empty"

        if (alertMessage) {
            setAlert(
                <SweetAlert
                    error
                    showCloseButton
                    showConfirm={false}
                    style={{ backgroundColor: '#202020' }}
                    confirmBtnText="Ok"
                    confirmBtnBsStyle="primary"
                    title="Please complete the required fields"
                    // @ts-ignore
                    children={alertMessage}
                    onConfirm={() => setAlert(null)}
                    onCancel={() => setAlert(null)}
                    timeout={1500}
                />
            )
        }
        else {
            const promise = new Promise((resolve, reject) => {
                postTest(props.stepId, { message: message, input: input, output: output })
                    .then(({ data, status }) => {
                        props.onSave()
                        resolve('Successfull')
                    })
                    .catch(e => {
                        console.log(e)
                        reject('Failed')
                    })
            });
            toast.promise(
                promise,
                {
                    pending: 'Adding',
                    success: 'Added!',
                    error: "Couldn't add, please try again!"
                }, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 }
            )
        }
    }


    return (
        <div>
            <Form>
                <Form.Group className='py-1'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={style.input}
                    />
                </Form.Group>
                <Form.Group className='py-1'>
                    <Form.Label>Input</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className={style.input}
                    />
                </Form.Group>
                <Form.Group className='py-1'>
                    <Form.Label>Output</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter the expected output"
                        value={output}
                        onChange={(e) => setOutput(e.target.value)}
                        className={style.input}
                    />
                </Form.Group>
                <div className={style.container}>
                    <Row className='align-items-center'>
                        <Col xs='auto'>
                            <Button
                                className={styleCourse.customButton + ' ' + style.buttonSize}
                                onClick={props.onCancel}
                            >
                                <i className='bi bi-arrow-left pe-2'></i>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs='auto'>
                            <Button
                                className={styleCourse.customButton + ' ' + style.buttonSize}
                                onClick={save}
                            >
                                <i className='bi bi-cloud-plus-fill pe-2'></i>
                                Create
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Form>
            {alert}
        </div>
    )
}

export default TestForm