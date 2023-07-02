import React from 'react'
import { Dialog, DialogContent, Stack } from '@mui/material'

const ResponsivePanel = ({ children, gr_xs }) => {

    if(gr_xs){
        return(
            // <Stack width={'450px'} height={1} pr={'24px'} flexShrink={0}>
            //     {children}
            // </Stack>
            <Dialog open maxWidth='sm'>
                <DialogContent>
                    <Stack flexDirection={'column'}>
                        {children}
                    </Stack>
                </DialogContent>
            </Dialog>
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