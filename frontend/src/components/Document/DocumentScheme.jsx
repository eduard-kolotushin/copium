import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, MenuItem, Toolbar, Typography } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'

import InputSelect from '../../components/InputSelect/InputSelect'
import InputDate from '../InputDate/InputDate'
import InputDateRange from '../InputDateRange/InputDateRange'

const DocumentSchemeField = ({ control, field, ...props }) => {
    switch(field.type){
        case 'select':
            return(
                <InputSelect control={control} name={field.title} label={field.label} sx={{ width: 1 }} rules={{ required: 'Это поле обязательное' }} {...props}>
                    {field.options.map((option, id) => (
                        <MenuItem key={id} value={id}>{option}</MenuItem>
                    ))}
                </InputSelect>
            )

        case 'date':
            return(
                <InputDate control={control} name={field.title} label={field.label} sx={{ width: 1 }} rules={{ required: 'Это поле обязательное' }} {...props}/>
            )

        case 'date-range':
            return(
                <InputDateRange control={control} name={field.title} label={field.label} rules={{ required: 'Это поле обязательное' }} {...props}/>
            )

        default: return null
    }
}

const DocumentScheme = ({ isShowSetting, onClose, doc }) => {

    const defaultValues = useMemo(() => {
        let value = {}

        for(var index in doc.fields){
            value[doc.fields[index].title] = doc.fields[index].defaultValue
        }

        return value
    }, [])

    const { handleSubmit, control, formState: { isSubmitting } } = useForm({
        defaultValues: {...defaultValues }
    })

    const onSubmit = async (data) => {
        await (new Promise(resolve => setTimeout(resolve, 1000))).then()
        console.log('submitted')
    }

    return (
        <Dialog open={isShowSetting} maxWidth='sm' fullWidth>    
            <DialogContent>
                <Toolbar disableGutters>
                    <Box display={'flex'} flexGrow={1}>
                        <DialogTitle p={0} sx={{ p: 0 }}>
                            {doc.label}
                        </DialogTitle>
                    </Box>
                    <Box display={'flex'}>
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Toolbar>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <List>
                        {doc.fields.map(field => (
                            <ListItem key={field.title} sx={{ px: 0 }}>
                                <DocumentSchemeField control={control} field={field} disabled={isSubmitting}/>
                            </ListItem>
                        ))}
                    </List>

                    <Button fullWidth type='submit' variant='contained' disabled={isSubmitting}>
                        {isSubmitting ? 'Формирование документа...' : 'Сформировать документ'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DocumentScheme