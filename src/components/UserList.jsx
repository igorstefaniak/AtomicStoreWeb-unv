import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UsersContext';
import UserRow from './UserRow';
import '../App.css'

const UserList = ({ isAdmin, username }) => {
    const { users, fetchUsers } = useContext(UserContext);
    useEffect(() => {
        if (isAdmin) {
            fetchUsers();
        }
    }, [fetchUsers]);
    return (
        <>
            {isAdmin ? (
                <div>
                    <h3>Lista Użytkowników</h3>
                    <button onClick={fetchUsers}>Odśwież</button>
                    {users.length === 0 ? (
                        <p style={{color:'red'}}>Brak użytkowników!</p>
                    ) : (
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>ID użytkownika</th>
                                    <th>Nazwa użytkownika</th>
                                    <th>Email użytkownika</th>
                                    <th>Rola użytkownika</th>
                                    {isAdmin && <th>Działania</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <UserRow key={user.userId} user={user} isAdmin={isAdmin} username={username} />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ) : (<div>Brak uprawnień</div>)}</>);

};

export default UserList;
