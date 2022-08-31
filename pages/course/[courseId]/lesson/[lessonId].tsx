import React from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { ParsedUrlQuery } from 'querystring'
import Ide from '../../../../components/ide/ide'
import CustomTab from '../../../../components/tab/customTab'
import JSXStyle from 'styled-jsx/style'

//Component
type Props = {
    id: number
    name: string
};

export default function Lesson(props: Props) {

    const tab1 = {
        name: 'Información',
        content: (
            <div>
                <div style={{ width: '100%', height: '75vh' }}>
                    <Ide language='python' value={'a=2 \nb=3 \nprint(a+b)'} />
                </div>
            </div>
        )
    }

    const tab2 = {
        name: 'Plantilla',
        content: (
            <div>
                <h1>Tab2</h1>
            </div>
        )
    }

    const tab3 = {
        name: 'Solución',
        content: (
            <div>
                <h1>Tab3</h1>
            </div>
        )
    }

    const tab4 = {
        name: 'Test',
        content: (
            <div>
                <h1>Tab4</h1>
            </div>
        )
    }

    return (
        <CustomTab tabs={[tab1, tab2, tab3, tab4]}
            header={
                < div >
                    <Head>
                        <title>{"Step - " + props.id}</title>
                    </Head>
                    <h1>We are in Step {props.name}</h1>
                    <Link href="/">Go Back</Link>
                </div >
            }
        ></CustomTab>
    )
}

//Fetch
export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/")
    const { count } = await response.json()

    //Id for each pokemon
    const ids: string[] = Array.from({ length: count }, (_, i) => { return i + 1 + '' })

    const paths = ids.map((id) => {
        return {
            params: { courseId: '1', lessonId: id },
        }
    })

    return {
        paths,
        fallback: false,
    };
}

interface Context extends ParsedUrlQuery {
    courseId: string
    lessonId: string
}

export const getStaticProps: GetStaticProps = async (context) => {
    const { lessonId } = context.params as Context

    const res = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + lessonId)
    const pokemon = await res.json()

    return {
        props: pokemon
    }
}