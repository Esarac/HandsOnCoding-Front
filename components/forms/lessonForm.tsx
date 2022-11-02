import { Language } from 'models/language'
import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { postLesson } from 'services/courseService'
import { isValidDate } from 'utils/utils'
import styleCourse from 'styles/Course.module.scss'
import style from './form.module.scss'
import { toast } from 'react-toastify';

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
            postLesson({
                title,
                languageName: language,
                start: startDefault ? undefined : start,
                end: endDefault ? undefined : end,
                courseId: props.courseId
            })
                .then(({ data, status }) => {
                    resolve('Successfull')
                    props.onSave()
                })
                .catch(e => {
                    reject('Failed')
                    console.log(e)
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

    const cancel = () => {
        props.onCancel()
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='py-1'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={style.input}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a title.
                </Form.Control.Feedback>
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
                        {!startDefault &&
                            <Form.Control
                                type="date"
                                onChange={(e) => setStart(new Date(e.target.value))}
                                className={style.input + ' ' + style.start}
                                required={!startDefault}
                            />
                        }
                        <Form.Control.Feedback type="invalid">
                            Please provide a start date.
                        </Form.Control.Feedback>
                        <Form.Check
                            type="checkbox"
                            className={style.check}
                            label="Default"
                            checked={startDefault}
                            onChange={(e) => setStartDefault(e.target.checked)}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>End</Form.Label>
                        {!endDefault &&
                            <Form.Control
                                type="date"
                                onChange={(e) => setEnd(new Date(e.target.value))}
                                className={style.input + ' ' + style.end}
                                required={!endDefault}
                            />
                        }
                        <Form.Control.Feedback type="invalid">
                            Please provide a end date.
                        </Form.Control.Feedback>
                        <Form.Check
                            type="checkbox"
                            className={style.check}
                            label="Default"
                            checked={endDefault}
                            onChange={(e) => setEndDefault(e.target.checked)}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className={style.container}>
                <Row className='align-items-center'>
                    <Col xs='auto'>
                        <Button
                            className={styleCourse.customButton + ' ' + style.buttonSize}
                            onClick={cancel}
                        >
                            <i className='bi bi-arrow-left pe-2'></i>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs='auto'>
                        <Button
                            className={styleCourse.customButton + ' ' + style.buttonSize}
                            type='submit'
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
