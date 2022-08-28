import React, { useState } from 'react'

import Editor from './editor'
import Console from './console'

export default function Ide() {
    const [output, setOutput] = useState('> johan')

    return (
        <div>
            Ide
            <Editor template='print("hello!")'
                onRun={(v: string)=>setOutput('>    '+v)}
            />
            <Console output={output}/>
        </div>
    )
}
