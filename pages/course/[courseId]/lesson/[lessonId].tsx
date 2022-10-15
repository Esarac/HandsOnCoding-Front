import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Lesson } from 'models/lessons'
import { StepNested } from 'models/steps'
import { deleteStep, getStep, postStep } from '../../../../services/fetchStep'
import { getLesson, getLessons } from 'services/fetchLesson'
import CustomTab from 'components/tab/customTab'
import { StepDTO } from 'models/steps'
import Step from 'components/step/step'
import styles from '../../../../styles/lesson.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

//Component
interface Props extends Lesson {
    steps: StepNested[]
};

export default function LessonPage(props: Props) {
    const [steps, setSteps] = useState(props.steps)

    const deleteTab = (step: StepNested): void => {
        console.log(step.id)
        deleteStep(step.id).then(res => Router.reload()).catch(e => {console.log(e)})
    }

    const addStep = () => {
        var step : StepDTO = {lessonId: props.id, description: ''}
        postStep(step).then(res => Router.reload())
    }

    return (
        <>
            <CustomTab tabs={props.steps.map((step, index) => {
                return {
                    name: 'Step ' + (index + 1),
                    content: (
                        <Step step={step}></Step>
                    ),
                    delete: () => deleteTab(step)
                }
            })}
                header={
                    (<div>
                        <Head>
                            <title>{"Lesson - " + props.title}</title>
                        </Head>
                        <h1>{props.title}</h1>
                        <div>
                            <div className={styles.button}>
                                <Link href="/">
                                    Go back
                                </Link>
                            </div>
                        </div>
                    </div >)}
                removeable={true}
                create={addStep}
            ></CustomTab>
        </>
    )
}

//Fetch
export const getStaticPaths: GetStaticPaths = async () => {
    const { data: lessons, status } = await getLessons();
    
    const paths = lessons.map((lessons) => {
        return {params: {courseId: lessons.courseId, lessonId: lessons.id}}
    })

    return {
        paths,
        fallback: false,
    };
}

interface Context extends ParsedUrlQuery {
    courseId: string
    lessonId: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    //Es con lesson, pero por ahora lo hacemos con step
    const { lessonId } = context.params as Context

    const { data: lessonNested, status } = await getLesson(lessonId)

    const { steps: rawSteps, ...lesson } = lessonNested

    var steps: StepNested[] = []

    if (status == 200) {
        steps = await Promise.all(
            rawSteps.map(async (step) => {
                const { data: stepNested, status } = await getStep(step.id)
                return stepNested
            })
        )
    }

    return {
        props: { ...lesson, steps }
    }
}