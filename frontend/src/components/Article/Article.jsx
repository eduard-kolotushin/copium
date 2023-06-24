import React, { useState } from 'react'

import {
    Box,
    Stack,
    Typography,
    ButtonGroup,
    Button,
    Chip,
    IconButton,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    useMediaQuery,
    Fab,
    ListItem,
    ListItemButton
    } from '@mui/material'

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { ExpandLess } from '@mui/icons-material'
import { useDeletePublicationMutation } from '../../redux/servicePublications'
import { showErrorAlert } from '../../redux/alertSlice'
import { schemePublications } from '../../schemes/schemePublications'

const DialogConfirm = ({ title, id, deletePublication, setIsOpenDialogConfirm }) => {

    const handlerClickDelete = async () => {
        setIsOpenDialogConfirm(false)
        await deletePublication(id).unwrap()
    }

    const handlerClickBack = async () => {
        setIsOpenDialogConfirm(false)
    }

    return(
    <Dialog open scroll='paper'>
        <DialogTitle sx={{ textAlign: 'center' }}>Удаление публикации</DialogTitle>
        <DialogContent>
          <Stack sx={{ minWidth: '250px' }}>
            <DialogContentText>Вы уверены, что хотите удалить публикацию?</DialogContentText>
            {/* <Typography>Вы уверены, что хотите удалить публикацию?</Typography> */}
            <Typography fontWeight='bold'>{title}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlerClickBack()}>Отмена</Button>
          <Button onClick={() => handlerClickDelete()} color='error'>Удалить</Button>
        </DialogActions>
    </Dialog>
    )
  }

const Databases = ({ databases: { wos, scopus, rinc } }) => {
    const Database = ({ template: { color, label } }) => { return(<Chip label={label} size='small' sx={{ 
        backgroundColor: color,
        color: 'white'
        }}/>)}

    const databases = {
        scopus: { label: 'Scopus', color: '#e9711c' },
        wos: { label: 'WoS', color: '#5E33BF' },
        rinc: { label: 'РИНЦ', color: '#5674b9' },
    }

    return(
        <Stack direction='row' alignItems='center' spacing={1} mt='6px'>
            {wos && <Database template={databases.wos}/>}
            {scopus && <Database template={databases.scopus}/>}
            {rinc && <Database template={databases.rinc}/>}
        </Stack>
    )
}

const Buttons = ({ isLoading, handlerEdit, handlerDelete }) => {
    
    const l_xl = useMediaQuery('(max-width:1536px)')

    return(
        <Stack direction={'row'} spacing={2} pr={'28px'} mb={'auto'}>
            <Fab disabled={isLoading} variant={l_xl ? "circled" : "extended"} color="primary" size="medium" aria-label="edit" onClick={handlerEdit}>
                <ModeEditOutlineOutlinedIcon/>
                {l_xl ? null : "Изменить" }
            </Fab>
            <Fab disabled={isLoading} variant={l_xl ? "circled" : "extended"} color="error" size='medium' aria-label="delete" onClick={handlerDelete}>
                <DeleteOutlineOutlinedIcon/>
                {l_xl ? null : "Удалить"}
            </Fab>
        </Stack> 
    )

//     <ButtonGroup variant="outlined" aria-label="text button group">
//         <Button disabled={isLoading} size='medium' endIcon={<ModeEditOutlineOutlinedIcon/>}>Изменить</Button>
//         <Button disabled={isLoading} size='medium' endIcon={<DeleteOutlineOutlinedIcon/>} color='error' onClick={() => setIsOpenDialogConfirm(true)}>Удалить</Button>
//     </ButtonGroup>
}

const ExpandButton = ({ gr_xs, isExpanded, onClick }) => {

    if(gr_xs){
        return(
            <IconButton size='large' onClick={onClick}>
                { !isExpanded ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
            </IconButton>
        )
    }
    else return null
}

const Article = ({ publication: {
    p_type,
    title,
    authors,
    wos,
    scopus,
    rinc,
    date,
    id
} }) => {

    const gr_xs = useMediaQuery('(min-width:1200px)')

    const [ deletePublication, { isLoading, isError, error }] = useDeletePublicationMutation()

    const [isOpenDialogConfirm, setIsOpenDialogConfirm] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    if(isError){
        showErrorAlert(`Публикация не удалена! Ошибка: ${error}`)
    }

    return (
        <>
            { isOpenDialogConfirm && <DialogConfirm title={title} id={id} deletePublication={deletePublication} setIsOpenDialogConfirm={setIsOpenDialogConfirm}/>}
            <ListItem disablePadding disableGutters secondaryAction={
                <Buttons isLoading={isLoading} handlerDelete={() => setIsOpenDialogConfirm(true)} handlerEdit={null}/>
                }>
                <ListItemButton disableRipple={gr_xs} 
                    alignItems='flex-start' 
                    onClick={() => !gr_xs ? setIsExpanded(prev => !prev) : null} 
                    sx={gr_xs ? {
                        '&:hover': { backgroundColor: 'transparent' },
                        cursor: 'auto',
                        userSelect: 'auto'  
                    } : null}>
                    <ExpandButton gr_xs={gr_xs} isExpanded={isExpanded} onClick={() => setIsExpanded(prev => !prev)}/>
                    <Stack flexDirection='column' width={1} px={'12px'}>
                        <Typography variant='overline' color='#9C9C9C'>{schemePublications.find(el => el.p_type === p_type )?.title || 'Тип не определен'}</Typography> 
                        <Typography variant='body1' fontWeight='bold'>{title}</Typography>
                        <Typography variant='body2' fontStyle='italic'>{authors.join(', ')}</Typography>
                        { (isExpanded && date) && 
                            <Typography variant='body2'>
                                {`Дата публикации: ${(new Date(date)).toLocaleDateString()}`}
                            </Typography>}
                        <Databases databases={{ wos, scopus, rinc }}/>
                    </Stack>
                    
                </ListItemButton>
            </ListItem>
            <Divider variant="middle"/>
        </>
    )

    // return (
    //     <>
    //         { isOpenDialogConfirm && <DialogConfirm title={title} id={id} deletePublication={deletePublication} setIsOpenDialogConfirm={setIsOpenDialogConfirm}/>}
    //         <Box sx={{ px: '24px', py:'12px' }}>
    //             <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ 
    //                 width: 1
    //                 }}>
    //                 <Stack direction='row' spacing={1}>
    //                     <ExpandButton isExpanded={isExpanded} onClick={() => setIsExpanded(prev => !prev)}/>
    //                     <Stack flexDirection='column'>
    //                         <Typography variant='overline' color='#9C9C9C'>{p_type}</Typography> 
    //                         <Typography variant='body1' fontWeight='bold' sx={{ py: '4px'}}>{title}</Typography>
    //                         <Typography variant='body2' sx={{ py: '4px'}}>{authors.join(', ')}</Typography>
    //                         { (isExpanded && date) && <Typography variant='body2' sx={{ py: '4px'}}>
    //                             {['Дата публикации:', (new Date(date)).toLocaleDateString()].join(' ')}
    //                             </Typography>}
    //                         <Databases databases={{ wos, scopus, rinc }}/>
    //                     </Stack>
    //                 </Stack>
    //                 <Box>
    //                     <Buttons isLoading={isLoading} handlerDelete={() => setIsOpenDialogConfirm(true)} handlerEdit={null}/>
    //                 </Box>
    //             </Stack>
    //             <Divider/>
    //         </Box>
    //     </>
    // )
}

export default Article
