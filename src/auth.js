import './auth.css'
import React, { useState } from 'react';

const Auth = () => {
    const [visible, setVisible] = useState(true); // начальное состояние true (регистрация)

    function registers() {
        setVisible(true); // Переключаемся на регистрацию
    }

    function input() {
        setVisible(false); // Переключаемся на вход
    }

    return (
        <div>
            {visible ? (
                <div className='parent'>
                    <div className='inner'>
                        <div className='auth_cont'>
                            <h1 className='title_auth'>Регистрация</h1>
                            <input type='email' placeholder='Email' className='input_auth'/>
                            <br/>
                            <input type='password' placeholder='Пароль' className='input_auth'/>
                            <button className='btn_auth'>Отправить</button>
                            <br/>
                            <button className='btn_auth' onClick={input}>Войти в существующий аккаунт</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='parent'>
                    <div className='inner'>
                        <div className='auth_cont'>
                            <h1 className='title_auth'>Вход в аккаунт</h1>
                            <input type='email' placeholder='Email' className='input_auth'/>
                            <br/>
                            <input type='password' placeholder='Пароль' className='input_auth'/>
                            <button className='btn_auth' onClick={registers}>Регистрация</button>
                            <br/>
                            <button className='btn_auth'>Войти</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Auth;