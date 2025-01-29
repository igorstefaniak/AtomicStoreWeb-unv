import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { authHeader } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    const fetchUsers = useCallback(() => {
        axios
            .get('http://localhost:8080/api/private/admin/users', {
                ...authHeader,
            })
            .then((response) => setUsers(response.data));
    }, [setUsers]);

    const addUser = (user) => {
        axios
            .post(
                'http://localhost:8080/api/private/admin/user/',
                {},
                { ...authHeader, params: user }
            )
            .then(fetchUsers());
    };

    const updateUser = (id, user) => {
        axios
            .put(
                `http://localhost:8080/api/private/admin/user/${id}`,
                {},
                { ...authHeader, params: user }
            )
            .then(fetchUsers());
    };

    const deleteUser = (id) => {
        axios
            .delete(`http://localhost:8080/api/private/admin/user/${id}`, authHeader)
            .then(() => setUsers((prev) => prev.filter((p) => p.orderId !== id)),
            fetchProducts());
    };


    return (
        <UserContext.Provider
            value={{
                users,
                fetchUsers,
                addUser,
                updateUser,
                deleteUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
