import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const API_URL = 'http://localhost:8080/api/user/';
import { useNavigate } from 'react-router-dom';


const generateAccountNumber = () => {
  const randomNum = Math.floor(Math.random() * 10000000000);
  return String(randomNum).padStart(10, '0');
};

export const AdminPage = () => {

  const [formData, setFormData] = useState({
    nombre: '',
    userName: '',
    password: '',
    Dpi: '',
    Celular: '',
    direccion: '',
    email: '',
    NamefromWork: '',
    IngresosMensauales: 0
  });

  const { nombre, userName, password, Dpi, Celular, direccion, email, NamefromWork, IngresosMensauales } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const generatedAccountNumber = generateAccountNumber();

    try {
      const response = await axios.post(`${API_URL}agregar`, {
        nombre,
        userName,
        password,
        Dpi,
        Celular,
        direccion,
        email,
        NamefromWork,
        IngresosMensauales
      });

      if (response.status === 201) {
        // Registro exitoso
        Swal.fire('Registro exitoso', 'Usuario registrado exitosamente', 'success');
      } else {
        // Error en el registro
        Swal.fire('Error', 'Error al registrar el usuario', 'error');
      }
    } catch (error) {
      console.log('Error en la solicitud de registro:', error);
      // Mostrar alerta de error
      Swal.fire('Error', 'Error en la solicitud de registro', 'error');
    }

    // Limpiar el formulario
    setFormData({
      nombre: '',
      userName: '',
      password: '',
      Dpi: '',
      Celular: '',
      direccion: '',
      email: '',
      NamefromWork: '',
      IngresosMensauales: 0
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="container mt-5">
        <h1>Register</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={nombre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="userName"
              value={userName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">DPI</label>
            <input
              type="text"
              className="form-control"
              name="Dpi"
              value={Dpi}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Celular</label>
            <input
              type="text"
              className="form-control"
              name="Celular"
              value={Celular}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={direccion}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nombre de Trabajo</label>
            <input
              type="text"
              className="form-control"
              name="NamefromWork"
              value={NamefromWork}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Ingresos Mensuales</label>
            <input
              type="number"
              className="form-control"
              name="IngresosMensauales"
              value={IngresosMensauales}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>
    </>
  );
};