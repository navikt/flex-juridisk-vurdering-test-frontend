import jsonschema from 'jsonschema'

import { Vurdering } from '../../types/vurdering'

const validator = new jsonschema.Validator()

export function validerSkjema(vurdering: Vurdering) {
    return validator.validate(vurdering, skjema)
}


const skjema = {
    '$schema': 'http://json-schema.org/draft-07/schema#',
    'title': 'Subsumsjonsmelding for område helse',
    'description': 'Beskrivelse av format for meldinger for Subsumsjon på topic tbd.etterlevelse',
    'required': [
        'id',
        'versjon',
        'eventName',
        'kilde',
        'fodselsnummer',
        'sporing',
        'tidsstempel',
        'lovverk',
        'lovverksversjon',
        'paragraf',
        'input',
        'utfall',
        'versjonAvKode'
    ],
    'type': 'object',
    'additionalProperties': false,
    'properties': {
        'id': {
            'type': 'string',
            'format': 'uuid'
        },
        'versjon': {
            'type': 'string',
            'description': 'Versjon av Subsumsjonsmelding',
            'enum': [ '1.0.0' ]
        },
        'eventName': {
            'type': 'string',
            'description': 'Entydig identifikator på at det er en Subsumsjonsmelding',
            'enum': [ 'subsumsjon' ]
        },
        'kilde': {
            '$ref': '#/definitions/gyldigString'
        },
        'versjonAvKode': {
            'type': 'string',
            'format': 'uri-reference'
        },
        'sporing': {
            'type': 'object',
            'minProperties': 1,
            'additionalProperties': false,
            'properties': {
                'organisasjonsnummer': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'soknad': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'sykmelding': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'vedtaksperiode': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'inntektsmelding': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'utbetaling': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
            }
        },
        'tidsstempel': {
            'type': 'string',
            'format': 'date-time'
        },
        'lovverk': {
            'type': 'string',
            'enum': [ 'folketrygdloven' ]
        },
        'lovverksversjon': {
            'type': 'string',
            'format': 'date'
        },
        'paragraf': {
            '$ref': '#/definitions/paragraf'
        },
        'ledd': {
            'type': [ 'number', 'null' ],
            'minimum': 1
        },
        'punktum': {
            'type': [ 'number', 'null' ],
            'minimum': 1
        },
        'bokstav': {
            '$ref': '#/definitions/bokstav'
        },
        'fodselsnummer': {
            'type': 'string',
            'pattern': '^[0-9]{11}$'
        },
        'input': {
            'type': 'object',
            'minProperties': 1
        },
        'output': {
            'type': 'object'

        },
        'utfall': {
            'type': 'string',
            'enum': [ 'VILKAR_OPPFYLT', 'VILKAR_IKKE_OPPFYLT', 'VILKAR_UAVKLART', 'VILKAR_BEREGNET' ]
        }
    },
    'definitions': {
        'gyldigString': {
            'type': 'string',
            'minLength': 1,
            'pattern': '^[A-ZÆØÅa-zæøå0-9-_.§]+(?: +[A-ZÆØÅa-zæøå0-9-_.§]+)*$'

        },
        'paragraf': {
            'type': 'string',
            'oneOf': [ {
                'pattern': '^[0-9]{1,}-[0-9]{1,}$'
            }, {
                'pattern': '^[0-9]{1,}$'
            } ]
        },
        'bokstav': {
            'type': [ 'string', 'null' ],
            'pattern': '^[a-zæøå]{1}$'
        }
    }
}
