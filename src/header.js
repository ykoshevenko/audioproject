import './header.css'

function Header({setCorrect}) {
    return (
        <div className='headerbox'>
            <h1 className='title'>Название</h1>
            <div className='options'>
                <button onClick={() => setCorrect('component1')} className='liderpage btn_option'>Главная страница</button>
                <button onClick={() => setCorrect('component2')} className='lovepage btn_option'>Мне нравится</button>
                <button onClick={() => setCorrect('component3')} className='searchpage btn_option'>Поиск</button>
            </div>
            <button className='donateBtn'>Донат</button>
        </div>
    )
}

export default Header