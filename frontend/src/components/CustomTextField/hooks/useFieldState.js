import { useCallback, useMemo, useState } from "react"

const sections = [
    {
        start: 0,
        end: 2
    },
    {
        start: 3,
        end: 5
    },
    {
        start: 6,
        end: 10
    },
    {
        start: 13,
        end: 15
    },
    {
        start: 16,
        end: 18
    },
    {
        start: 19,
        end: 23
    }
]

export const useFieldState = (props) => {

    const [valueStr, setValueStr] = useState('01.01.2023 - 02.01.2023')
    const [indexSection, setIndexSection] = useState(null)

    const [inputedStr, setInputedStr] = useState('')

    const currentSection = useMemo(() => {
        return { ...sections[indexSection], inputedStr }
    }, [indexSection, inputedStr])

    const initialCurrentSection = useCallback((index) => {
        setIndexSection(index)
        setInputedStr('')
    }, [])

    const lengthOfCurrentSection = useMemo((section) => {
        return currentSection.end - currentSection.start
    }, [currentSection])

    const addCharToInputedStr = useCallback((char) => {
        if(inputedStr.length === lengthOfCurrentSection)
        {
            setNextSection()
            return;
        }

        setInputedStr([inputedStr, char].join(''))

    }, [inputedStr, lengthOfCurrentSection])

    const setNextSection = () => {
        indexSection === sections.length - 1 ? setIndexSection(0) : setIndexSection(indexSection + 1)
    }

    const setPreviewSection = () => {
        indexSection === 0 ? setIndexSection(sections.length - 1) : setIndexSection(indexSection - 1)
    }

    const getIndexSectionFromCursor = useCallback((selectionStart) => {
        let ind = 0

        for(var index = 0; index < sections.length; index++){
            if(selectionStart >= sections[sections.length - 1].end){
                continue;
            }

            if(selectionStart >= sections[index].start && selectionStart <= sections[index].end){
                ind = index
            }
        }

        return ind
    }, [])

    return {
        currentSection,
        setNextSection,
        setPreviewSection,
        indexSection,
        setIndexSection,
        valueStr,
        setValueStr,
        getIndexSectionFromCursor,
        addCharToInputedStr,
        initialCurrentSection
    }
}