import React, { useEffect, useState } from 'react';
import { getTransaccionesPorUsuario } from './apiTransacciones';

const TransaccionesTabla = () => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    obtenerTransacciones();
  }, []);

  const obtenerTransacciones = async () => {
    // Obtener el ID del usuario logueado desde el almacenamiento local
    const usuarioId = localStorage.getItem('userId');

    // Llamar a la función de la API para obtener las transacciones del usuario logueado
    const data = await getTransaccionesPorUsuario(usuarioId);

    if (data) {
      setTransacciones(data);
    }
  };

  return (
    <div>
      <h1>Transacciones del Usuario</h1>
      <table>
        <thead>
          <tr>
            <th>Cuenta Origen</th>
            <th>Cuenta Destino</th>
            <th>Monto</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((transaccion) => (
            <tr key={transaccion._id}>
              <td>{transaccion.cuentaOrigen}</td>
              <td>{transaccion.cuentaDestino}</td>
              <td>{transaccion.monto}</td>
              <td>{transaccion.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransaccionesTabla;
