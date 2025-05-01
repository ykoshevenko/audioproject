import './header.css'

function Header() {
    return (
        <div className='headerbox'>
            <h1 className='title'>Название</h1>
            <div className='options'>
                <button className='liderpage btn_option'>Главная страница</button>
                <button className='lovepage btn_option'>Мне нравится</button>
                <button className='searchpage btn_option'>Поиск</button>
            </div>
            <button className='donateBtn'>Донат</button>
        </div>
    )
}

export default Header