import { Language } from 'models/language'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { postLesson } from 'services/fetchLesson'
import { isValidDate } from 'utils/utils'
import styleCourse from 'styles/Course.module.scss'
import style from './form.module.scss'

interface Props {
    courseId: string
    languages: Language[]
    onSave: () => void
    onCancel: () => void
}

export default function LessonForm(props: Props) {
    const [title, setTitle] = useState<string>("")
    const [language, setLanguage] = useState<string>(props.languages.length > 0 ? props.languages[0].name : "")

    const [startDefault, setStartDefault] = useState<boolean>(true)
    const [start, setStart] = useState<Date>(new Date(""))

    const [endDefault, setEndDefault] = useState<boolean>(true)
    const [end, setEnd] = useState<Date>(new Date(""))

    const save = () => {
        if (!title) {
            console.log("Title error")
            return
        }

        if (!language) {
            console.log("Language error")
            return
        }

        if (!startDefault && !isValidDate(start)) {
            console.log("Start error")
            return
        }

        if (!endDefault && !isValidDate(end)) {
            console.log("End error")
            return
        }

        postLesson({
            title,
            languageName: language,
            start: startDefault ? undefined : start,
            end: endDefault ? undefined : end,
            courseId: props.courseId
        })
            .then(({ data, status }) => {
                props.onSave()
            })
            .catch(e => console.log(e))
    }

    const cancel = () => {
        props.onCancel()
    }
    //...

    return (
        <Form>
            <Form.Group className='py-1'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={style.input}
                />
            </Form.Group>
            <Form.Group className='py-1'>
                <Form.Label>Language</Form.Label>
                <Form.Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={style.select}
                >
                    {props.languages.map((language) =>
                        <option
                            value={language.name}
                            key={language.name}
                        >
                            {language.name}
                        </option>)}
                </Form.Select>
            </Form.Group>
            <Row className='py-1'>
                <Col>
                    <Form.Group>
                        <Form.Label>Start</Form.Label>
                        <Form.Control
                            type="date"
                            disabled={startDefault}
                            onChange={(e) => setStart(new Date(e.target.value))}
                            className={style.input + ' ' + style.start}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Default"
                            checked={startDefault}
                            onChange={(e) => setStartDefault(e.target.checked)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>End</Form.Label>
                        <Form.Control
                            type="date"
                            disabled={endDefault}
                            onChange={(e) => setEnd(new Date(e.target.value))}
                            className={style.input + ' ' + style.end}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Default"
                            checked={endDefault}
                            onChange={(e) => setEndDefault(e.target.checked)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className='py-1'>
                <Col>
                    <Button
                        className={styleCourse.customButton + ' m-auto'}
                        onClick={cancel}
                    >
                        <i className='bi bi-x pe-2'></i>
                        Cancel
                    </Button>
                </Col>
                <Col>
                    <Button
                        className={styleCourse.customButton + ' m-auto'}
                        onClick={save}
                    >
                        <i className='bi bi-cloud-plus-fill pe-2'></i>
                        Create
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
