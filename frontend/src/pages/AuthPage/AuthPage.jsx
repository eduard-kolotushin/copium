import React, { useEffect } from 'react'

import { useAuth } from '../../hooks/useAuth'

import FullscreenLoading from '../../components/FullscreenLoading/FullscreenLoading'


const Auth = () => {
    const auth = useAuth()

    useEffect(() =>
        auth(),
        [])

    return (
        <FullscreenLoading/>
    )
}

export default Auth