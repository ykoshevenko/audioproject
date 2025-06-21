import './style/inputSound.scss'

function SoundInput() {
    return (
        // Поменять нужно на form
        <div>
            <h1 className="gradientTitle">Добро пожаловать в Творческую мастерскую</h1>
            <div className='formMusic'>
                <div className='contentformMusic'>
                    <div className='contentedd'>
                        <h2>Создание вашего альбома: </h2>
                        <input placeholder='Название альбома'/>
                        <div className='songs'>
                            <div className='song_add'>
                                <input placeholder='Название песни'/>
                                <input type="file" name="platform" />
                            </div>
                        </div>
                        <button>Отправить на площадку</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SoundInput