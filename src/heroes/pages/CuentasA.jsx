import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const CuentasA = () => {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    obtenerCuentas();
  }, []);

  const obtenerCuentas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cuenta/get'); // Cambia la URL de la ruta a la correspondiente en tu backend
      setCuentas(response.data.cuentas);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4"> {/* Agrega un margen superior de 20 píxeles */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {cuentas.map((cuenta) => (
          <div className="col" key={cuenta._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">No. de Cuenta: {cuenta.noCuenta}</h5>
                <p className="card-text">Saldo: {cuenta.saldo}</p>
                <p className="card-text">Tipo de Cuenta: {cuenta.tipoCuenta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

