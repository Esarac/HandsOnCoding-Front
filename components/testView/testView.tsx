import { Test } from 'models/test'
import React from 'react'
import { Oval } from 'react-loader-spinner'
import style from './testView.module.scss'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Props = {
    testElement: TestElement
}

interface TestElement {
    test: Test
    state: number

}

interface State {
    icon: JSX.Element
}

const states: string[] = ['none', 'running', 'successful', 'fail']

const icons: { [name: string]: State } = {
    'none': { icon: <i className={style.none + ' bi bi-circle'}></i> },
    'running': {
        icon: <Oval
            height={17}
            width={17}
            color="#e0e0e0"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#585858"
            strokeWidth={4}
            strokeWidthSecondary={3}

        />
    },
    'successful': { icon: <i className={style.check + ' bi bi-check-circle-fill'}></i> },
    'fail': { icon: <i className={style.error + ' bi bi-exclamation-circle-fill'}></i> }
}

function TestView(props: Props) {
    return (
        <div className={style.container}>
            <Row className={style.aligner + ' align-items-center'}>
                <Col xs='auto'>
                    {icons[states[props.testElement.state]].icon}
                </Col>
                <Col xs='auto'>
                    {props.testElement.test.message}
                </Col>
            </Row>
        </div>
    )
}

export default TestView