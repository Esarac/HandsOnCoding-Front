import React from 'react'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { ParsedUrlQuery } from 'querystring'


type Props = {
    id: number
    name: string
};

export default function Lesson(props: Props) {
  return (
    <div>
        <Head>
            <title>{"Step - "+props.id}</title>
        </Head>
        <h1>We are in Step {props.name}</h1>
        <Image
        src="/images/profile.jpg"
        width={500}
        height={500}
        alt="My image"
        />
        <Link href="/">Go Back</Link>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon-species/")
    const {count} = await res.json()

    const ids: string[] = Array.from({length: count}, (_, i) => {return i + 1+''})

    const paths = ids.map((id) => {
        return {
            params: { courseId:'1',id },
        }
    })

    return {
        paths,
        fallback: false,
    };
}

interface Context extends ParsedUrlQuery{
    id: string
} 

export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as Context

    const res = await fetch("https://pokeapi.co/api/v2/pokemon-species/"+id)
    const pokemon = await res.json()

    return {
        props: pokemon
    }
}