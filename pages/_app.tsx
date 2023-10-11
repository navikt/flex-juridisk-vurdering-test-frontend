import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Juridisk vurdering test frontend</title>
                <meta name="robots" content="noindex" />
            </Head>

            <Component {...pageProps} />
        </>)
}

export default MyApp

