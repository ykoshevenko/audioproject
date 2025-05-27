import './inputSound.css'

function SoundInput() {
    return (
        // Поменять нужно на form
        <div>
            <h1 className="gradientTitle">Добро пожаловать в Творческую мастерскую</h1>
            <div className='formMusic'>
                <h2>Создание вашего альбома: </h2>
                <input placeholder='Название альбома'/>
                <div>
                    
                </div>
                <button>Отправить на площадку</button>
            </div>
        </div>
    )
}

export default SoundInput