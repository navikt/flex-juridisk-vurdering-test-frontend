import MaterialTable from 'material-table'
import ReactJson from 'react-json-view'

import { Vurdering, VurderingWrapper } from '../../types/vurdering'
import { validerSkjema } from './validering'

interface VurderingTabellProps {
    data: VurderingWrapper[],
    fnr: string,
}

export default function VurderingTabell(p: VurderingTabellProps) {
    return (
        <MaterialTable
            title={`Vurderinger for ${p.fnr}`}
            columns={[
                {
                    title: 'Tidsstempel',
                    field: 'vurdering.tidsstempel',
                    filtering: false,
                    sorting: true,
                    defaultSort: 'desc',
                    type: 'datetime'
                },
                { title: 'Kilde', field: 'vurdering.kilde' },
                {
                    title: 'Lov',
                    render: rowData => skapParagraf(rowData.vurdering)
                },
                { title: 'utfall', field: 'vurdering.utfall' },
                {
                    title: 'Kafkamelding',
                    render: rowData => (
                        <ReactJson src={rowData.vurdering} collapsed={true}
                                   enableClipboard={false}
                                   displayDataTypes={false}
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
                                       displayObjectSize={false}
                                       quotesOnKeys={false}
                            />)
                    }
                },
            ]
            }
            data={p.data}
            options={{
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
