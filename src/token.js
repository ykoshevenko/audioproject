import axios from "axios"

export const setToken = (token) => {
    localStorage.setItem('Token', token)
}

export const getToken = () => {
    return localStorage.getItem('Token')
}

export async function getUserByToken(token) {
    var ans = false;

    const res = await axios.post(`http://localhost:8000/users/login/`, {
        "token": token
    }).then((resp) => {
        if (resp.status === 200) {
            const response = resp.data
            ans = response
        }else{
            ans  = false
        }
    }).catch((error) => console.error(error));
    return ans
}