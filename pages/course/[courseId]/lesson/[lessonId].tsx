import React, { useState } from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

import Ide from '../../../../components/ide/ide'
import CustomTab from '../../../../components/tab/customTab'
import { Step, File } from '../../../../models/models'
import { StepResponse, putStep, getStep, getSteps } from '../../../../services/fetchStep'

import styles from '../../../../styles/lesson.module.scss'

//Component
interface Props extends StepResponse{
    
};

export default function Lesson(props: Props) {
    const [codeTemplate, setCodeTemplate] = useState<string>(props.template?.content as string)
    const [codeSolution, setCodeSolution] = useState<string>(props.solution?.content as string)

    const tab1 = {
        name: 'Description',
        content: (
            <div>
                <h1>Description</h1>
            </div>
        )
    }

    const tab2 = {
        name: 'Template',
        content: (
            <div style={{ width: '100%', height: '75vh' }}>
                <Ide onChange={setCodeTemplate} language='python' value={props.template?.content as string} />
            </div>
        )
    }

    const tab3 = {
        name: 'Solution',
        content: (
            <div style={{ width: '100%', height: '75vh' }}>
                <Ide
                onChange={setCodeSolution}
                language='python'
                value={props.solution?.content as string}
                />
            </div>
        )
    }

    const tab4 = {
        name: 'Test',
        content: (
            <div>
                <h1>Test</h1>
            </div>
        )
    }

    return (
        <CustomTab tabs={[tab1, tab2, tab3, tab4]}
            header={
                < div >
                    <Head>
                        <title>{"Step - " + props.description}</title>
                    </Head>
                    <h1>We are in Step {props.description}</h1>
                    <div>
                        <div className={styles.button}>
                            <Link href="/">
                                Go back
                            </Link>
                        </div>
                        <button
                        className={styles.button}
                        onClick={(e)=>{
                            const template: File={
                                name: (typeof props.template?.name === 'undefined') ? 'main.py' : props.template?.name,
                                content: codeTemplate
                            }

                            const solution: File={
                                name: (typeof props.solution?.name === 'undefined') ? 'main.py' : props.solution?.name,
                                content: codeSolution
                            }

                            putStep(props.id, {description: props.description, template: template, solution: solution})
                            .then((v)=>console.log(v))
                            .catch((e)=>console.log(e))
                        }}
                        >
                            Save
                        </button>
                    </div>
                </div >
            }
        ></CustomTab>
    )
}

//Fetch
export const getStaticPaths: GetStaticPaths = async () => {
    const {data: steps, status} = await getSteps();

    //Id for each pokemon
    const ids: string[] = steps.map((step)=>{return step.id})

    const paths = ids.map((id) => {
        return {
            params: { courseId: '1', lessonId: id },
        }
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

    const {data: step, status} = await getStep(lessonId)

    return {
        props: step
    }
}