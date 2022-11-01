import React from 'react'
import { useState } from 'react'
import { Test } from 'models/test'
import { Oval } from 'react-loader-spinner'
import style from './testView.module.scss'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type Props = {
    test: Test
}

interface Icon {
    icon: JSX.Element
}

const icons: { [name: string]: Icon } = {
    // 0 -> none
    0: { icon: <i className={style.none + ' bi bi-circle'}></i> },
    // 1 -> running
    1: {
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
    // 2 -> successful
    2: { icon: <i className={style.check + ' bi bi-check-circle-fill'}></i> },
    // 3 -> fail
    3: { icon: <i className={style.error + ' bi bi-exclamation-circle-fill'}></i> }
}

function TestView(props: Props) {
    const [icon, setIcon] = useState<number>(0)

    const changeIcon = (value: number) => setIcon(value)

    const running = () => {
        changeIcon(1)
    }

    const succesful = () => {
        changeIcon(2)
    }

    const fail = () => {
        changeIcon(3)
    }

    return (
        <div className={style.container}>
            <Row className={style.aligner + ' align-items-center'}>
                <Col xs='auto'>
                    {icons[icon].icon}
                </Col>
                <Col xs='auto'>
                    {props.test.message}
                </Col>
            </Row>
        </div>
    )
}

export default TestView