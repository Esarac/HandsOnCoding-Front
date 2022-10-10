import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import Console, { ConsoleHandle } from './console'
import { postCode } from '../../services/fetchCompiler'
import style from './ide.module.scss'
import { Button } from 'react-bootstrap';

type Props = {
    /**
     * @param {string} - A string specifying the programming language that is going to be compiled
     */
    language: string
    /**
     * @param {string} - The code written by the user
     */
    value: string
    /**
     * @param {React.ReactElement<typeof Button>} - An ReactElement representing the save button (optional).
     */
    saveBtn?: React.ReactElement<typeof Button>;

    onChange?: (data: string) => void;
}

/**
 * This component uses Monaco Editor to allow the users to write code and executed it. It includes a console to display outputs and allows inputs
 */
export default function Ide(props: Props) {
    //States
    const [code, setCode] = useState(props.value)

    useEffect(() => {
        if (props.onChange)
            props.onChange(code)
    }, [code]);

    //References
    const consoleRef = useRef<ConsoleHandle>(null)

    return (
        <div className={style.ide}>
            <div className={style.buttonBar}>
                {props.saveBtn}
                <button
                    data-cy="run"
                    onClick={(e) => {
                        postCode(props.language, code)
                            .then((response) => {
                                const content = response.data.out
                                consoleRef.current?.addLogItems([{ type: 'output', content }])
                            })
                            .catch((e) => console.log(e))
                    }}>
                    Run
                </button>
            </div>
            <div className={style.editor}>
                <Editor
                    defaultValue=""
                    language={props.language}
                    theme="vs-dark"
                    value={code}
                    onChange={(v, e) => {
                        setCode(v as string)
                    }}
                />
            </div>
            <Console ref={consoleRef} />
        </div>
    )
}