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
    noCuenta: '',
    dpi: '',
    celular: '',
    email: '',
  });

  const { nombre, userName, noCuenta ,password, dpi, celular, email } = formData;

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
        noCuenta,
        dpi,
        celular,
        email,
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
      noCuenta: generatedAccountNumber,
      dpi: '',
      celular: '',
      email: '',
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  const navigate = useNavigate();

// Generar número de cuenta aleatorio


  // Función para generar un número de cuenta aleatorio
 

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
            <label className="form-label">No. Cuenta</label>
            <input
              type="text"
              className="form-control"
              name="noCuenta"
              value={noCuenta}
              onChange={handleChange}
              disabled 
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">DPI</label>
            <input
              type="text"
              className="form-control"
              name="dpi"
              value={dpi}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Celular</label>
            <input
              type="text"
              className="form-control"
              name="celular"
              value={celular}
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
          <button type="submit" className="btn btn-primary">
            Agregar
          </button>
        </form>
      </div>
    </>
  );
};