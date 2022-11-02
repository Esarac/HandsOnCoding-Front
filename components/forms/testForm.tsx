import React, { useState } from 'react'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import styleCourse from 'styles/Course.module.scss'
import style from './form.module.scss'
import { postTest } from 'services/courseService'
import { toast } from 'react-toastify';

interface Props {
    stepId: string
    onSave: () => void
    onCancel: () => void
}

function TestForm(props: Props) {
    const [message, setMessage] = useState<string>('')
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<string>('')
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            save()
            event.preventDefault()
        }

        setValidated(true)
    };

    const save = () => {
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

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='py-1' controlId="validationCustom01">
                <Form.Label>Message</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter the message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={style.input}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a message.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='py-1'>
                <Form.Label>Input</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter the input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={style.input}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide an input.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='py-1'>
                <Form.Label>Output</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter the expected output"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    className={style.input}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide an expected output.
                </Form.Control.Feedback>
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
                            type='submit'
                            className={styleCourse.customButton + ' ' + style.buttonSize}
                        >
                            <i className='bi bi-cloud-plus-fill pe-2'></i>
                            Create
                        </Button>
                    </Col>
                </Row>
            </div>
        </Form>
    )
}

export default TestForm