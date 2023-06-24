import { Dialog, Stack } from '@mui/material'
import React from 'react'

const ResponsivePanel = ({ children, gr_xs }) => {

    if(gr_xs){
        return(
            <Stack width={'450px'} height={1} pr={'24px'} flexShrink={0}>
                {children}
            </Stack>
        )
    }
    else{
        return(
            <Dialog open fullScreen sx={{ '& .MuiDialog-paper': {  maxHeight: 1 } }}>
                <Stack flexDirection={'column'} p={'12px'} height={'calc(100vh - 24px)'}>
                    {children}
                </Stack>
            </Dialog>
        )
    }
}

export default ResponsivePanel