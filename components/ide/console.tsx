import React from 'react'

import Head from 'next/head'
import Script from 'next/script'

import style from './ide.module.scss'

type Props = {
    output: string
}

export default function Console(props: Props) {
    return (
        <>
        <div className={style.console}>
            {/* <Script defer src="https://pyscript.net/alpha/pyscript.js" strategy="lazyOnload"/>
            <py-script>
                {props.output}
            </py-script> */}
            {props.output}
        </div>
        </>
        
    )
}
