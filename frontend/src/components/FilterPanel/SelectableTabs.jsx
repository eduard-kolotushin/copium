import React, { useState, useRef, useEffect } from "react"
import { useController } from "react-hook-form"
import { 
  Box, 
  Chip, 
  IconButton, 
  Stack 
} from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"

const SelectableTabs = ({ name, control, options, children, width, spacing }) => {

  const OFFSET = 300
  const DELTA_OFFSET = 2

  const { field: { onChange }, formState: { defaultValues } } = useController({
    control,
    name,
  })

  const [chosen, setChosen] = useState(defaultValues[name].map(option => options.findIndex(el => el.value === option.value && el.label === option.label)))

  const containerRef = useRef()

  const [isShowLeftButton, setIsShowLeftButton] = useState(true)
  const [isShowRightButton, setIsShowRightButton] = useState(true)

  const changeVisibleButtons = () => {
    const cw = containerRef.current?.clientWidth
    const sw = containerRef.current?.scrollWidth
    const sl = containerRef.current?.scrollLeft

    setIsShowLeftButton(sl >= DELTA_OFFSET && cw <= sw)
    setIsShowRightButton(sw - sl - cw >= DELTA_OFFSET && cw <= sw)
  }

  useEffect(() => {
    window.addEventListener('resize', changeVisibleButtons)
    containerRef.current.addEventListener('scroll', changeVisibleButtons)

    return () => window.removeEventListener('resize', changeVisibleButtons)
  }, [])

  useEffect(() => {
    changeVisibleButtons()
  },[containerRef.current])

  const MoveButton = ({ isShow, direction }) => {

    const handlerClick = () => {
      const k = (() => {
        switch(direction){
          case 'right': return 1
          case 'left': return -1
          default: return 0
        }
      })()

      const container = containerRef.current
      container.scrollTo({
        left: container.scrollLeft + k * OFFSET,
        behaviour: 'smooth'
      })
    }

    return(
      <>
      {isShow &&
        <IconButton size={'small'} onClick={handlerClick}>
          {direction === 'left' ? <ChevronLeft/> : null}
          {direction === 'right' ? <ChevronRight/> : null}
        </IconButton>
      }
      </>
    )
  }

  return(
    <Box width={width || 1}>
      <Box display='flex' alignItems={'center'}>
        <MoveButton isShow={isShowLeftButton} direction={'left'}/>
        <Box display={'inline-block'} flex={[1,1,'auto']} overflow={['scroll', 'hidden']} sx={{ '&::-webkit-scrollbar': { display: 'none' } } } ref={containerRef}>
          <Stack direction={'row'} spacing={spacing || 1}>
            {options.map((option, id) => (
              <Chip key={id} label={option.label} size='medium' color={chosen?.includes(id) ? 'primary' : 'default'} onClick={() => {
                let arr = [...chosen]
                arr?.includes(id) ? arr.splice(arr.indexOf(id), 1) : arr.splice(0, 0, id)

                setChosen(arr)
                onChange(arr.map(indexChosen => options[indexChosen]))
              }}/>
            ))}
          </Stack>
        </Box>
        <MoveButton isShow={isShowRightButton} direction={'right'}/>
      </Box>
    </Box>
  )
}

export default SelectableTabs