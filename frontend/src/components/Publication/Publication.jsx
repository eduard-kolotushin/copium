import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDeletePublicationMutation } from '../../redux/servicePublications'

import {
    Stack,
    Typography,
    IconButton,
    Divider,
    useMediaQuery,
    Fab,
    ListItem,
    ListItemButton,
    Box,
    Link,
    CssBaseline
} from '@mui/material'

import { showErrorAlert } from '../../redux/alertSlice'
import { schemePublications } from '../../schemes/schemePublications'
import DialogConfirm from './DialogConfirm'
import Databases from './Databases'
import InputCheck from '../InputCheck/InputCheck'

import ShowElement from '../../hoc/ShowElement'

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useDispatch } from 'react-redux'


const Buttons = ({ isLoading, handlerEdit, handlerDelete }) => {

    const l_xl = useMediaQuery('(max-width:1536px)')

    return (
        <Stack flexShrink={0} direction={'row'} spacing={2} alignItems={'center'}>
            <Fab disabled={isLoading} variant={"circled"} color="primary" size="medium" aria-label="edit" onClick={handlerEdit}>
                <ModeEditOutlineOutlinedIcon />
            </Fab>
            <Fab disabled={isLoading} variant={"circled"} color="error" size='medium' aria-label="delete" onClick={handlerDelete}>
                <DeleteOutlineOutlinedIcon />
            </Fab>
        </Stack>
    )
}

const Publication = ({ publication: {
    id,
    p_type,
    title,
    authors,
    journal,
    date,
    doi,
    rinc_id,
    web_of_science_id,
    astrophysics_data_system_id,
    mathscinet_id,
    zbmath_id,
    chemical_abstaracts_id,
    springer_id,
    agris_id,
    scopus_id,
    pubmed_id,
    edn_id,
} }) => {

    const gr_xs = useMediaQuery('(min-width:1200px)')
    const dispatch = useDispatch()

    const { control } = useForm()

    const [deletePublication, { isLoading, isError, error }] = useDeletePublicationMutation()

    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    if (isError) {
        dispatch(showErrorAlert(`Публикация не удалена! ${error}`))
    }

    return (
        <>
            <ShowElement isVisible={isOpenDialogConfirm}>
                <DialogConfirm title={title} id={id} deletePublication={deletePublication} setIsOpenDialogConfirm={setIsOpenDialogConfirm} />
            </ShowElement>
            <ListItem disablePadding disableGutters>
                <ListItemButton disableRipple={gr_xs}
                    alignItems='flex-start'
                    onClick={() => !gr_xs ? setIsExpanded(prev => !prev) : null}
                    disableGutters
                    sx={gr_xs ? {
                        '&:hover': { backgroundColor: 'transparent' },
                        cursor: 'auto',
                        userSelect: 'auto'
                    } : null}>
                    <Stack direction={'column'}>
                        <ShowElement isVisible={gr_xs}>
                            <IconButton size='large' onClick={() => setIsExpanded(prev => !prev)}>
                                {!isExpanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                            </IconButton>
                        </ShowElement>
                        <InputCheck control={control} name={`article-${id}`}/>
                    </Stack>
                    <Stack direction={'row'} width={1}>
                        <Stack flexDirection='column' width={1} px={'12px'}>
                            <Typography variant='overline' color='#9C9C9C'>{schemePublications.find(el => el.p_type === p_type)?.title || 'Тип не определен'}</Typography>
                            <span>
                                <Typography display={'inline'} variant='overline'>{journal || 'Неопознано'}</Typography>
                                <Typography display={'inline'} variant='overline'>{` | Опубликовано ${(new Date(date)).toLocaleDateString()} | `}</Typography>
                            </span>
                            <Typography variant='body1' fontWeight='bold'>{title}</Typography>
                            <Typography variant='body2' fontStyle='italic'>{authors.join(', ')}</Typography>
                            <Link href={`https://doi.org/${doi}`} underline='none'>
                                {doi}
                            </Link>
                            <ShowElement isVisible={isExpanded && date}>
                                <Box display={'flex'} justifyContent={'space-between'}>
                                    <Typography variant='body2'>
                                        {`Дата публикации: ${(new Date(date)).toLocaleDateString()}`}
                                    </Typography>
                                </Box>
                            </ShowElement>
                            <Databases databases_ids={{
                                rinc_id,
                                web_of_science_id,
                                astrophysics_data_system_id,
                                mathscinet_id,
                                zbmath_id,
                                chemical_abstaracts_id,
                                springer_id,
                                agris_id,
                                scopus_id,
                                pubmed_id,
                                edn_id,
                            }}/>
                        </Stack>
                        <Buttons isLoading={isLoading} handlerDelete={() => setIsOpenDialogConfirm(true)} handlerEdit={null} />
                    </Stack>
                </ListItemButton>
            </ListItem>
            <Divider/>
        </>
    )
}

export default Publication
