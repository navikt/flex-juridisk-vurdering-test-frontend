import MaterialTable from 'material-table'
import ReactJson from 'react-json-view'

import { VurderingWrapper } from '../../types/vurdering'

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
                { title: 'Fnr', field: 'fnr', filtering: false },
                { title: 'Kilde', field: 'vurdering.@kilde' },
                { title: 'lovverk', field: 'vurdering.lovverk' },
                { title: 'paragraf', field: 'vurdering.paragraf' },
                { title: 'ledd', field: 'vurdering.ledd' },
                { title: 'punktum', field: 'vurdering.punktum' },
                { title: 'bokstav', field: 'vurdering.bokstav' },
                { title: 'lovverksversjon', field: 'vurdering.lovverksversjon' },
                { title: 'utfall', field: 'vurdering.utfall' },
                {
                    title: 'Input',
                    render: rowData => <ReactJson src={rowData.vurdering.input} collapsed={true}
                                                  enableClipboard={false}
                                                  displayDataTypes={false}
                                                  displayObjectSize={false}
                                                  quotesOnKeys={false}
                    />
                },
                {
                    title: 'Output',
                    render: rowData => (rowData.vurdering.output &&
                        <ReactJson src={rowData.vurdering.output} collapsed={true}
                                   enableClipboard={false}
                                   displayDataTypes={false}
                                   displayObjectSize={false}
                                   quotesOnKeys={false}
                        />)
                },
                {
                    title: 'Komplett kafka melding',
                    render: rowData => (
                        <ReactJson src={rowData.vurdering} collapsed={true}
                                   enableClipboard={false}
                                   displayDataTypes={false}
                                   displayObjectSize={false}
                                   quotesOnKeys={false}
                        />)
                },
            ]}
            data={p.data}
            options={{
                filtering: true,
                paging: false,
            }}
        />
    )
}
