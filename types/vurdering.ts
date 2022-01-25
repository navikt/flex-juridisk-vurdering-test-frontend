export interface VurderingWrapper{
    fnr: string,
    opprettet: string,
    vurdering: Vurdering
}

export interface Vurdering{
    'fødselsnummer': string,
    '@id': string,
    '@kilde': string,
    lovverk: string,
    paragraf: string,
    sporing: Map<string,string>,
    tidsstempel: string,
    utfall: string,
    versjonAvKode: string,
    input: Map<String,any>
    output?: Map<String,any>
}
