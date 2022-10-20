import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

import { getLessons } from 'services/fetchLesson'
import { Lesson } from 'models/lessons'

interface Props {
    lessons : Lesson[];
};

const Home = (props: Props) => {
  const stepId = props.lessons

  const lessonCards = props.lessons.map((lesson, index)=>{
    return(
      <Link
        href={`/course/${lesson.courseId}/lesson/${lesson.id}`}
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

  return (
    <div className={styles.container}>
      {lessonCards}
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const {data: lessons, status} = await getLessons()
  

  // Pass data to the page via props
  return { props: { lessons } }
}

export default Home
