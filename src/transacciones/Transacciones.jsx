import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { postTransaccion, getTransaccionesPorUsuario } from './apiTransacciones';

export const TransaccionForm = () => {
  const [cuentaOrigen, setCuentaOrigen] = useState('');
  const [cuentaDestino, setCuentaDestino] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cuentasUsuario, setCuentasUsuario] = useState([]);

  useEffect(() => {
    const obtenerCuentasDelUsuario = async () => {
      const transacciones = await getTransaccionesPorUsuario();
      if (transacciones) {
        const cuentas = [...new Set(transacciones.map((transaccion) => transaccion.cuentaOrigen))];
        setCuentasUsuario(cuentas);
      }
    };

    obtenerCuentasDelUsuario();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await postTransaccion(cuentaOrigen, cuentaDestino, monto);

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
            <select value={cuentaOrigen} onChange={(e) => setCuentaOrigen(e.target.value)}>
              <option value="">Seleccionar cuenta</option>
              {cuentasUsuario.map((cuenta) => (
                <option key={cuenta} value={cuenta}>{cuenta}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Cuenta Destino:</label>
            <input type="text" value={cuentaDestino} onChange={(e) => setCuentaDestino(e.target.value)} />
          </div>
          <div>
            <label>Monto:</label>
            <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
          </div>
          <div>
            <button type="submit">Guardar</button>
            <button type="button" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
