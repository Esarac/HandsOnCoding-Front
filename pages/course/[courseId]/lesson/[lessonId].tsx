import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import Ide from '../../../../components/ide/ide'
import CustomTab from '../../../../components/tab/customTab'
import { Lesson } from 'models/lessons'
import { Step, StepNested } from 'models/steps'
import { putStep, getStep, getSteps } from '../../../../services/fetchStep'
import styles from '../../../../styles/lesson.module.scss'
import { data } from 'cypress/types/jquery'
import { getLesson, getLessons } from 'services/fetchLesson'
import { TemplateDTO } from 'models/templates'
import { SolutionDTO } from 'models/solutions'
import { postSolution, postTemplate, putSolution, putTemplate } from 'services/fetchFile'

//Component
interface Props extends Lesson {
    steps: StepNested[]
};

export default function LessonPage(props: Props) {
    const [codeTemplate, setCodeTemplate] = useState<string>(props.steps[0].template?.content as string)
    const [codeSolution, setCodeSolution] = useState<string>(props.steps[0].solution?.content as string)

    const saveBtnTemplate = (
        <button
            onClick={(e) => {
                const template: TemplateDTO = {
                    name: (typeof props.steps[0].template?.name === 'undefined') ? 'main.py' : props.steps[0].template?.name,
                    content: codeTemplate,
                    stepId: props.steps[0].id
                }
                if(props.steps[0].template) {
                    console.log("PUT")
                    putTemplate(props.steps[0].template.id, template)
                }
                else {
                    console.log("POST")
                    postTemplate(template)
                }
            }}
        >
            Save
        </button>
    )

    const saveBtnSolution = (
        <button
            onClick={(e) => {
                const solution: SolutionDTO = {
                    name: (typeof props.steps[0].solution?.name === 'undefined') ? 'main.py' : props.steps[0].solution?.name,
                    content: codeSolution,
                    stepId: props.steps[0].id
                }
                if(props.steps[0].solution) {
                    console.log("PUT")
                    putSolution(props.steps[0].solution.id, solution)
                }
                else {
                    console.log("POST")
                    postSolution(solution)
                }
                
            }}
        >
            Save
        </button>
    )

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
                <Ide
                    onChange={setCodeTemplate}
                    language='python'
                    saveBtn={saveBtnTemplate}
                    value={props.steps[0].template?.content as string} />
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
                    saveBtn={saveBtnSolution}
                    value={props.steps[0].solution?.content as string}
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
        <>
        {console.log(props)}
            <CustomTab tabs={[tab1, tab2, tab3, tab4]}
                header={
                    < div >
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
                    </div >
                }
            ></CustomTab>
        </>
    )

    const deleteTab = () => {
        console.log("Delete")
    }
}

//Fetch
export const getStaticPaths: GetStaticPaths = async () => {
    const { data: lessons, status } = await getLessons();

    //Id for each pokemon
    const ids: string[] = lessons.map((lessons) => { return lessons.id })

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

    const { data: lessonNested, status } = await getLesson(lessonId)

    const { steps : rawSteps,...lesson} = lessonNested

    var steps: StepNested[] = []

    if(status == 200) {
        steps = await Promise.all(
            rawSteps.map(async (step) => {
                const {data: stepNested, status} = await getStep(step.id)
                return stepNested
            })
        )        
    }

    return {
        props: {... lesson, steps}
    }
}