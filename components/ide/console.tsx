import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'

import cn from 'classnames'
import style from './ide.module.scss'

type LogItem = {
    type: string
    content: string
}

type Props = {

}

export type ConsoleHandle = {
    addLogItems: (logItems: LogItem[]) => void;
}


/**
 * This component is a console that displays outputs, receive inputs, and allows running commands
 */
function Console(_props:Props, ref?:Ref<ConsoleHandle>){
    //States
    const [input, setInput] = useState<string>('')
    const [log, setLog] = useState<LogItem[]>([])

    //References
    const inputRef = useRef<HTMLInputElement>(null)
    const consoleRef = useRef<HTMLDivElement>(null)

    //Effect
    useEffect(()=>{
        if (consoleRef)
            consoleRef.current?.scroll({ top: consoleRef.current?.scrollHeight })
    },[log])

    //Functions
    const submitCommand = () => {
        if(input.trim() === '')
            addLogItems([{type:'input', content:' '}])
        else if(input==='clear')
            clearLog()
        else
            addLogItems([{type:'input', content:input},{type:'output', content:'command not found'}])
    }

    const addLogItems = (logItems: LogItem[]) => {
        setLog([...log, ...logItems])
        setInput('')
    }

    const clearLog = () => {
        setLog([])
        setInput('')
    }

    //JSX Elements
    const listOutputs = log.map((value, index)=>{
        return(
            <p
            data-cy="log"
            className={cn({
                [style.logInput]: value.type === 'input',
                [style.logOutput]: value.type === 'output',
            })}
            key={index}
            >
                {value.content}
            </p>
        )
    })

    //Provided Methods
    useImperativeHandle(ref, () => ({addLogItems}));

    return (
        <div
        ref={consoleRef}
        onClick={(e)=> inputRef.current?.focus()}
        className={style.console}
        >
            {listOutputs}
            <div className={style.inputContainer+' '+style.logInput}>
                <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter")
                        submitCommand()
                }}
                />
            </div>
        </div>
    )
}

export default forwardRef<ConsoleHandle, Props>(Console);