import Ide from 'components/ide/ide'
import { StepNested } from 'models/step'
import { FileRawDTO } from 'models/file'
import React, { useState } from 'react'
import style from './step.module.scss'
import CustomTab from 'components/tab/customTab'
import { postTemplate, postSolution, putStep } from 'services/fetchStep'
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { toast } from 'react-toastify';
import MarkdownEditor from 'components/editormarkdown/markdownEditor'
import TestList from 'components/testList/testList'

type Props = {
    step: StepNested
    languageName: string
}

export default function Step(props: Props) {
    const [codeTemplate, setCodeTemplate] = useState<string>(props.step.template?.content as string)
    const [codeSolution, setCodeSolution] = useState<string>(props.step.solution?.content as string)

    const saveBtnTemplate = (
        <button className={style.customButton}
            data-cy='saveBtn'
            onClick={(e) => {
                const template: FileRawDTO = {
                    name: (typeof props.step.template?.name === 'undefined') ? 'main.py' : props.step.template?.name,
                    content: codeTemplate
                }
                const promise = new Promise((resolve, reject) => {
                    postTemplate(props.step.id, template)
                        .then(v => {
                            console.log(v)
                            resolve('Successfull')
                        })
                        .catch(e => {
                            console.log(e)
                            reject('Failed')
                        })
                });
                toast.promise(
                    promise,
                    {
                        pending: 'Saving',
                        success: 'Saved!',
                        error: "Couldn't save, please try again!"
                    }, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 }
                )
            }}

        >
            <i className={style.icon + ' bi bi-file-earmark-code-fill'}></i>
            Save
        </button>
    )

    const saveBtnSolution = (
        <button className={style.customButton}
            data-cy='saveBtn'
            onClick={(e) => {
                const solution: FileRawDTO = {
                    name: (typeof props.step.solution?.name === 'undefined') ? 'main.py' : props.step.solution?.name,
                    content: codeSolution,
                }

                const promise = new Promise((resolve, reject) => {
                    postSolution(props.step.id, solution)
                        .then(v => {
                            console.log(v)
                            resolve('Successfull')
                        })
                        .catch(e => {
                            console.log(e)
                            reject('Failed')
                        })
                });
                toast.promise(
                    promise,
                    {
                        pending: 'Saving',
                        success: 'Saved!',
                        error: "Couldn't save, please try again!"
                    }, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 }
                )
            }}

        >
            <i className={style.icon + ' bi bi-file-earmark-code-fill'}></i>
            Save
        </button>
    )

    const saveDescription = (description: string) => {
        const promise = new Promise((resolve, reject) => {
            putStep(props.step.id, { description, lessonId: props.step.lessonId })
                .then(v => {
                    console.log(v)
                    resolve('Successfull')
                })
                .catch(e => {
                    console.log(e)
                    reject('Failed')
                })
        });
        toast.promise(
            promise,
            {
                pending: 'Saving',
                success: 'Saved!',
                error: "Couldn't save, please try again!"
            }, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 }
        )
    }

    const descriptionTab = {
        name: 'Description',
        content: (
            <div data-cy='description'>
                <MarkdownEditor text={props.step.description} save={saveDescription}></MarkdownEditor>
            </div>
        )
    }

    const testTab = {
        name: 'Test',
        content: (
            <div data-cy='test'>
                <TestList stepId={props.step.id} tests={props.step.tests}></TestList>
            </div>
        )
    }

    const templateTab = {
        name: 'Template',
        content: (
            <div data-cy='template' style={{ width: '100%', height: '75vh' }}>
                <Ide
                    onChange={setCodeTemplate}
                    language={props.languageName}
                    saveBtn={saveBtnTemplate}
                    value={props.step.template?.content as string} />
            </div>
        )
    }

    const solutionTab = {
        name: 'Solution',
        content: (
            <div data-cy='solution' style={{ width: '100%', height: '75vh' }}>
                <Ide
                    onChange={setCodeSolution}
                    language={props.languageName}
                    saveBtn={saveBtnSolution}
                    value={props.step.solution?.content as string}
                />
            </div>
        )
    }

    return (
        <div className={style.container}>
            <Allotment>
                <div data-cy='leftBlock'>
                    <CustomTab tabs={[descriptionTab, testTab]}></CustomTab>
                </div>
                <div data-cy='rightBlock'>
                    <CustomTab tabs={[templateTab, solutionTab]}></CustomTab>
                </div>
            </Allotment>
        </div>
    )
}