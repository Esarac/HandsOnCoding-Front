import TestView from 'components/testView/testView'
import { Test } from 'models/test'
import React from 'react'
import Stack from 'react-bootstrap/Stack';
import style from './testList.module.scss'

type Props = {
    tests: Test[]
}

function TestList(props: Props) {
    return (
        <div>
            <button className={style.customButton}>
                <i className={style.icon + ' bi bi-caret-right-fill'}></i>
                Run
            </button>
            <Stack gap={2}>
                {props.tests.map((test, index) => (
                    <TestView key={index} testElement={{ test: test, state: 0 }}></TestView>
                ))}
            </Stack>
            <div className={style.container}>
                <button className={style.customButton}>
                    <i className={'bi bi-plus'}></i>
                </button>
            </div>
        </div>
    )
}

export default TestList