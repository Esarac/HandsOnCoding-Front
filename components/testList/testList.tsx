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
        <Stack gap={2}>
            {props.tests.map((test, index) => (
                <TestView key={index} testElement={{test: test, state: 0}}></TestView>
            ))}
        </Stack>
    )
}

export default TestList