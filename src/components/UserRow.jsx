import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UsersContext';
import '../App.css'
const UserRow = ({ user, isAdmin, username }) => {
    const { updateUser, deleteUser, fetchUsers } = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleSave = async () => {
        try {
            await updateUser(user.userId, editedUser);
            setEditing(false);
            fetchUsers();
        }
        catch (error) {
        }
    };
    const handleDelete = async () => {
        try {
            await deleteUser(user.userId);
            fetchUsers();
        } catch (error) {
        }
    };

    return (
        <tr>
            <td>
                {user.userId}
            </td>
            <td>
                {editing ? (
                    <input placeholder='nazwa'
                        value={editedUser.username}
                        onChange={(e) =>
                            setEditedUser({ ...editedUser, username: e.target.value })
                        }
                    />
                ) : (
                    user.username
                )}
            </td>
            <td>
                {editing ? (
                    <input
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    />
                ) : (
                    user.email
                )}
            </td>
            <td>
                {editing ? (
                    <select
                        value={editedUser.role}
                        onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                    >
                        <option value="USER">Użytkownik</option>
                        <option value="ADMIN">Administrator</option>
                    </select>
                ) : (
                    user.role
                )}
            </td>
            {isAdmin && username !== user.username && (
                <td>
                    {editing ? (
                        <button onClick={handleSave}>Zapisz</button>
                    ) : (
                        <button onClick={() => setEditing(true)}>Edytuj</button>
                    )}
                    <button onClick={handleDelete}>Usuń</button>
                </td>
            )}
        </tr>
    );
};

export default UserRow;
