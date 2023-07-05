import React, { useState } from 'react';
import UsersLogic from '../components/UserA';
import { Link } from 'react-router-dom';

export const UsersA = () => {
  const { users, deleteUser } = UsersLogic();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    deleteUser(userId);
  };

  const handleEditUser = (userId) => {
    // Guarda el ID del usuario en la Local Storage
    window.localStorage.setItem('selectedUserId', userId);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <div className="card-group">
        {users.map((user, index) => (
          <div className="card" key={user.id || index}>
            <div className="card-body">
              <h5 className="card-title">{user.nombre}</h5>
              <h6 className='card-subtitle mb-2 text-muted'>{user.userName}</h6>
              | <Link to="/UpdateUser">
                {/* Asigna handleEditUser al evento onClick */}
                <button className="btn btn-dark" onClick={() => handleEditUser(user._id)}>Editar</button>
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDeleteUser(user._id)}
              >
                Eliminar
              </button>
              {/* Aquí puedes agregar más información del usuario si deseas */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersA;
