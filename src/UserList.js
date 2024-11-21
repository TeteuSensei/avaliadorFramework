import React, { useState, useEffect } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // Usuário em edição
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const openEditModal = (user) => {
    setEditUser(user); // Define o usuário a ser editado
    setIsModalOpen(true); // Abre o modal
  };

  const closeEditModal = () => {
    setEditUser(null);
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    const updatedUsers = users.map((user) =>
      user.username === editUser.username ? editUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    closeEditModal();
    alert('User information updated successfully.');
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert('User deleted successfully.');
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Company</th>
            <th>Sector</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.companyName || '-'}</td>
              <td>{user.sector || '-'}</td>
              <td>
                <button onClick={() => openEditModal(user)}>Edit</button>
                <button onClick={() => handleDelete(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edição */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit User</h3>
            <label>
              Email:
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
            </label>
            <label>
              Role:
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
              >
                <option value="usuario">User</option>
                <option value="gestor">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label>
              Company:
              <input
                type="text"
                value={editUser.companyName || ''}
                onChange={(e) => setEditUser({ ...editUser, companyName: e.target.value })}
              />
            </label>
            <label>
              Sector:
              <input
                type="text"
                value={editUser.sector || ''}
                onChange={(e) => setEditUser({ ...editUser, sector: e.target.value })}
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
