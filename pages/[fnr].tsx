import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

import { VurderingWrapper } from '../types/vurdering'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const FnrPage = () => {
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
        <VurderingTabell data={data} fnr={fnr as string} />
    )
}


export default FnrPage
