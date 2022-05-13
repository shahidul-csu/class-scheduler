import {useState} from 'react';

function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        return JSON.parse(tokenString)
    };

    const [token, setToken] = useState(getToken());

    const saveToken = newToken => {
        localStorage.setItem('token', JSON.stringify(newToken));
        setToken(newToken);
    };

    return {
        setToken: saveToken,
        token
    }
}

export {
    useToken
}