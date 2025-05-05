import Auth from './auth'

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