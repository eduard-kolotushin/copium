import React from 'react'
import { Divider, List, Typography } from '@mui/material'
import Document from '../Document/Document'

const DocumentsPanel = ({ filteredDocuments }) => {

    if(filteredDocuments.length === 0) return(<Typography width={1} textAlign={'center'}>Документы не найдены.</Typography>)

    return (
        <List sx={{ width: 1, p: 0 }}>
            {filteredDocuments.map((doc, id) => (
            <div key={id}>
                <Document doc={doc}/>
                <Divider variant='middle'/>
            </div>
            ))}
        </List>
    )
}

export default DocumentsPanel