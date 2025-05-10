import Auth from './auth'
import HomePage from './home'
import searchpage from './search'
import { useState } from 'react'

function News({buttons, setButton}) {
    return (
        <>
            {buttons ? (
                <Auth setButton={setButton}/>
            ) : null}

        </>
    )
}

export default News