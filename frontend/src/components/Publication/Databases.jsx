import React, { useMemo } from 'react'

import {
    Stack,
    Chip,
    Tooltip
    } from '@mui/material'
import { scheme } from '../../schemes/schemeDatabases'


const Database = ({ template: { color, label, tooltip } }) => {
    return(
        <Tooltip title={tooltip} arrow>
            <Chip label={label} size='small' sx={{ 
            backgroundColor: color,
            color: 'white'
            }}/>
        </Tooltip>
    )
}

const Databases = ({ databases_ids }) => {

    const existingDatabases = useMemo(() => {
        let mas = []
        
        switch(true){
            case databases_ids.rinc: {
                mas.push(scheme.rinc)
            }
            case databases_ids.web_of_science_id: {
                mas.push(scheme.web_of_science)
            }
            case databases_ids.astrophysics_data_system_id: {
                mas.push(scheme.astrophysics_data_system)
            }
            case databases_ids.zbmath_id: {
                mas.push(scheme.zbmath)
            }
            case databases_ids.chemical_abstaracts_id: {
                mas.push(scheme.chemical_abstracts)
            }
            case databases_ids.springer_id: {
                mas.push(scheme.springer)
            }
            case databases_ids.agris_id: {
                mas.push(scheme.agris)
            }
            case databases_ids.agris_id: {
                mas.push(scheme.agris)
            }
            case databases_ids.scopus_id: {
                mas.push(scheme.scopus)
            }
            case databases_ids.pubmed_id: {
                mas.push(scheme.pubmed)
            }
            case databases_ids.edn_id: {
                mas.push(scheme.edn)
            }
        }

        return mas.reverse()
    }, [databases_ids])

    return(
        <Stack direction='row' alignItems='center' spacing={1} mt='6px'>
            {existingDatabases.map((db, ind) => (<Database key={`db-${ind}`} template={db}/>))}
            {/* {web_of_science_id && <Database template={databases.wos}/>}
            {scopus && <Database template={databases.scopus}/>}
            {rinc && <Database template={databases.rinc}/>} */}
        </Stack>
    )
}

export default Databases