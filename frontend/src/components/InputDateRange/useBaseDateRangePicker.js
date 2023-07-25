import { useEffect, useRef, useState } from "react"
import CustomDay from './CustomDay'
import dayjs from "dayjs"
import CustomTextField from "./CustomTextField"
import { useEventCallback } from "@mui/material"
import DateRangeIcon from '@mui/icons-material/DateRange'

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

export function useBaseDateRangePicker({ value, onChange }){

    const { from, to } = value

    const [isOpen, setIsOpen] = useState(false)
    const [isSelectionFrom, setIsSelectionFrom] = useState(true)

    const [indexSection, setIndexSection] = useState(0)

    const inputRef = useRef(null)

    useEffect(() => {
        // inputRef.current.setSelectionRange(sections[indexSection].start, sections[indexSection].end)
    }, [indexSection])

    const setNextSection = () => {
        indexSection === sections.length - 1 ? setIndexSection(0) : setIndexSection(indexSection + 1)
    }

    const setPreviewSection = () => {
        indexSection === 0 ? setIndexSection(sections.length - 1) : setIndexSection(indexSection - 1)
    }

    const handleCalendarChange = useEventCallback((v) => {

        const new_v = dayjs(v).format('YYYY-MM-DD')

        isSelectionFrom ?  onChange({ from: new_v, to }) : onChange({ from, to: new_v })

        !isSelectionFrom && setIsOpen(false)

        setIsSelectionFrom(!isSelectionFrom)
    })

    const handleInputClick = useEventCallback((event) => {

        const selectionStart = event.target.selectionStart

        let ind = indexSection

        sections.forEach((section, index) => selectionStart >= section.start && selectionStart <= section.end ? ind = index : null)

        setIndexSection(ind)
    })

    const handleInputChange = useEventCallback((__, event) => {

    })

    const handleInputKeyDown = useEventCallback((event) => {
        event.preventDefault()

        if(event.key === 'ArrowRight') setNextSection()
        if(event.key === 'ArrowLeft') setPreviewSection()
    })

    const handleDesktopChange = useEventCallback((v, event) => {

        isOpen ? handleCalendarChange(v, event) : handleInputChange(v, event)
    })

    const handleMobileChange = useEventCallback((v, event) => {
        handleCalendarChange(v, event)
    })

    const base = {
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        closeOnSelect: false,
        open: isOpen,
    }

    return {
        inputRef,
        desktop: {
            ...base,
            onChange: handleDesktopChange,
            slots: {
                day: CustomDay,
                textField: CustomTextField,
                openPickerIcon: DateRangeIcon
            },
            slotProps: {
                day: {
                    from,
                    to
                },
                textField: (ps) => {
                    const newProps = {
                        ...ps,
                        onChange: handleInputChange,
                        onClick: handleInputClick,
                        onKeyDown: handleInputKeyDown,
                        value: `${from} - ${to}`,
                        from,
                        to
                    }
                    return newProps
                }
            }
        },
        mobile: {
            ...base,
            onChange: handleMobileChange,
            slots: {
                day: CustomDay,
                textField: CustomTextField,
                openPickerIcon: DateRangeIcon
            },
            slotProps: {
                day: {
                    from,
                    to
                },
                actionBar: {
                    actions: []
                },
                textField: {
                    from,
                    to
                }
            }
        },
    }
}