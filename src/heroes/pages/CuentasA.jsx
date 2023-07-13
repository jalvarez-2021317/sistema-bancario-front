import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

export const CuentasA = () => {
  const [cuentas, setCuentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [cuentaSaldo, setCuentaSaldo] = useState('');
  const [cuentaTipo, setCuentaTipo] = useState('');

  useEffect(() => {
    obtenerUsuarios();
    obtenerCuentas();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/mostrarUser');
      setUsuarios(response.data.listaUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerCuentas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cuenta/get');
      setCuentas(response.data.cuentas);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedUser('');
    setCuentaSaldo('');
    setCuentaTipo('');
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleCuentaSaldoChange = (event) => {
    setCuentaSaldo(event.target.value);
  };

  const handleCuentaTipoChange = (event) => {
    setCuentaTipo(event.target.value);
  };

  const getUsernameById = (userId) => {
    const user = usuarios.find((user) => user._id === userId);
    return user ? user.userName : '';
  };

  const agregarCuenta = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/cuenta/create', {
        tipoCuenta: cuentaTipo,
        saldo: cuentaSaldo,
        usuario: selectedUser
      });
  
      const nuevaCuenta = response.data.cuentaDB;
      setCuentas((prevCuentas) => [...prevCuentas, nuevaCuenta]);
  
      const username = getUsernameById(selectedUser);
    
  
      Swal.fire({
        icon: 'success',
        title: '¡Cuenta añadida!',
        text: `Se ha añadido correctamente la cuenta para el usuario ${username}.`
      }).then(() => {
        closeModal();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Lista de Cuentas</h1>

      <div className="mt-4">
        <button className="btn btn-success" onClick={openModal}>Añadir Cuenta</button>
      </div>


      <div className="mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cuentas && cuentas.map((cuenta) => (
            <div className="col" key={cuenta._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">No. de Cuenta: {cuenta.noCuenta}</h5>
                  <h5 className="card-title">Usuario: {getUsernameById(cuenta.usuario)}</h5>
                  <p className="card-text">Saldo: Q{cuenta.saldo}</p>
                  <p className="card-text">Tipo de Cuenta: {cuenta.tipoCuenta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Añadir Cuenta"
      >
        <h2>Añadir Cuenta</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <select className="form-control" value={selectedUser} onChange={handleUserChange}>
              <option value="">Selecciona un usuario</option>
              {usuarios && usuarios.map((usuario) => (
                <option value={usuario._id} key={usuario._id}>{usuario.userName}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Saldo:</label>
            <input type="text" className="form-control" value={cuentaSaldo} onChange={handleCuentaSaldoChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo de Cuenta:</label>
            <input type="text" className="form-control" value={cuentaTipo} onChange={handleCuentaTipoChange} />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={closeModal}>Cancelar</button>
            <button type="button" className="btn btn-info" onClick={agregarCuenta}>Crear</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CuentasA;