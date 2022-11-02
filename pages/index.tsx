import Link from 'next/link'
import styles from 'styles/Course.module.scss'

import { getCourses, getLessons } from 'services/courseService'
import { Course } from 'models/course';
import { Button, Card } from 'react-bootstrap';

interface Props {
  courses: Course[];
};

const Home = (props: Props) => {
  const courseCards = props.courses.map((course, index) => {
    return (
      <div className='col-12 col-md-6 col-lg-4' key={index}>
        <Card
          className={styles.card}
        >
          <Card.Body>
            <Card.Title className={styles.cardTitle}>
              <Link
                href={`/course/${course.id}`}
                data-cy={`course-${index}`}
              >
                {course.title}
              </Link>
            </Card.Title>
            <Card.Text>
              {course.description}
              <Button
                data-cy={`lesson-delete-${index}`}
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
            <li className="breadcrumb-item" aria-current="page">Home</li>
          </ol>
        </nav>
        <h1>Home</h1>
        <div className='p-2'>
          <h2>Courses</h2>
          <div className='row g-2 py-2'>
            {courseCards}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const { data: courses, status } = await getCourses()


  // Pass data to the page via props
  return { props: { courses } }
}

export default Home
