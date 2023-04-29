import React, { useEffect } from 'react'
import { useGetPublicationsQuery } from '../../redux/servicePublications'
import { schemePublications } from '../../schemes/schemePublications'

const Filter = () => {
  
  const { data, isLoading } = useGetPublicationsQuery()

  useEffect(() => {
    let properties = []
    console.log(data)

    if(data)
    {
      for(let i = 0; i < data.length; i++){
        const pub = data[i]
        console.log(pub)
        for(var prop in pub){
          console.log(prop)
          if(!properties.find(el => el == prop)){
            properties.push(prop)
          }
        }
      }
    }
  
    console.log(properties)
  }, [isLoading])

  return (
    <></>
  )
}

export default Filter