export interface VurderingWrapper{
    fnr: string,
    opprettet: string,
    vurdering: Vurdering
}

export interface Vurdering{
    fodselsnummer: string,
    id: string,
    kilde: string,
    lovverk: string,
    lovverksversjon: string,
    paragraf: string,
    ledd?: number,
    bokstav?: string,
    punktum?: number,
    sporing: Map<string,string[]>,
    tidsstempel: string,
    utfall: string,
    versjonAvKode: string,
    input: Map<String,any>
    output?: Map<String,any>
}
