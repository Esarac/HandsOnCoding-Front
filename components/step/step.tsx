import Ide from 'components/ide/ide'
import { SolutionDTO } from 'models/solutions'
import { StepNested } from 'models/steps'
import { TemplateRawDTO } from 'models/templates'
import { SolutionRawDTO } from 'models/solutions'
import React, { useState } from 'react'
import style from './step.module.scss'
import { postSolution, postTemplate, putSolution, putTemplate } from 'services/fetchFile'
import CustomTab from 'components/tab/customTab'
import { postStepTemplate, postStepSolution } from 'services/fetchStep'
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reject } from 'cypress/types/lodash'

type Props = {
    step: StepNested
}

export default function Step(props: Props) {
    const [codeTemplate, setCodeTemplate] = useState<string>(props.step.template?.content as string)
    const [codeSolution, setCodeSolution] = useState<string>(props.step.solution?.content as string)

    const saveBtnTemplate = (
        <button className={style.customButton}
            data-cy='saveBtn'
            onClick={(e) => {
                const template: TemplateRawDTO = {
                    name: (typeof props.step.template?.name === 'undefined') ? 'main.py' : props.step.template?.name,
                    content: codeTemplate
                }
                const promise = new Promise((resolve, reject) => {
                    postStepTemplate(props.step.id, template)
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
            <i className={style.icon + ' bi bi-file-earmark-plus-fill'}></i>
            Save
        </button>
    )

    const saveBtnSolution = (
        <button className={style.customButton}
            data-cy='saveBtn'
            onClick={(e) => {
                const solution: SolutionRawDTO = {
                    name: (typeof props.step.solution?.name === 'undefined') ? 'main.py' : props.step.solution?.name,
                    content: codeSolution,
                }

                const promise = new Promise((resolve, reject) => {
                    postStepSolution(props.step.id, solution)
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
            <i className={style.icon + ' bi bi-file-earmark-plus-fill'}></i>
            Save
        </button>
    )

    const descriptionTab = {
        name: 'Description',
        content: (
            <div data-cy='description'>
                <h1>Description</h1>
            </div>
        )
    }

    const testTab = {
        name: 'Test',
        content: (
            <div data-cy='test'>
                <h1>Test</h1>
            </div>
        )
    }

    const templateTab = {
        name: 'Template',
        content: (
            <div data-cy='template' style={{ width: '100%', height: '75vh' }}>
                <Ide
                    onChange={setCodeTemplate}
                    language='python'
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
                    language='python'
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