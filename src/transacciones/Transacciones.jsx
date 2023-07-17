import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { postTransaccion } from './apiTransacciones';
import SelectCuentasUsuario from './cuentas';

export const TransaccionForm = () => {
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(cuentaOrigen);
    console.log(cuentaDestino);
    console.log(monto);
  
    const cuentaOrigenSeleccionada = cuentaOrigen;
  
    const response = await postTransaccion(cuentaOrigenSeleccionada, cuentaDestino, monto);
  
    if (response) {
      Swal.fire({
        icon: 'success',
        title: 'Transacción Exitosa',
        text: 'La transacción se ha realizado correctamente.',
      });
  
      setCuentaOrigen('');
      setCuentaDestino('');
      setMonto('');
      setFecha('');
  
      setModalIsOpen(false);
    }
  };
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Nueva Transacción</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Realizar Transacción"
      >
        <h2>Realizar Transacción</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Cuenta Origen:</label>
            <SelectCuentasUsuario
              value={cuentaOrigen}
              onChange={(e) => setCuentaOrigen(e.target.value)}
            />
          </div>
          <div>
            <label>Cuenta Destino:</label>
            <input
              type="text"
              value={cuentaDestino}
              onChange={(e) => setCuentaDestino(e.target.value)}
            />
          </div>
          <div>
            <label>Monto:</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
