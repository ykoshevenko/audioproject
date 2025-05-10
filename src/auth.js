import './auth.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserByToken, getToken, setToken } from './token';
import Like from './like';

const isAuthenticated = () => !!localStorage.getItem('token');

const Auth = ({setCorrect}) => {
    const [visible, setVisible] = useState(!isAuthenticated());
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [save, setSave] = useState(false);

    const toggleForm = () => {
        setVisible(prevState => !prevState);
        setMessage(''); // Очищаем сообщение при переключении формы
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
    
        const endpoint = visible ? 'register/' : 'login/'; 
        const API_BASE_URL = 'http://localhost:8000/users';
    
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, { 
                login, 
                password 
            });

            if (response.status === 200) {
                if (response.data.access_token) {
                    // Для входа
                    setToken(response.data.access_token);
                    setMessage("Авторизация прошла успешно!");
                    setSave(true);
                } else if (visible) {
                    // Для регистрации
                    setMessage("Регистрация успешна! Теперь вы можете войти.");
                    setVisible(false); // Переключаем на форму входа
                    setLogin(''); // Очищаем поля
                    setPassword('');
                }
            }
        } catch (error) {
            let errorMessage = 'Ошибка сервера';
            if (error.response) {
                if (error.response.status === 405) {
                    errorMessage = 'Неподдерживаемый метод запроса';
                }
                errorMessage = error.response.data.message || errorMessage;
            }
            setMessage(`Ошибка: ${errorMessage}`);
            console.error('Ошибка:', error.config);
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