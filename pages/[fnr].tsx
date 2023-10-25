import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import useSWR from 'swr'

import { VurderingWrapper } from '../types/vurdering'

const fetcher = (url: string): Promise<VurderingWrapper[]> => fetch(url).then((r) => r.json())

interface Props {
    skjema: object
}

const FnrPage: NextPage<Props> = ({ skjema }): ReactElement => {
    const router = useRouter()
    const { fnr } = router.query
    const { data, error } = useSWR<VurderingWrapper[]>(
        `https://flex-juridisk-vurdering-test-backend.intern.dev.nav.no/api/vurderinger/${fnr}`,
        fetcher,
    )

    const VurderingTabell = dynamic(() => import('../components/tabell/VurderingTabell'), { ssr: false })

    if (error) {
        return <strong>OOPS. Noe gikk feil</strong>
    }

    if (!data) {
        return <strong>Laster...</strong>
    }

    return <VurderingTabell data={data} tittel={'Vurderinger for ' + fnr} skjema={skjema} skjulFnr={true} />
}

FnrPage.getInitialProps = async () => {
    const res = await fetch('https://raw.githubusercontent.com/navikt/helse/main/subsumsjon/json-schema-1.0.0.json')
    const skjema = await res.json()
    return { skjema }
}

export default FnrPage
