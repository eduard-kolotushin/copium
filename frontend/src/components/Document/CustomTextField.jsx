import React, { useEffect, useState } from 'react'
import { TextField, useEventCallback, useThemeProps } from '@mui/material'
import { useSlotProps } from '@mui/base/utils'
import MuiTextField from '@mui/material/TextField'
import { useDateField } from '@mui/x-date-pickers/DateField/useDateField'

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

const CustomTextField = React.forwardRef(( inProps, ref ) => {

    const themeProps = useThemeProps({
        props: inProps,
        name: 'MuiDateField'
    })

    const { components, componentsProps, slots, slotProps, InputProps, inputProps, ...other } = themeProps;

    const ownerState = themeProps

    const TextField = slots?.textField ?? components?.TextField ?? MuiTextField
    const { inputRef: externalInputRef, ...textFieldProps } = useSlotProps({
      elementType: TextField,
      externalSlotProps: slotProps?.textField ?? componentsProps?.textField,
      externalForwardedProps: other,
      ownerState,
    })

    textFieldProps.inputProps = { ...textFieldProps.inputProps, ...inputProps }
    textFieldProps.InputProps = { ...textFieldProps.InputProps, ...InputProps }

    const {
        ref: inputRef,
        onPaste,
        onKeyDown,
        inputMode,
        readOnly,
        ...fieldProps
    } = useDateField({
        props: textFieldProps,
        inputRef: externalInputRef,
      })

    useEffect(() => {
        console.log('fieldProps', fieldProps)
    }, [])

    return (
        <TextField
            ref={ref}
            {...fieldProps}
            InputProps={{ ...fieldProps.InputProps, readOnly }}
            inputProps={{ ...fieldProps.inputProps, inputMode, onPaste, onKeyDown, ref: inputRef }}
        />
    );

    // const [value, setValue] = useState('18.12.2021 - 20.12.2021')

    // const [indexSection, setIndexSection] = useState(0)

    // const setNextSection = () => {
    //     indexSection === sections.length - 1 ? setIndexSection(0) : setIndexSection(indexSection + 1)
    // }

    // const setPreviewSection = () => {
    //     indexSection === 0 ? setIndexSection(sections.length - 1) : setIndexSection(indexSection - 1)
    // }

    // const handleInputClick = useEventCallback((event) => {

    //     const selectionStart = event.target.selectionStart

    //     let ind = 0

    //     sections.forEach((section, index) => selectionStart >= section.start && selectionStart <= section.end ? ind = index : null)

    //     console.log('click', ind)

    //     setIndexSection(ind)

    //     event.target.setSelectionRange(sections[ind].start, sections[ind].end)
    // })

    // const handleInputMouseUp = (event) => {
    //     event.preventDefault()
    // }

    // const handleInputChange = useEventCallback((event) => {

    // })

    // const handleInputKeyDown = useEventCallback((event) => {
    //     event.preventDefault()

    //     if(event.key === 'ArrowRight') setNextSection()
    //     if(event.key === 'ArrowLeft') setPreviewSection()
    // })

    // return(
    //     <TextField value={value} onChange={(event) => setValue(event.target.value)} label={'hi'} {...props} inputProps={{
    //         onClick: handleInputClick,
    //         onKeyDown: handleInputKeyDown,
    //         onMouseUp: handleInputMouseUp
    //     }}
    //     ref={ref}
    //     />
    // )
})

export default CustomTextField