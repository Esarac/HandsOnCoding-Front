import TestView from 'components/testView/testView'
import { Test } from 'models/test'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import style from './testList.module.scss'
import { toast } from 'react-toastify';
import { Modal } from 'components/modal/modal'
import TestForm from 'components/forms/testForm'
import { deleteTest, getTests } from 'services/courseService';
import { runTest } from 'services/fetchCompiler';

interface TestWithStatus extends Test {
    status: {
        icon: number,
        message: string
    }
}

type Props = {
    stepId: string
    tests: Test[]
    code: string
}

function TestList(props: Props) {
    const [tests, setTests] = useState<TestWithStatus[]>(props.tests.map((test) => { return { ...test, status: { icon: 0, message: '' } } }))
    const [showModal, setShowModal] = useState<boolean>(false)

    // useEffect(() => { console.log(tests) }, [tests])

    const runAllTest = async () => {
        setTests(tests.map((test) => { return { ...test, status: { icon: 1, message: 'loading...' } } }))

        // await new Promise(resolve => setTimeout(resolve, 1000))

        const tempTests = [...tests]
        const resultTests = await Promise.all(tempTests.map(async (test, index) => {
            await new Promise(resolve => setTimeout(resolve, (2000) * index))

            try {
                const { data, status } = await runTest({ language: "python", code: props.code }, test.input, test.output)
                console.log({ language: "python", code: props.code, input: test.input, output: test.output })
                console.log(data)
                switch (data.result) {
                    case 'INCORRECT':
                        test.status.icon = 3
                        test.status.message = `for the given input "${test.input}" the expected value was "${test.output}", but the received value was "${data.msg}"`
                        // console.log(test.message+'- No')
                        break
                    case 'CORRECT':
                        test.status.icon = 2
                        test.status.message = ''
                        // console.log(test.message+'- Si')
                        break
                    default:
                        console.log('No se')
                }
            }
            catch (e) {
                test.status.icon = 0
                test.status.message = ''
            }

            // updateTestStatus(index, test.status)
            return test
        }))

        setTests(resultTests)
    }

    const updateTestStatus = (index: number, status: { icon: number, message: string }) => {
        let tempTests = [...tests]
        tempTests[index].status = status
        setTests(tempTests)
    }

    const deleteItem = (id: string) => {
        const promise = new Promise((resolve, reject) => {
            deleteTest(props.stepId, id)
                .then(({ data }) => {
                    loadItems()
                    resolve('Successful')
                })
                .catch((e) => {
                    console.log(e)
                    reject('Failed')
                })
        });
        toast.promise(
            promise,
            {
                pending: 'Deleting',
                success: 'Deleted!',
                error: "Couldn't delete, please try again!"
            }, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1500 }
        )
    }

    const loadItems = () => {
        getTests(props.stepId)
            .then((res) => {
                setTests(res.data.map((test) => { return { ...test, status: { icon: 0, message: '' } } }))
            })
            .catch((e) => console.log(e))
        setShowModal(false)
    }

    const cancel = () => {
        setShowModal(false)
    }

    return (
        <div>
            <button
                className={style.customButton}
                onClick={runAllTest}
            >
                <i className={style.icon + ' bi bi-caret-right-fill'}></i>
                Runer
            </button>
            <Stack gap={2}>
                {tests.map((test, index) => {
                    const { status, ...actTest } = test
                    return (
                        <TestView key={index} test={actTest} status={status} onDelete={() => { deleteItem(test.id) }}></TestView>
                    )
                })}
            </Stack>
            <div className={style.container}>
                <button className={style.customButton} onClick={() => setShowModal(true)}>
                    <i className={'bi bi-plus'}></i>
                </button>
            </div>
            <Modal show={showModal} title='New Test' onClose={() => setShowModal(false)}>
                <TestForm stepId={props.stepId} onSave={loadItems} onCancel={cancel}></TestForm>
            </Modal>
        </div>
    )
}

export default TestList