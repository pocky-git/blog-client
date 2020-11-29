import { useState } from 'react'
import Router from 'next/router'
import { Spin } from 'antd'

import '../styles/components/loading.less'

const Loading = () => {
    const [loading, setLoading] = useState(false)

    Router.events.on('routeChangeStart', () => {
        setLoading(true)
    })
    Router.events.on('routeChangeComplete', () => {
        setLoading(false)
    })
    return (
        <Spin 
            spinning={loading} 
            className="loading"
        />
    )
}

export default Loading