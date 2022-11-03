import React from 'react'
import { Test } from 'models/test'
import { Oval } from 'react-loader-spinner'
import style from './testView.module.scss'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap'

type Props = {
    test: Test
    status: {
        icon: number,
        message: string
    }
    onDelete: () => void
    onEdit: (test : Test) => void
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
    return (
        <div className={style.container}>
            <Row className={style.aligner + ' align-items-center w-100'}>
                <Col xs='auto'>
                    {icons[props.status.icon].icon}
                </Col>
                <Col xs='auto'>
                    <a onClick={() => props.onEdit(props.test)} className={style.editText}>{props.test.message}</a>
                </Col>
                <Col className='text-truncate'>
                    {props.status.message !== '' && (
                        <i className='text-muted'>{props.status.message}</i>
                    )}
                </Col>
                <Col xs='auto' className='h-100 p-0'>
                    <Button
                        onClick={props.onDelete}
                        className={style.deleteButton + ' w-100'}
                    >
                        <i className="bi bi-x"></i>
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default TestView