import './style/auth.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserByToken, getToken, setToken } from './token';
import Like from './like';

const isAuthenticated = () => !!localStorage.getItem('token');

const Auth = ({setCorrect, setAuthName}) => {
    const [visible, setVisible] = useState(!isAuthenticated());
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [save, setSave] = useState(false);

    const toggleForm = () => {
        setVisible(prevState => !prevState);
        setMessage('');
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

    if (!username || !password) {
        setMessage("Заполните все поля!");
        return;
    }

    const API_BASE_URL = 'http://localhost:8000';
    const isRegister = visible;
    const endpoint = isRegister ? '/users/register/' : '/users/login/';

    try {
        // Подготовка данных в зависимости от типа запроса
        let requestData;
        let config;

        if (isRegister) {
            // Для регистрации - JSON
            requestData = { username, password };
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
        } else {
            // Для авторизации - x-www-form-urlencoded
            const params = new URLSearchParams();
            params.append('username', username);
            params.append('password', password);
            
            requestData = params.toString();
            config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
        }

        const response = await axios.post(`${API_BASE_URL}${endpoint}`, requestData, config);

        if (response.status === 200) {
            if (response.data.access_token) {
                setToken(response.data.access_token);
                setMessage(isRegister ? "Регистрация успешна!" : "Авторизация прошла успешно!");
                setSave(true);
                setAuthName(username);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
            }
        }
    } catch (error) {
        let errorMessage = 'Ошибка сервера';
        if (error.response) {
            if (error.response.status === 400 || error.response.status === 401) {
                errorMessage = 'Неверное имя пользователя или пароль';
            } 
            else if (error.response.status === 404) {
                errorMessage = 'Endpoint не найден. Проверьте URL.';
            }
            else if (error.response.status === 422) {
                errorMessage = error.response.data.detail || 
                             'Ошибка валидации данных';
            }
            errorMessage = error.response.data?.message || errorMessage;
        }
        setMessage(`Ошибка: ${errorMessage}`);
        console.error('Ошибка:', error.response?.data || error.message);
    }
};

    return (
        <>
            {save ? (
                <Like/>
            ) : (
                <div className='parent'>
                    <form className='inner' onSubmit={handleSubmit}>
                        <div className='auth_cont'>
                            <h1 className='title_auth'>{visible ? 'Регистрация' : 'Вход в аккаунт'}</h1>
                            <input
                                type='text'
                                placeholder='Имя пользователя'
                                className='input_auth'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                            <button type="button" className='btn_auth' onClick={toggleForm}>
                                {visible ? 'У меня уже есть аккаунт' : 'Создать новый аккаунт'}
                            </button>
                            <button type="button" className='btn_auth' onClick={() => setCorrect('component1')}>
                                Закрыть окно
                            </button>
                            <p className="auth-message">{message}</p>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default Auth;