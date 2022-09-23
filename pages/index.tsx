import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getSteps, StepResponse } from 'services/fetchStep'
import styles from '../styles/Home.module.scss'

interface Props {
    steps : StepResponse[];
};

const Home = (props: Props) => {
  const stepId = props.steps[0].id

  return (
    <div className={styles.container}>
      <Link
        href={"/course/1/lesson/"+stepId}
      >
        <div className={styles.card}>
          <h2>Step 1</h2>
          <p>
            Show you the new page "Step".
          </p>
        </div>
      </Link>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const {data: steps, status} = await getSteps()
  

  // Pass data to the page via props
  return { props: { steps } }
}

export default Home
