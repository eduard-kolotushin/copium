import React, { useState } from "react"
import { useController } from "react-hook-form"
import { 
    Box,
    Chip,
    Stack
 } from "@mui/material"

const BooleanTabs = ({ name, control, children, width, spacing }) => {
  
  const tabs = [
    { value: null, label: 'Не учитывать' },
    { value: true, label: 'Да' },
    { value: false, label: 'Нет' }
  ]

  const { field: { onChange }, formState: { defaultValues }} = useController({
    control,
    name
  })

  const [chosen, setChosen] = useState(tabs.indexOf(tabs.find(tab => tab.value === defaultValues[name])))

  return(
    <Box display={'flex'} width={width || 1} alignItems={'center'}>
      <Stack direction={'row'} spacing={spacing || 1}>
        {tabs.map((tab, id) => (
          <Chip key={id} label={tab.label} size='medium' color={chosen === id ? 'primary' : 'default'} onClick={() => {
            setChosen(id)
            onChange(tab.value)
          }}/>
        ))}
      </Stack>
    </Box>
  )
}

export default BooleanTabs