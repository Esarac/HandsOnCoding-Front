import React, { createRef, useState } from 'react'

import Editor from './editor'
import Console from './console'

import styles from './ide.module.scss'

export default function Ide() {
    const [output, setOutput] = useState('> johan')

    return (
        <div className={styles.ide}>
            <Editor template='print("hello!")'
                onRun={(v: string)=>setOutput('>    '+v)}
            />
            <Console output={output}/>
        </div>
    )
}
