import React, { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'
import cn from 'classnames'
import style from './ide.module.scss'
import LOG_COLORS from './logcolors.json'

const COMMAND_PREFIX = '$'

export type LogItem = {
    type: 'input'|'output'
    color?:  string//red, yellow, blue, green, purple 
    content: string
}

type Props = {
    onChange?: (text: string)=>void
    onSubmitInput?: (inputs: string[])=>void
}

export type ConsoleHandle = {
    addCodeOutput: (logItems: LogItem) => void;
}

/**
 * This component is a console that displays outputs, receive inputs, and allows running commands
 */
function Console(props:Props, ref?:Ref<ConsoleHandle>){
    //States
    const [input, setInput] = useState<string>('')
    const [log, setLog] = useState<LogItem[]>([])
    const [inputs, setInputs] = useState<string[]>([])

    //References
    const inputRef = useRef<HTMLInputElement>(null)
    const consoleRef = useRef<HTMLDivElement>(null)

    //Effect
    useEffect(()=>{
        if(props.onChange)
            props.onChange(input)
    },[input])

    useEffect(()=>{
        if(props.onSubmitInput)
            props.onSubmitInput(inputs)
    },[inputs])

    useEffect(()=>{//Auto Scroll
        if (consoleRef)
            consoleRef.current?.scroll({ top: consoleRef.current?.scrollHeight })
    },[log])

    //Functions
    const submitCommand = () => {
        const prefix = input[0]

        let logInput: LogItem = {type:'input', content: input}
        let logOutput: LogItem|null = null

        if(prefix===COMMAND_PREFIX){
            const command = input.substring(1);

            logInput.color = LOG_COLORS.command
            try{
                logOutput = commandFactory[command]()
                if(command==='clear') return 
            }
            catch(e){
                logOutput = {type:'output', content:'command not found'}
            }
        }
        else if(input.trim() === ''){
            logInput.content = ' '
        }
        else{
            addInput(input)
            logInput.color = LOG_COLORS.input
        }

        if(logOutput)
            addLogItems([logInput, logOutput])
        else
            addLogItems([logInput])
    }
    
    const addInput = (value: string) => {
        setInputs([...inputs, value])
    }

    const addLogItems = (logItems: LogItem[]) => {
        setLog([...log, ...logItems])
        setInput('')
    }

    // CommandFactory
    const commandFactory: {[key: string]: ()=> LogItem|null} = {
        'clear': () => {
            setLog([])
            setInputs([])
            setInput('')
            return null
        },
        'help': () =>{
            const help = 
            'If your code uses inputs, write and submit the inputs before running the code.\n'+
            '\n'+
            'You can use the available commands:\n'+
            '* clear - clear the console and refresh all inputs.'

            return {type:'output', content:help}
        }
    }
    //...

    //JSX Elements
    const listOutputs = log.map((value, index)=>{
        return(
            <p
            data-cy={`log-${index}`}
            className={cn({
                [style.logInput]: value.type === 'input',
                [style.logOutput]: value.type === 'output',
                [style.logRed]: value.color === 'red',
                [style.logYellow]: value.color === 'yellow',
                [style.logGreen]: value.color === 'green',
                [style.logBlue]: value.color === 'blue',
                [style.logPurple]: value.color === 'purple',
            })}
            key={index}
            >
                {value.content}
            </p>
        )
    })

    //Provided Methods
    const addCodeOutput = (logItem: LogItem) => {
        const logItemsNoInputs = log.map((item)=>{
            if(item.color===LOG_COLORS.input) item.color = undefined
            return item
        })
        setLog([...logItemsNoInputs, logItem])

        setInputs([])
        setInput('')
    }

    useImperativeHandle(ref, () => ({addCodeOutput}));
    //...

    return (
        <div
        data-cy='console'
        ref={consoleRef}
        onClick={(e)=> inputRef.current?.focus()}
        className={style.console}
        >
            {listOutputs}
            <div className={style.inputContainer+' '+style.logInput}>
                <input
                data-cy='input'
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        submitCommand()
                    }
                }}
                />
                <i>If your code uses inputs, write the inputs before running the code.</i>
            </div>
        </div>
    )
}

export default forwardRef<ConsoleHandle, Props>(Console);