import React, { useEffect, useRef, useState } from 'react'

import Head from 'next/head'
import Script from 'next/script'

import style from './ide.module.scss'
import cn from 'classnames'

type Log = {
    type: string
    content: string
}

type Props = {
    output: string
}

export default function Console(props: Props) {
    //States
    const [input, setInput] = useState<string>('')
    const [log, setLog] = useState<Log[]>([])

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
            setLog([...log, {type:'input', content:' '}])
        else if(input==='clear')
            clearConsole()
        else
            setLog([...log, {type:'input', content:input},{type:'output', content:'command not found'}])
        setInput('')
    }

    const clearConsole = () => {
        setLog([])
    }

    //JSX Elements
    const listOutputs = log.map((value)=>{
        return(
            <p 
            className={cn({
                [style.logInput]: value.type === 'input',
                [style.logOutput]: value.type === 'output',
            })}
            >
                {value.content}
            </p>
        )
    })

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
