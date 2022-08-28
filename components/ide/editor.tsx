import React, {useState} from 'react'

import MonacoEditor from '@monaco-editor/react'

import style from './ide.module.scss'

type Props = {
    template: string;
    onRun: (v: string) => void;
}

export default function Editor(props: Props) {
    const [code, setCode] = useState(props.template)

    return (
        <div>
            <button onClick={(e)=>props.onRun(code)}>RUN</button>
            <div className={style.editor}>
                <MonacoEditor
                    defaultValue=""
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(v, e)=>{
                        setCode(v as string)
                    }}
                />
            </div>
        </div>
    )
}
