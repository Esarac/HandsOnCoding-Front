import React, { useEffect, useRef, useState } from 'react'

import Editor from '@monaco-editor/react'

import Console, { ConsoleHandle } from './console'

import { postOutput } from '../../services/fetchCompiler'

import style from './ide.module.scss'

type Props = {
    language: string
    value: string
    onChange?: (data: string) => void;
}

export default function Ide(props: Props) {
    //States
    const [code, setCode] = useState(props.value)

    useEffect(() => {
        if(props.onChange)
            props.onChange(code)
    }, [code]);

    //References
    const consoleRef = useRef<ConsoleHandle>(null)

    return (
        <div className={style.ide}>
            <div className={style.buttonBar}>
                <button
                data-cy="run"
                onClick={(e)=>{
                    postOutput(props.language, code)
                    .then((output)=>{
                        consoleRef.current?.addLogItems([{type:'output',content:output}])
                    })
                    .catch((e)=>console.log(e))
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
                    onChange={(v, e)=>{
                        setCode(v as string)
                    }}
                />
            </div>
            <Console ref={consoleRef}/>
        </div>
    )
}