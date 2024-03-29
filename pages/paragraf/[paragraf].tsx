import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

import { VurderingWrapper } from '../../types/vurdering'

const fetcher = (url: string): Promise<VurderingWrapper[]> => fetch(url).then((r) => r.json())

interface Props {
    skjema: object
}

const ParagrafPage: NextPage<Props> = ({ skjema }) => {
    const router = useRouter()
    const { paragraf } = router.query
    const { data, error } = useSWR<VurderingWrapper[]>(
        `https://flex-juridisk-vurdering-test-backend.dev.nav.no/api/vurderinger/?paragraf=${paragraf}`,
        fetcher,
    )

    const VurderingTabell = dynamic(() => import('../../components/tabell/VurderingTabell'), { ssr: false })

    if (error) {
        return <strong>OOPS. Noe gikk feil</strong>
    }

    if (!data) {
        return <strong>Laster...</strong>
    }

    return <VurderingTabell data={data} tittel={`Vurderinger for §${paragraf}`} skjema={skjema} skjulFnr={false} />
}

ParagrafPage.getInitialProps = async () => {
    const res = await fetch('https://raw.githubusercontent.com/navikt/helse/main/subsumsjon/json-schema-1.0.0.json')
    const skjema = await res.json()
    return { skjema }
}

export default ParagrafPage
