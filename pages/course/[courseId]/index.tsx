import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styles from 'styles/Course.module.scss'

import { getLessons, postLesson } from 'services/fetchLesson'
import { Lesson } from 'models/lessons'
import { ParsedUrlQuery } from 'querystring'
import { Modal } from 'components/modal/modal'
import { useState } from 'react'
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap'

interface Props {
  id: string
  lessons: Lesson[];
};

export default function Course(props: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(props.lessons)

  const lessonCards = lessons.map((lesson, index) => {
    return (
      <Link
        href={`/course/${lesson.courseId}/lesson/${lesson.id}`}
        key={index}
      >
        <div
          data-cy={`lesson-${index}`}
          className={styles.card}>
          <h2>{lesson.title}</h2>
          <p>
            <a>{lesson.languageName}</a>
          </p>
        </div>
      </Link>
    )
  })

  //Modal
  const [showModal, setShowModal] = useState<boolean>(false)

  const [startDefault, setStartDefault] = useState<boolean>(false)
  const [endDefault, setEndDefault] = useState<boolean>(false)

  const [title, setTitle] = useState<string>("")
  const [language, setLanguage] = useState<string>("")
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")

  const modalButtons = [
    <Button onClick={() => closeModal()}>Cancel</Button>,
    <Button onClick={() => saveLesson()}>Create</Button>
  ]

  const closeModal = () => {
    setShowModal(false)
    resetValues()
  }

  const saveLesson = () => {
    postLesson({
      title,
      languageName:language,
      start: startDefault? undefined : new Date(start).toISOString(),
      end: endDefault? undefined : new Date(end).toISOString(),
      courseId:props.id})
      .then(({ data, status }) => {
        closeModal()
        
        getCourseLessons(props.id)
        .then(setLessons)
        .catch(e=>console.log(e))
      })
      .catch(e=>console.log(e))
  }

  const resetValues = () => {
    setTitle("")
    setLanguage("")

    setStartDefault(true)
    setStart("")

    setEndDefault(true)
    setEnd("")
  }
  //...

  return (
    <div className={styles.container}>
      {lessonCards}
      <Button data-cy={`tab-add`} className={styles.addButton + " bi bi-plus"} onClick={() => setShowModal(true)} />
      <Modal
        show={showModal}
        title="New Lesson"
        onClose={() => closeModal()}
        buttons={modalButtons}
      >
        <Form>
          <Form.Group className='py-1'>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter the title" onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group className='py-1'>
            <Form.Label>Language</Form.Label>
            <Form.Select onChange={(e) => setLanguage(e.target.value)}>
              <option value="python">python</option>
              <option value="java">java</option>
              <option value="javascript">javascript</option>
              <option value="cpp">c++</option>
            </Form.Select>
          </Form.Group>
          <Row className='py-1'>
            <Col>
              <Form.Group>
                <Form.Label>Start</Form.Label>
                <Form.Control type="date" disabled={startDefault} onChange={(e)=>setStart(e.target.value)}/>
                <Form.Check
                  type="checkbox"
                  label="Default"
                  checked={startDefault}
                  onChange={(e) => {
                    //@ts-ignore
                    setStartDefault(e.target.checked)
                  }} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>End</Form.Label>
                <Form.Control type="date" disabled={endDefault} onChange={(e)=>setEnd(e.target.value)}/>
                <Form.Check
                  type="checkbox"
                  label="Default"
                  checked={endDefault}
                  onChange={(e) => {
                    //@ts-ignore
                    setEndDefault(e.target.checked)
                  }} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

//Fetch
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: lessons, status } = await getLessons();

  const paths = lessons.map((lessons) => {
    return { params: { courseId: lessons.courseId } }
  })

  return {
    paths,
    fallback: false,
  };
}

interface Context extends ParsedUrlQuery {
  courseId: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  //Es con lesson, pero por ahora lo hacemos con step
  const { courseId } = context.params as Context

  const lessons= await getCourseLessons(courseId)

  return {
    props: {
      id: courseId,
      lessons
    }
  }
}

export const getCourseLessons = async (courseId: string) => {
  const { data: lessons, status } = await getLessons()

  return lessons.filter((lesson) => lesson.courseId === courseId)
}
