import React, { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import Console, { ConsoleHandle, LogItem } from './console'
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
    const [consoleInput, setConsoleInput] = useState("")

    useEffect(() => {
        if (props.onChange)
            props.onChange(code)
    }, [code]);

    //References
    const consoleRef = useRef<ConsoleHandle>(null)

    return (
        <div
        data-cy='ide'
        className={style.ide}
        >
            <div className={style.buttonBar}>
                {props.saveBtn}
                <button
                    data-cy='runBtn'
                    onClick={(e) => {
                        const input = consoleInput ? consoleInput : undefined
                        postCode({language: props.language, code, input})
                            .then(({data, status}) => {
                                const {code, msg} = data

                                const logInputs: LogItem[] = input ? [{ type: 'input', content: msg }] : []

                                var color: 'red' | 'yellow' | 'green' | undefined = 'yellow'
                                switch(code){
                                    case 21:
                                        color = 'red'
                                    break
                                    case 10:
                                        color = 'green'
                                    break
                                }

                                const logOutput: LogItem[] = [{ type:'output', color, content: msg }]
                                consoleRef.current?.addLogItems([...logInputs, ...logOutput])
                            })
                            .catch((e) => console.log(e))
                    }}>
                    Run
                </button>
            </div>
            <div data-cy='editor' className={style.editor}>
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
            <Console
            onChange={setConsoleInput}
            ref={consoleRef} />
        </div>
    )
}