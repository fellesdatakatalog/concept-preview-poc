import { PropsWithChildren } from "react"
import styles from "./conceptPreview.module.css"
import jsonld, { ContextDefinition } from "jsonld"
import { Frame } from "jsonld/jsonld-spec"

interface Props {
    fdkUrl: string,
    lang: string
}

const concept = {
    "@graph": [
        {
            "@id": "https://concept-catalog.staging.fellesdatakatalog.digdir.no/collections/910244132/concepts/4b41fe33-9b1a-43ae-832d-68d0edb22421/.well-known/skolem/10ed79a9-ab70-3ff8-8235-1ed29e30998f",
            "skosno:relationshipWithSource": {
                "@id": "https://data.norge.no/vocabulary/relationship-with-source-type#derived-from-source"
            },
            "dct:source": {
                "@id": "https://www.google.com/search?sxsrf=ALeKk03IBQGtNSEnwCRYkNr5uZQKfBgSNg%253A1586157427891&ei=c9eKXun7Nb6MwPAPnKid2AE&q=what+is+a+witcher&oq=what+is+a+witcher&gs_lcp=CgZwc3ktYWIQAzIECAAQQzIFCAAQywEyBAgAEEMyAggAMgIIADICCAAyAggAMgIIADICCAAyBAgAEAo6BAgAEEc6BAgjECc6BwgAEBQQhwJKJggXEiIwZzYxZzkxZzg4Zzc3ZzcxZzU5ZzYzZzYwZzY0ZzU0ZzYxShsIGBIXMGcxZzFnMWcxZzFnMWcxZzFnMWc2ZzNQ_ENYnlJg9FJoAHABeACAAViIAbkIkgECMTeYAQCgAQGqAQdnd3Mtd2l6&sclient=psy-ab&ved=0ahUKEwipgbDwoNPoAhU-BhAIHRxUBxsQ4dUDCAw&uact=5"
            },
            "rdf:value": [
                {
                    "@language": "en",
                    "@value": "witchers are beast hunters who develop supernatural abilities at a young age to battle wild beasts and monsters. "
                },
                {
                    "@language": "nb",
                    "@value": "witchers er monsterjegere som utvikler overnaturlige evner i ung alder for å bekjempe ville dyr og monstre. "
                },
            ],
            "@type": "http://publications.europa.eu/ontology/euvoc#XlNote"
        },
        {
            "@id": "https://concept-catalog.staging.fellesdatakatalog.digdir.no/collections/910244132/concepts/4b41fe33-9b1a-43ae-832d-68d0edb22421",
            "skos:definition": [
                { "@language": "nb", "@value": "Witcher er en monsterjeger som utvikler overnaturlige evner i ung alder for å bekjempe ville dyr og monstre. " },
                { "@language": "en", "@value": "Witcher is a monster hunter who develops supernatural abilities at a young age to battle wild beasts and monsters. " }
            ],
            "skos:prefLabel": [
                {
                    "@language": "nb",
                    "@value": "Witcher"
                },
                {
                    "@language": "en",
                    "@value": "Witcher"
                }
            ],
            "dct:publisher": {
                "@id": "https://data.brreg.no/enhetsregisteret/api/enheter/910244132"
            },
            "dct:modified": {
                "@value": "2020-04-06",
                "@type": "xsd:date"
            },
            "dct:identifier": "https://concept-catalog.staging.fellesdatakatalog.digdir.no/collections/910244132/concepts/4b41fe33-9b1a-43ae-832d-68d0edb22421",
            "http://publications.europa.eu/ontology/euvoc#xlDefinition": {
                "@id": "https://concept-catalog.staging.fellesdatakatalog.digdir.no/collections/910244132/concepts/4b41fe33-9b1a-43ae-832d-68d0edb22421/.well-known/skolem/10ed79a9-ab70-3ff8-8235-1ed29e30998f"
            },
            "http://publications.europa.eu/ontology/euvoc#status": {
                "@id": "http://publications.europa.eu/resource/authority/concept-status/CURRENT"
            },
            "@type": "skos:Concept"
        }
    ],
    "@context": {
        "schema": "http://schema.org/",
        "adms": "http://www.w3.org/ns/adms#",
        "iso": "http://iso.org/25012/2008/dataquality/",
        "spdx": "http://spdx.org/rdf/terms#",
        "owl": "http://www.w3.org/2002/07/owl#",
        "skosxl": "http://www.w3.org/2008/05/skos-xl#",
        "dqv": "http://www.w3.org/ns/dqv#",
        "skosno": "https://data.norge.no/vocabulary/skosno#",
        "xsd": "http://www.w3.org/2001/XMLSchema#",
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
        "vcard": "http://www.w3.org/2006/vcard/ns#",
        "xkos": "http://rdf-vocabulary.ddialliance.org/xkos#",
        "oa": "http://www.w3.org/ns/prov#",
        "dct": "http://purl.org/dc/terms/",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "dcat": "http://www.w3.org/ns/dcat#",
        "foaf": "http://xmlns.com/foaf/0.1/"
    }
}

async function getConcept(fdkUrl: string) {
    const header = { method: "GET", headers: { "Accept": "application/ld+json" } }
    const res = await fetch(fdkUrl, header)
    if (res.status !== 200) {
        throw new Error("Failed to fetch concept")
    }
    const concept = await res.json()
    console.log(concept)
    return concept
}

type LangMap = {
    [key: string]: string
}

function translate(langMap: LangMap, lang: string) {
    if (!langMap) return ""
    if (typeof langMap !== "object") {
        console.error(`langMap is not a object, is of type ${typeof langMap}. Cannot translate`)
        return ""
    }
    return langMap[lang] || ""
}

async function frameConcept(concept: any, frame: Frame): Promise<jsonld.NodeObject> {
    const framed = await jsonld.frame(concept, frame)
    return framed
}

const conceptFrame: Frame = {
    "@context": {
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "euvoc": "http://publications.europa.eu/ontology/euvoc#",
        "label": {
            "@id": "skos:prefLabel",
            "@container": "@language"
        },
        "directDefinition": {
            "@id": "skos:definition",
            "@container": "@language"
        }
    },
    "skos:prefLabel": { "@explicit": true },
    "skos:definition": { "@explicit": true },
}

const xlNoteFrame: Frame = {
    "@context": {
        "skos": "http://www.w3.org/2004/02/skos/core#",
        "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "euvoc": "http://publications.europa.eu/ontology/euvoc#",
        "xlDefinitionText": {
            "@id": "rdf:value",
            "@container": "@language",
        }
    },
    "rdf:value": { "@explicit": true },
}

async function getPrefLabel(framedConcept: any, lang: string = "nb") {
    const labelLanguageText = framedConcept["label"] as LangMap
    return translate(labelLanguageText, lang)
}

async function getDirectDefinition(framedConcept: any, lang: string = "nb") {
    const definitionLanguageText = framedConcept["directDefinition"] as LangMap
    return translate(definitionLanguageText, lang)
}

async function getXlDefinition(framedConcept: any, lang: string = "nb") {
    console.log(framedConcept)
    const xlDefinitionText = framedConcept["xlDefinitionText"] as LangMap
    console.log(xlDefinitionText)
    return translate(xlDefinitionText, lang)
}


export async function ConceptPreview({ fdkUrl, lang, children }: PropsWithChildren & Props) {
    //const concept = await getConcept(fdkUrl)
    const framedConcept = await frameConcept(await jsonld.expand(concept), conceptFrame)
    const conceptLabel = await getPrefLabel(framedConcept, lang)
    const conceptDirectDefinition = await getDirectDefinition(framedConcept, lang)
    const framedXlNote = await frameConcept(await jsonld.expand(concept), xlNoteFrame)
    const xlDefinition = await getXlDefinition(framedXlNote, lang)

    return (
        <div className={styles.conceptPreview}>
            {children}
            <p>Begrepsterm: {conceptLabel}</p>
            <p>Direkte definisjon: {conceptDirectDefinition}</p>
            <p>XL-definisjon: {xlDefinition}</p>
        </div>
    )
}

export default ConceptPreview
