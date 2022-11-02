import TestView from 'components/testView/testView'
import { Test } from 'models/test'
import React from 'react'
import { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import style from './testList.module.scss'
import { toast } from 'react-toastify';
import { Modal } from 'components/modal/modal'
import TestForm from 'components/forms/testForm'
import { getTests } from 'services/courseService';

type Props = {
    stepId: string
    tests: Test[]
}

function TestList(props: Props) {
    const [tests, setTest] = useState<Test[]>(props.tests)
    const [showModal, setShowModal] = useState<boolean>(false)

    const addTest = () => {

    }

    const save = () => {
        getTests(props.stepId)
            .then((res) => {
                setTest(res.data)
            })
            .catch((e) => console.log(e))
        setShowModal(false)
    }

    const cancel = () => {
        setShowModal(false)
    }

    return (
        <div>
            <button className={style.customButton}>
                <i className={style.icon + ' bi bi-caret-right-fill'}></i>
                Run
            </button>
            <Stack gap={2}>
                {tests.map((test, index) => (
                    <TestView key={index} test={test}></TestView>
                ))}
            </Stack>
            <div className={style.container}>
                <button className={style.customButton} onClick={() => setShowModal(true)}>
                    <i className={'bi bi-plus'}></i>
                </button>
            </div>
            <Modal show={showModal} title='New Test' onClose={() => setShowModal(false)}>
                <TestForm stepId={props.stepId} onSave={save} onCancel={cancel}></TestForm>
            </Modal>
        </div>
    )
}

export default TestList