import React, { ReactNode, useState } from 'react'
import Head from 'next/head'

import Header from '../components/Header'
import Footer from '../components/Footer'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'page' }: Props) => {
    return (
        <div>
            <Head>
                <title>{title} | deepCraft</title>
                <meta name="description" content="deepCraft - глубже, чем бедрок." />
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />

            {children}

            <Footer />
        </div>
    )
}

export default Layout