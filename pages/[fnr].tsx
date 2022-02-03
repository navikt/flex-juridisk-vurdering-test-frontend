import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

import { VurderingWrapper } from '../types/vurdering'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Props {
    skjema: object;
}

const FnrPage: NextPage<Props> = ({ skjema }) => {
    const router = useRouter()
    const { fnr } = router.query
    const {
        data,
        error
    } = useSWR<VurderingWrapper[]>(`https://flex-juridisk-vurdering-test-backend.dev.nav.no/api/vurderinger/${fnr}`, fetcher)

    const VurderingTabell = dynamic(
        () => import('../components/tabell/VurderingTabell'),
        { ssr: false }
    )

    if (error) {
        return <strong>OOPS. Noe gikk feil</strong>
    }

    if (!data) {
        return <strong>Laster...</strong>
    }

    return (
        <VurderingTabell data={data} fnr={fnr as string} skjema={skjema} />
    )
}


FnrPage.getInitialProps = async({ req }) => {
    const res = await fetch('https://raw.githubusercontent.com/navikt/helse/main/subsumsjon/json-schema-1.0.0.json')
    const skjema = await res.json()
    return { skjema }
}

export default FnrPage

