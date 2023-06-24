import React from "react"
import { Box, Typography } from "@mui/material"

import InputDate from "../InputDate/InputDate"

const InputDateRange = ({ control, name }) => {

    return(
        <Box display={'flex'} alignItems={'center'} width={1}>
            <InputDate control={control} name={`${name}.from`} sx={{ flexGrow: 1 }}/>
            <Typography variant="h5" mx={'12px'}>-</Typography>
            <InputDate control={control} name={`${name}.to`} sx={{ flexGrow: 1 }}/>
        </Box>
    )
}

export default InputDateRange