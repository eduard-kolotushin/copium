import React, { useState } from 'react'
import { Box, ListItem, ListItemButton, Typography } from '@mui/material'
import DocumentScheme from './DocumentScheme'

const Document = ({ doc }) => {

  const [isShowSetting, setIsShowSetting] = useState(false)

  return (
    <>
      {isShowSetting && <DocumentScheme doc={doc} isShowSetting={isShowSetting} onClose={() => setIsShowSetting(false)}/>}
      <ListItemButton onClick={() => setIsShowSetting(true)} sx={{ px: '24px', py: '18px' }}>
        <Box width={1}>
            <Typography variant='h6' fontWeight={'bold'}>{doc.label}</Typography>
            <Typography variant='body'>{doc.description}</Typography>
        </Box>
      </ListItemButton>
    </>
  )
}

export default Document