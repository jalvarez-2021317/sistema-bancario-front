import React, { useState } from 'react';
import UsersLogic from '../components/UserA';
import { UpdateUser } from './UpdateUser';
import Modal from 'react-modal';

export const UsersA = () => {
  const { users, deleteUser, updateUser  } = UsersLogic();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [shouldOpenEditModal, setShouldOpenEditModal] = useState(false);
  const [shouldOpenViewModal, setShouldOpenViewModal] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    setDeleteModalIsOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(selectedUserId);
    setDeleteModalIsOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalIsOpen(false);
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setShouldOpenEditModal(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShouldOpenViewModal(true);
  };

  
  const handleUpdateUser = (updatedUser) => {
    updateUser(updatedUser);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>UserName</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td>{index + 1}</td>
              <td>{user.nombre}</td>
              <td>{user.userName}</td>
              <td>
                <button className="btn btn-success ms-2" onClick={() => handleViewUser(user)}>
                  Ver
                </button>
                <button className="btn btn-info ms-2" onClick={() => handleEditUser(user._id)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  data-bs-toggle="modal"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={handleCancelDelete}
        contentLabel="Confirmar eliminación"
        style={{
          content: {
            width: '300px',
            height: '200px',
            margin: 'auto',
          },
        }}
      >
        <h2>¿Estás seguro de eliminar el usuario?</h2>
        <div>
          <button className="btn btn-danger" onClick={handleConfirmDelete}>
            Sí
          </button>
          <button className="btn btn-secondary" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      </Modal>

      {/* Modal de visualización de datos del usuario */}
      {shouldOpenViewModal && selectedUser && (
        <Modal
          isOpen={shouldOpenViewModal}
          onRequestClose={() => setShouldOpenViewModal(false)}
          contentLabel="Datos del usuario"
          style={{
            content: {
              width: '400px',
              height: 'auto',
              margin: 'auto',
            },
          }}
        >
          <h2>Datos del usuario</h2>
          <div>
            <div className="mb-3">
              <label>Nombre: </label>
              <span>{ selectedUser.nombre}</span>
            </div>
            <div className="mb-3">
              <label>Nombre de usuario:</label>
              <span>{selectedUser.userName}</span>
            </div>
          
            <div className="mb-3">
              <label>DPI: </label>
              <span>{selectedUser.Dpi}</span>
            </div>
            <div className="mb-3">
              <label>Celular: </label>
              <span>{selectedUser.Celular}</span>
            </div>
            <div className="mb-3">
              <label>Dirección: </label>
              <span>{selectedUser.direccion}</span>
            </div>
            <div className="mb-3">
              <label>Correo electrónico: </label>
              <span>{selectedUser.email}</span>
            </div>
            <div className="mb-3">
              <label>Nombre del trabajo: </label>
              <span>{selectedUser.NamefromWork}</span>
            </div>
            <div className="mb-3">
              <label>Ingresos mensuales: </label>
              <span>{selectedUser.IngresosMensauales}</span>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => setShouldOpenViewModal(false)}>
            Cerrar
          </button>
        </Modal>
      )}

      {/* Modal de edición */}
      {shouldOpenEditModal && (
        <UpdateUser
          selectedUserId={selectedUserId}
          closeModal={() => setShouldOpenEditModal(false)}
          updateUser={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UsersA;