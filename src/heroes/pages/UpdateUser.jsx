import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

export const UpdateUser = () => {
  const { id } = useParams(); // Obtener el ID del usuario de la URL
  const selectedUserId = window.localStorage.getItem('selectedUserId');

  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    nombre: '',
    userName: '',
    password: '',
    Dpi: '',
    Celular: '',
    direccion: '',
    email: '',
    NamefromWork: '',
    IngresosMensauales: '',
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/mostrarEditar/${selectedUserId}`);
      const user = response.data.user;

      setUserData(user);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  // Función para manejar los cambios en los campos de entrada
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  // Función para manejar el envío del formulario de edición
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/user/editar/${selectedUserId}`, userData);
      console.log('Usuario actualizado correctamente');
      // Puedes redirigir a otra página o realizar otras acciones después de la actualización exitosa
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  return (
    <div>
      <h1>Editar usuario</h1>
      <button onClick={() => setModalIsOpen(true)}>Abrir modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <form onSubmit={handleFormSubmit}>
          Nombre:
          <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} />
          <br />
          Nombre de usuario:
          <input type="text" name="userName" value={userData.userName} onChange={handleInputChange} />
          <br />
          Contraseña:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} />
          <br />
          Dpi:
          <input type="number" name="Dpi" value={userData.Dpi} onChange={handleInputChange} />
          <br />
          Celular:
          <input type="number" name="Celular" value={userData.Celular} onChange={handleInputChange} />
          <br />
          Dirección:
          <input type="text" name="direccion" value={userData.direccion} onChange={handleInputChange} />
          <br />
          Correo electrónico:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
          <br />
          Nombre del trabajo:
          <input type="text" name="NamefromWork" value={userData.NamefromWork} onChange={handleInputChange} />
          <br />
          Ingresos mensuales:
          <input
            type="number"
            name="IngresosMensauales"
            value={userData.IngresosMensauales}
            onChange={handleInputChange}
          />
          <br />
          {/* Agrega más campos de entrada para los demás datos del usuario */}
          <button type="submit">Guardar cambios</button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateUser;
