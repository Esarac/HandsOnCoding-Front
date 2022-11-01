import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import styleCourse from 'styles/Course.module.scss'
import style from './form.module.scss'
import { postTest } from 'services/fetchStep'


interface Props {
    stepId: string
    onSave: () => void
    onCancel: () => void
}

function TestForm(props: Props) {
    const [message, setMessage] = useState<string>('')
    const [input, setInput] = useState<string>('')
    const [output, setOutput] = useState<string>('')

    const save = () => {
        postTest(props.stepId, { message: message, input: input, output: output })
        .then(({ data, status }) => {
            props.onSave()
        })
        .catch(e => console.log(e))
    }


    return (
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
    )
}

export default TestForm