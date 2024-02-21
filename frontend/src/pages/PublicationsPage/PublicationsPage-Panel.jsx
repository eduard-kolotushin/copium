import React, { useMemo, useState } from 'react'
import { Button, Container, Divider, Paper, Stack, Typography } from '@mui/material'

import { useGetPublicationsQuery } from '../../redux/servicePublications'

import ShowElement from '../../hoc/ShowElement'
import FilterTags from './PublicationsPage-Panel-FilterTags'
import PublicationsPanel from '../../components/PublicationsPanel/PublicationsPanel'

import SortIcon from '@mui/icons-material/Sort'
import { useFilter } from '../../hooks/useFilter'

const Panel = () => {

    const { data = [], ...others} = useGetPublicationsQuery()
    const { articles, isInitialState } = useFilter(data)

    const [sortType, setSortType] = useState(0)

    const label = useMemo(() => {
      switch(sortType){
        case 0:
          return 'Сначала новые'
        case 1:
          return 'Сначала старые'
      }
    }, [sortType])

    return (
    <Paper sx={{ height: 1 }}>
        <Container variant='inner'>
            <FilterTags/>
            <Stack direction={'row'} width={1} spacing={3} justifyContent={'space-between'} py={'8px'} boxSizing={'border-box'} alignItems={'center'}>
                <Typography fontWeight={'bold'}>{`Найдено публикаций (${articles.length})`}</Typography>
                <Button variant='text' color='inherit' size='small' sx={{ flexShrink: 0 }} endIcon={<SortIcon/>}>
                    { label }
                </Button>
            </Stack>
            <Stack height={1} width={1} direction={'row'} spacing={2} sx={{ overflowX: 'hidden' }} divider={<Divider orientation="vertical" flexItem />}>
                <PublicationsPanel articles={articles} isInitialState={isInitialState} {...others}/>
            </Stack>
        </Container>
    </Paper>
    )
}

export default Panel