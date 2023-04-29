import React, { useRef } from "react"

export function useBeforeFirstRender(callback){
    const isCompleted = useRef(false)

    if(!isCompleted.current){
        callback()
        isCompleted.current = true
    }
}