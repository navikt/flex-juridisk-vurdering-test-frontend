import dateFormat from 'dateformat'
import jsonschema from 'jsonschema'
import MaterialTable from 'material-table'
import ReactJson from 'react-json-view'

import { Vurdering, VurderingWrapper } from '../../types/vurdering'


const validator = new jsonschema.Validator()


interface VurderingTabellProps {
    data: VurderingWrapper[],
    fnr: string,
    skjema: object,
}

export default function VurderingTabell(p: VurderingTabellProps) {
    function validerSkjema(vurdering: Vurdering) {
        return validator.validate(vurdering, p.skjema)
    }

    return (
        <MaterialTable
            title={`Vurderinger for ${p.fnr}`}
            columns={[
                {
                    title: 'Tidsstempel',
                    field: 'vurdering.tidsstempel',
                    customSort: (data1: VurderingWrapper, data2: VurderingWrapper) => data1.vurdering?.tidsstempel?.localeCompare(data2.vurdering?.tidsstempel || '') || -1,
                    filtering: false,
                    sorting: true,
                    defaultSort: 'desc',
                    render: rowData => {
                        if (rowData.vurdering.tidsstempel || rowData.opprettet) {
                            return dateFormat(rowData.vurdering.tidsstempel || rowData.opprettet, 'dS mmm yyyy HH:MM:ss')
                        }
                    }
                },
                { title: 'Kilde', field: 'vurdering.kilde' },
                {
                    title: 'Lov',
                    customSort: (data1: VurderingWrapper, data2: VurderingWrapper) => skapParagraf(data1.vurdering).localeCompare(skapParagraf(data2.vurdering) || '') || -1,
                    customFilterAndSearch: (f: any, rowData: VurderingWrapper) => skapParagraf(rowData.vurdering).includes(f),
                    render: rowData => skapParagraf(rowData.vurdering)
                },
                {
                    title: 'utfall',
                    customSort: (data1: VurderingWrapper, data2: VurderingWrapper) => data1.vurdering.utfall.localeCompare(data2.vurdering.utfall) || -1,
                    customFilterAndSearch: (f: any, rowData: VurderingWrapper) => skapUtfall(rowData.vurdering).includes(f) || rowData.vurdering.utfall.includes(f),
                    render: rowData => skapUtfall(rowData.vurdering)
                },
                {
                    title: 'Kafkamelding',
                    customFilterAndSearch: (f: any, rowData: VurderingWrapper) => JSON.stringify(rowData.vurdering).includes(f),
                    render: rowData => (
                        <ReactJson src={rowData.vurdering} collapsed={true}
                                   enableClipboard={false}
                                   displayDataTypes={false}
                                   name={false}
                                   displayObjectSize={false}
                                   quotesOnKeys={false}
                        />)
                },
                {
                    title: 'Validert',
                    render: rowData => {
                        let result = validerSkjema(rowData.vurdering)
                        if (result.valid) {
                            return '✅'
                        }
                        return (
                            <ReactJson style={{ backgroundColor: 'pink' }}
                                       src={result} collapsed={true}
                                       enableClipboard={false}
                                       displayDataTypes={false}
                                       name={false}
                                       displayObjectSize={false}
                                       quotesOnKeys={false}
                            />)
                    }
                },
            ]
            }
            data={p.data}
            options={{
                search: false,
                filtering: true,
                paging: false,
            }}
        />
    )
}

function skapParagraf(v: Vurdering) {
    let lov = v.lovverk + ' $' + v.paragraf
    if (v.ledd) {
        lov += ' ' + tallTilNte(v.ledd) + ' ledd'
    }
    if (v.bokstav) {
        lov += ' bokstav ' + v.bokstav
    }
    if (v.punktum) {
        lov += ' ' + tallTilNte(v.punktum) + ' punktum'
    }
    return lov
}

function skapUtfall(v: Vurdering) {
    switch (v.utfall) {
        case 'VILKAR_BEREGNET':
            return '🤖 vilkår beregnet'
        case 'VILKAR_IKKE_OPPFYLT':
            return '❌ vilkår ikke oppfylt'
        case 'VILKAR_OPPFYLT':
            return '👍 vilkår oppfylt'
        case 'VILKAR_UAVKLART':
            return '❓ vilkår uavklart'

    }
    return v.utfall
}


function tallTilNte(tall: number): String {
    switch (tall) {
        case 1:
            return 'første'
        case 2:
            return 'andre'
        case 3:
            return 'tredje'
        case 4:
            return 'fjerde'
        case 5:
            return 'femte'
        case 6:
            return 'sjette'

    }
    return String(tall)
}
