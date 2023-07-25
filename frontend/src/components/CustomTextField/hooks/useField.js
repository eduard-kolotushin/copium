import { useEffect, useMemo, useRef } from "react"
import { useUtils, getActiveElement } from "@mui/x-date-pickers/internals"
import { useEventCallback, useForkRef, useTheme } from "@mui/material"
import { useFieldState } from '../hooks/useFieldState'

export const useField = (params) => {

    const {
        ref: inputRefProp,
    } = params

    const {
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
    } = useFieldState()

    const inputRef = useRef(null)
    const handleRef = useForkRef(inputRefProp, inputRef)

    useEffect(() => {
        if(!inputRef?.current){
            return;
        }

        if(indexSection !== null ){
            inputRef.current.setSelectionRange(currentSection.start, currentSection.end)
        }

        inputRef.current.value = valueStr

    }, [indexSection, valueStr])

    const handleInputClick = useEventCallback((event) => {

        const selectionStart = event.target.selectionStart

        const index = getIndexSectionFromCursor(selectionStart)

        initialCurrentSection(index)
    })

    const handleInputChange = useEventCallback((event) => {

        const lengthSection = currentSection.end - currentSection.start

        const value = event.target.value
        const inputStr = value[currentSection.start]
        const filler = (new Array(lengthSection - currentSection.inputedStr.length - 1)).fill('0').join('')
        const correctInputStr = [filler, inputStr].join('')
        const correctedValue = value.split('').toSpliced(currentSection.start, 1, correctInputStr).join('')

        console.log('value', value)
        console.log('inputStr', inputStr)
        console.log('filler', filler)
        console.log('correctInputStr', correctInputStr)
        console.log('correctedValue', correctedValue)

        setValueStr(correctedValue)
        addCharToInputedStr(inputStr)
    })

    const handleInputKeyDown = useEventCallback((event) => {
        const key = event.key

        switch(true){
            case key === 'ArrowRight': {
                event.preventDefault()
                setNextSection()
                initialCurrentSection()
                break;
            }
            case key === 'ArrowLeft': {
                event.preventDefault()
                setPreviewSection()
                initialCurrentSection()
                break;
            }
            case (key === 'a' && (event.ctrlKey || event.metaKey)) || ['ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(key): {
                event.preventDefault()
                break;
            }
        }
    })

    const handleInputMouseUp = useEventCallback((event) => {
        event.preventDefault()
    })

    const handleInputBlur = useEventCallback((event) => {
        event.preventDefault()

        setIndexSection(null)
    })

    return {
        onChange: handleInputChange,
        onClick: handleInputClick,
        onKeyDown: handleInputKeyDown,
        onBlur: handleInputBlur,
        onMouseUp: handleInputMouseUp,
        ref: handleRef
    }
}