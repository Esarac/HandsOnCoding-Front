import { useState } from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'

import { ParsedUrlQuery } from 'querystring'
import { Button, Card } from 'react-bootstrap'

import { Modal } from 'components/modal/modal'
import LessonForm from 'components/forms/lessonForm'

import { CourseNested } from 'models/course'
import { Lesson } from 'models/lessons'
import { Language } from 'models/language'
import { deleteLesson, getCourse, getCourses, getLanguages, getLessons } from 'services/courseService'

import styles from 'styles/Course.module.scss'
import { Resource } from 'models/resource'

interface Props extends CourseNested { }

export default function Course(props: Props) {
  const [lessons, setLessons] = useState<Lesson[]>(props.lessons)
  const [resources, setResources] = useState<Resource[]>(props.resources)
  const [languages, setLanguages] = useState<Language[]>([])

  useState(() => {
    getLanguages()
      .then(({ data }) => setLanguages(data))
  })

  const [showModal, setShowModal] = useState<boolean>(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const refresh = () => {
    getCourse(props.id)
      .then(({ data: course }) => {
        setLessons(course.lessons)
        setResources(course.resources)
      })
      .catch((e) => console.log(e))
  }

  const delLesson = (id: string) => {
    deleteLesson(id)
      .then(({ data, status }) => {
        refresh();
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
              >
                {lesson.title}
              </Link>
            </Card.Title>
            <Card.Text>
              {lesson.languageName}
              <Button
                data-cy={`lesson-delete-${index}`}
                className={styles.customButton + " mt-3"}
                onClick={() => delLesson(lesson.id)}
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

  const resourceCards = resources.map((resource, index) => {
    return (
      <div className='col-12 col-md-6 col-lg-4' key={index}>
        <Card
          className={styles.card}
        >
          <Card.Body>
            <Card.Title className={styles.cardTitle}>
              <a
                href={resource.link}
                data-cy={`resource-${index}`}
              >
                {resource.title}
                <i className='bi bi-link-45deg ps-2'></i>
              </a>
            </Card.Title>
            <Card.Text>
              <Button
                data-cy={`resource-delete-${index}`}
                className={styles.customButton + " mt-3"}
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
    <div className='px-3'>
      <div className='py-2'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
            <li className="breadcrumb-item" aria-current="page">{props.title}</li>
          </ol>
        </nav>
        <h1>{props.title}</h1>
        <p>
          {props.description}
        </p>
        <div className='p-2'>
          <div className='row'>
            <h2 className='col-auto'>Lessons</h2>
            <Button
              data-cy={`tab-add`}
              className={styles.addButton + " bi bi-plus col-auto"}
              onClick={openModal}
            />
          </div>
          <div className='row g-2 py-2'>
            {lessonCards}
          </div>
          <Modal
            show={showModal}
            title="New Lesson"
            onClose={closeModal}
          >
            <LessonForm
              courseId={props.id}
              onSave={() => {
                refresh()
                closeModal()
              }}
              languages={languages}
              onCancel={closeModal}
            />
          </Modal>
        </div>
        <div className='p-2'>
          <h2>Resources</h2>
          <div className='row g-2 py-2'>
            {resourceCards}
          </div>
        </div>
      </div>
    </div>
  )
}

//Fetch
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: courses, status } = await getCourses();

  const paths = courses.map((course) => {
    return { params: { courseId: course.id } }
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
  const { courseId } = context.params as Context

  const { data: course } = await getCourse(courseId)

  return {
    props: course
  }
}