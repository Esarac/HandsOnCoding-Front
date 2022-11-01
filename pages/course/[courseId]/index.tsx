import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import styles from 'styles/Course.module.scss'

import { deleteLesson, getLanguages, getLessons } from 'services/fetchLesson'
import { Lesson } from 'models/lessons'
import { ParsedUrlQuery } from 'querystring'
import { Modal } from 'components/modal/modal'
import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import LessonForm from 'components/forms/lessonForm'
import { Language } from 'models/language'

interface Props {
  id: string
  lessons: Lesson[];
};

export default function Course(props: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(props.lessons)
  const [languages, setLanguages] = useState<Language[]>([])

  useState(()=>{
    getLanguages()
    .then(({data}) => setLanguages(data))
  })

  const [showModal, setShowModal] = useState<boolean>(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const updateLessons = () => {
    getCourseLessons(props.id)
      .then((resLessons) => {
        setLessons(resLessons)
      })
      .catch((e) => console.log(e))
  }

  const delLesson = (id: string) => {
    deleteLesson(id)
    .then(({data, status})=>{
      updateLessons();
    })
    .catch((e) => console.log(e))
  }

  const lessonCards = lessons.map((lesson, index) => {
    return (
      <div className='col-12 col-md-6 col-lg-4' key={index}>
        <Card
          className={styles.card}
        >
          <Card.Body>
            <Card.Title className={styles.cardTitle}>
              <Link
                href={`/course/${lesson.courseId}/lesson/${lesson.id}`}
                data-cy={`lesson-${index}`}
                style={{textDecoration:'none'}}
              >
                {lesson.title}
              </Link>
            </Card.Title>
            <Card.Text>
              {lesson.languageName}
              <Button
                data-cy={`tab-add`}
                className={styles.customButton + " mt-3"}
                onClick={()=>delLesson(lesson.id)}
              >
                <i className='bi bi-trash pe-2'></i>
                Delete
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })

  return (
    <div className='container'>
      <div className='row g-2 py-2'>
        {lessonCards}
      </div>
      <Button
        data-cy={`tab-add`}
        className={styles.addButton + " bi bi-plus"}
        onClick={openModal}
      />
      <Modal
        show={showModal}
        title="New Lesson"
        onClose={closeModal}
      >
        <LessonForm
          courseId={props.id}
          onSave={()=>{
            updateLessons()
            closeModal()
          }}
          languages={languages}
          onCancel={closeModal}
        />
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

  const lessons = await getCourseLessons(courseId)

  return {
    props: {
      id: courseId,
      lessons
    }
  }
}

const getCourseLessons = async (courseId: string) => {
  const { data: lessons, status } = await getLessons()

  return lessons.filter((lesson) => lesson.courseId === courseId)
}
