import React from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { ParsedUrlQuery } from 'querystring'
import Ide from '../../../../components/ide/ide'

//Component
type Props = {
    id: number
    name: string
};

export default function Lesson(props: Props) {
    return (
        <div>
            <Head>
                <title>{"Step - " + props.id}</title>
            </Head>
            <h1>We are in Step {props.name}</h1>
            <Ide />
            <Link href="/">Go Back</Link>
        </div>
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