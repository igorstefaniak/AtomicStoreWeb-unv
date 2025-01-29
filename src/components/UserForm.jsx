import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UsersContext';

const UserForm = () => {
    const { addUser, fetchUsers } = useContext(UserContext);
    const [newUser, setNewUser] = useState({
        role: 'USER',
        username: '',
        password: '',
        email: '',
    });

    const handleAdd = async () => {
        try {
            await addUser(newUser);
            setNewUser({
                role: 'USER',
                username: '',
                password: '',
                email: '',
            });
            fetchUsers();
        } catch (error) {
        }
    };
    return (
        <div>
            <h3>Dodaj nowego użytkownika do bazy</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nazwa użytkownika</th>
                        <th>Email użytkownika</th>
                        <th>Hasło użytkownika</th>
                        <th>Rola użytkownika</th>
                        <th>Działania</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="username"
                                value={newUser.username}
                                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            />
                        </td>

                        <td>
                            <input
                                type="email"
                                placeholder="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="password"
                                placeholder="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            />
                        </td>
                        <td>
                            <select id='rola'
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            >
                                <option value="USER">Użytkownik</option>
                                <option value="ADMIN">Administrator</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={handleAdd}>Dodaj użytkownika</button>
                        </td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserForm;
