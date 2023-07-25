import React, { useEffect, useMemo, useRef, useState } from "react"
import { 
    Box, 
    TextField, 
    Typography, 
    useEventCallback
} from "@mui/material"

import InputDate from "../InputDate/InputDate"
import { useController, useWatch } from "react-hook-form"
import dayjs from "dayjs"

const InputDateRange = ({ control, name, label, rules: rulesProp, disabled, ...props }) => {

    const from = useWatch({
        control,
        name: `${name}.from`
    })

    const rules = useMemo(() => {

        if(typeof(rulesProp) === 'object'){
            return { from: rulesProp, to: rulesProp}
        }
        else return rulesProp
    }, [])

    return(
        <Box display={'flex'} alignItems={'center'} width={1}>
            <InputDate control={control} name={`${name}.from`} rules={rules?.from} label={label?.from} sx={{ flexGrow: 1 }} disabled={disabled} {...props}/>
            <Typography variant="h5" mx={'12px'} disabled={disabled}>-</Typography>
            <InputDate control={control} name={`${name}.to`} minDate={dayjs(from)} rules={rules?.to} label={label?.to} sx={{ flexGrow: 1 }} disabled={disabled} {...props}/>
        </Box>
    )
}

export default InputDateRange