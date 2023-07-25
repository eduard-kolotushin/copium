import {
    singleItemFieldValueManager,
    singleItemValueManager,
} from '@mui/x-date-pickers/internals/utils/valueManagers'
import { 
    applyDefaultDate, 
    splitFieldInternalAndForwardedProps, 
    useDefaultDates, 
    useUtils, 
    validateDate 
} from "@mui/x-date-pickers/internals"
import { useEffect } from 'react'
import { useField } from '../hooks/useField'

  
const useDefaultizedDateField = (props) => {
    const utils = useUtils()
    const defaultDates = useDefaultDates()

    useEffect(() => console.log('utils', utils),[])

    return {
        ...props,
        disablePast: props.disablePast ?? false,
        disableFuture: props.disableFuture ?? false,
        format: props.format ?? utils.formats.keyboardDate,
        minDate: applyDefaultDate(utils, props.minDate, defaultDates.minDate),
        maxDate: applyDefaultDate(utils, props.maxDate, defaultDates.maxDate),
    }
}

export const useDateField = ({
    props: inProps,
    inputRef,
}) => {
    const props = useDefaultizedDateField(inProps)

    const { forwardedProps, internalProps } = splitFieldInternalAndForwardedProps(props, 'date')

    useEffect(() => {
        console.log('singleItemValueManager', singleItemValueManager)
        console.log('singleItemFieldValueManager', singleItemFieldValueManager)
    },[])

    return useField({
        inputRef,
        forwardedProps,
        internalProps,
        valueManager: singleItemValueManager,
        fieldValueManager: singleItemFieldValueManager,
        validator: validateDate,
        valueType: 'date',
    })
}