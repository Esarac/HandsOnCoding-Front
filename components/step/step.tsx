import Ide from 'components/ide/ide'
import { StepNested } from 'models/step'
import { FileRawDTO } from 'models/file'
import React, { useState } from 'react'
import style from './step.module.scss'
import CustomTab from 'components/tab/customTab'
import { postTemplate, postSolution, putStep } from 'services/courseService'
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
    const [disableSaveBtnTemplate, setDisableSaveBtnTemplate] = useState<boolean>(false)
    const [disableSaveBtnSolution, setDisableSaveBtnSolution] = useState<boolean>(false)
    const [disableSaveBtnDescription, setDisableSaveBtnDescription] = useState<boolean>(false)


    const saveTemplate = () => {
        setDisableSaveBtnTemplate(true)
        const template: FileRawDTO = {
            name: (typeof props.step.template?.name === 'undefined') ? 'main.py' : props.step.template?.name,
            content: codeTemplate
        }
        const promise = new Promise((resolve, reject) => {
            postTemplate(props.step.id, template)
                .then(v => {
                    console.log(v)
                    setDisableSaveBtnTemplate(false)
                    resolve('Successfull')
                })
                .catch(e => {
                    console.log(e)
                    setDisableSaveBtnTemplate(false)
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

    const saveSolution = () => {
        setDisableSaveBtnSolution(true)
        const solution: FileRawDTO = {
            name: (typeof props.step.solution?.name === 'undefined') ? 'main.py' : props.step.solution?.name,
            content: codeSolution,
        }

        const promise = new Promise((resolve, reject) => {
            postSolution(props.step.id, solution)
                .then(v => {
                    console.log(v)
                    setDisableSaveBtnSolution(false)
                    resolve('Successfull')
                })
                .catch(e => {
                    console.log(e)
                    setDisableSaveBtnSolution(false)
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

    const saveDescription = (description: string) => {
        setDisableSaveBtnDescription(true)
        const promise = new Promise((resolve, reject) => {
            putStep(props.step.id, { description, lessonId: props.step.lessonId })
                .then(v => {
                    console.log(v)
                    setDisableSaveBtnDescription(false)
                    resolve('Successfull')
                })
                .catch(e => {
                    console.log(e)
                    setDisableSaveBtnDescription(false)
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
                <MarkdownEditor text={props.step.description} save={saveDescription} disable={disableSaveBtnDescription}></MarkdownEditor>
            </div>
        )
    }

    const testTab = {
        name: 'Test',
        content: (
            <div data-cy='test'>
                <TestList stepId={props.step.id} tests={props.step.tests} code={codeSolution}></TestList>
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
                    onSave={saveTemplate}
                    disableSaveBtn={disableSaveBtnTemplate}
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
                    onSave={saveSolution}
                    disableSaveBtn={disableSaveBtnSolution}
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