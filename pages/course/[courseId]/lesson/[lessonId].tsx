import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Lesson } from 'models/lessons'
import { StepNested, StepDTO } from 'models/step'
import { deleteStep, getStep, postStep, getLesson, getLessons } from 'services/courseService'
import CustomTab from 'components/tab/customTab'
import Step from 'components/step/step'
import styles from '../../../../styles/lesson.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import SweetAlert from 'react-bootstrap-sweetalert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Breadcrumb } from 'react-bootstrap'

//Component
interface Props extends Lesson {
    steps: StepNested[]
};

export default function LessonPage(props: Props) {
    const [steps, setSteps] = useState(props.steps)
    const [updated, setUpdated] = useState(false)
    const [alert, setAlert] = useState<React.ReactNode>(null)

    const deleteTab = (step: StepNested): void => {
        setAlert(
            <SweetAlert
                warning
                showCancel
                style={{ backgroundColor: '#202020', color: 'white' }}
                cancelBtnText="Cancel"
                cancelBtnBsStyle="primary"
                confirmBtnText="Delete"
                confirmBtnBsStyle="danger"
                title="Are you sure you want to delete this step?"
                // @ts-ignore
                children={'This action cannot be undone.'}
                onConfirm={() => {
                    const promise = new Promise((resolve, reject) => {
                        deleteStep(step.id, true)
                            .then(res => {
                                setAlert(null)
                                update()
                                resolve('Successfull')
                            })
                            .catch(err => {
                                console.log(err)
                                reject('Failed')
                            })
                    });
                    toast.promise(
                        promise,
                        {
                            pending: 'Deleting step',
                            success: 'Deleted!',
                            error: "Couldn't delete the step, please try again!"
                        }, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 }
                    )
                }}
                onCancel={() => setAlert(null)}
                focusCancelBtn
            />
        )
    }

    const addStep = () => {
        var step: StepDTO = { lessonId: props.id, description: '' }
        const promise = new Promise((resolve, reject) => {
            postStep(step)
                .then(res => {
                    update()
                    resolve('Successfull')
                })
                .catch(err => {
                    console.log(err)
                    reject('Failed')
                })
        });
        toast.promise(
            promise,
            {
                pending: 'Creating step',
                success: 'Added!',
                error: "Couldn't create the step, please try again!"
            }, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 }
        )
    }

    useEffect(() => {
        getLessonNested(props.id)
            .then(res => {
                setSteps(res.steps)
            })
            .catch(err => {
                console.log(err)
            })
    }, [updated])


    const update = () => setUpdated(!updated)

    return (
        <div>
            <ToastContainer limit={8} draggablePercent={80} theme="dark" />
            <CustomTab
                data-cy={`step-tabs`}
                tabs={steps.map((step, index) => {
                    return {
                        name: 'Step ' + (index + 1),
                        content: (
                            <div data-cy={`step-${index}`}>
                                <Step step={step} languageName={props.languageName}></Step>
                            </div>
                        ),
                        delete: () => deleteTab(step)
                    }
                })}
                header={
                    (<div className='px-3'>
                        <div className='py-2'>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link href={`/course/${props.courseId}`}>{props.courseId}</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{props.id}</li>
                                </ol>
                            </nav>
                            <Head>
                                <title>{"Lesson - " + props.title}</title>
                            </Head>
                            <h1>{props.title}</h1>
                        </div >
                    </div>)}
                removeable={true}
                create={addStep}
            ></CustomTab>
            <>
                {alert}
            </>
        </div>
    )
}

//Fetch
export const getStaticPaths: GetStaticPaths = async () => {
    const { data: lessons, status } = await getLessons();

    const paths = lessons.map((lessons) => {
        return { params: { courseId: lessons.courseId, lessonId: lessons.id } }
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

    const lessonNested: Props = await getLessonNested(lessonId)

    return {
        props: lessonNested
    }
}

export const getLessonNested = async (lessonId: string) => {
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
    return { ...lesson, steps }
}