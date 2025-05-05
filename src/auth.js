import './auth.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserByToken, getToken, setToken } from './token';

// Проверяем наличие токена
const isAuthenticated = () => !!localStorage.getItem('token');

const Auth = ({setButton}) => {
    const [visible, setVisible] = useState(!isAuthenticated()); // Показывать форму регистрации, если пользователь не залогинен
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [message1, setMessage1] = useState('');
    const [userData, setUserData] = useState(null);

    const toggleForm = () => {
        setVisible(prevState => !prevState); // Переключаем формы регистрации и входа
    };

    useEffect(() => {
        const token = getToken();
        if (token) {
            getUserByToken(token)
                .then(result => {
                    setUserData(result);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных пользователя:', error);
                });
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!login || !password) {
            setMessage("Заполните все поля!");
            return;
        }
    
        // Исправляем выбор эндпоинта
        const endpoint = visible ? 'register/' : 'login/'; 
        const API_BASE_URL = 'http://localhost:8000/users';
    
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, { 
                login, 
                password 
            });

            if (response.status === 200 && response.data.access_token) {
                localStorage.setItem("token", response.data.access_token);
                setMessage(visible ? "Регистрация успешна! Вы можете войти." : "Авторизация прошла успешно!");

                // Если форма входа была активна, переходим на главную страницу
                if (!visible) {
                    window.location.reload(); // Можно заменить на переход с использованием React Router
                }
            }

            setMessage('Регистрация прошла успешно')
            setMessage1('Вы успешно вошли в аккаунт')

        } catch (error) {
            let errorMessage = 'Ошибка сервера';
            if (error.response) {
                if (error.response.status === 405) {
                    errorMessage = 'Неподдерживаемый метод запроса';
                }
                errorMessage = error.response.data.message || errorMessage;
            }
            setMessage(`Ошибка: ${errorMessage}`);
            console.error('Полная ошибка:', error.config);
        }


    };

    return (
        <>
            {userData ? (
                <h1>незнаю</h1>
            ) : (
                <div className='parent'>
                <form className='inner' onSubmit={handleSubmit}>
                        <div className='auth_cont'>
                            <h1 className='title_auth'>{visible ? 'Регистрация' : 'Вход в аккаунт'}</h1>
                            <input
                                type='text'
                                placeholder='Логин'
                                className='input_auth'
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                            />
                            <br />
                            <input
                                type='password'
                                placeholder='Пароль'
                                className='input_auth'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button className='btn_auth' type="submit">
                                {visible ? 'Зарегистрироваться' : 'Войти'}
                            </button>
                            <br />
                            <button className='btn_auth' onClick={toggleForm}>
                                {visible ? 'У меня уже есть аккаунт' : 'Создать новый аккаунт'}
                            </button>
                            <button className='btn_auth' onClick={() => setButton(false)}>
                                Закрыть окно
                            </button>
                            <p>{visible ? message : message1}</p>
                        </div>
                </form>
            </div>
            )}
        </>
    );
};

export default Auth;