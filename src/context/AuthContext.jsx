import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Inicjalizacja stanu na podstawie danych z sessionStorage
    const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('loggedIn') === 'true');
    const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('isAdmin') === 'true');
    const [username, setUsername] = useState(() => sessionStorage.getItem('username') || '');
    const [password, setPassword] = useState(() => sessionStorage.getItem('password') || '');

    // Zapis do sessionStorage przy każdej zmianie stanu
    useEffect(() => {
        sessionStorage.setItem('loggedIn', loggedIn);
        sessionStorage.setItem('isAdmin', isAdmin);
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
    }, [loggedIn, isAdmin, username, password]);

    const authHeader = {
        headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
    };

    const login = (userData, role) => {
        setLoggedIn(true);
        setUsername(userData.username);
        setPassword(userData.password);
        setIsAdmin(role === "ADMIN");
    };

    const logout = () => {
        setLoggedIn(false);
        setIsAdmin(false);
        setUsername('');
        setPassword('');
        // Czyszczenie danych sesji
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('isAdmin');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
    };

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                isAdmin,
                username,
                password,
                authHeader,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
