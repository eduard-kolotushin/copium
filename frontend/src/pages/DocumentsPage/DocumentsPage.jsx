import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Box } from '@mui/material'

import Search from '../../components/Search/Search'
import useDocuments from '../../hooks/useDocuments'
import DocumentsPanel from '../../components/Documents/DocumentsPanel'
import CircleLoading from '../../components/CircleLoading/CircleLoading'

// const documents = [
//     {
//         label: 'Экспертное заключение',
//         description: 'Форма экспертного заключения. Должна быть подписана тремя экспертами из установленного институтом списка.',
//     },
//     {
//         label: 'Экспортное заключение',
//         description: 'Форма экспортного заключения. Должна быть подписана тремя экспертами экспотрного контроля из установленного институтом списка.',
//     },
//     {
//         label: 'Заявление на отпуск',
//         description: 'Форма заявления на отпуск.',
//     }
// ]

const Documents = () => {

    const { data: documents, isLoading } = useDocuments()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            search: ''
        }
    })

    const [filteredDocuments, setFilteredDocuments] = useState(documents)

    useEffect(() => {
        updateFilteredDocuments()
    }, [documents])

    const isNeccessaryDocument = (doc, substring) => {
        return doc.label.toLowerCase().includes(substring.toLowerCase()) || doc.description.toLowerCase().includes(substring.toLowerCase())
    }

    const updateFilteredDocuments = (data) => {
        setFilteredDocuments(documents.filter(doc => isNeccessaryDocument(doc, data?.search || ''))) 
    }

    return (
    <Box width={1}>
        <form onBlur={handleSubmit(updateFilteredDocuments)} onSubmit={handleSubmit(updateFilteredDocuments)} style={{ width: '100%' }}>
            <Search name={'search'} control={control} disabled={isLoading} placeholder={'Введите ключевое слово или фразу...'} sx={{ width: 1, py: '12px', px: '12px' }}/>
        </form>
        {
            isLoading 
            ?
            <CircleLoading/>
            :
            <DocumentsPanel filteredDocuments={filteredDocuments}/>
        }
    </Box>
    )
}

export default Documents
