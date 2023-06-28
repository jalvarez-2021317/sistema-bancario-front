import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const UsersA = () => {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        getUsers();
    }, []);

    // const getUsers = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/api/user/mostrar');
    //         const {data} = response.data;
    //         setUsers(data.listaUsers);
    //         console.log(data.listaUsers);
    //     } catch (error) {
    //         console.error('Error al obtener los usuarios:', error);
    //     }
    // };

    const getUsers = async () => {
        try {
            const {data} = await axios.get('http://localhost:8080/api/user/mostrar')
            const newusers = data.listaUsers
            setUsers(newusers)
            console.log(newusers)
            return data
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    };

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {users.map((user, index) => (
                    <li key={user.id || index}>
                        <p>Nombre: {user.nombre}</p>
                        <p>UserName: {user.userName}</p>
                        {/* Mostrar las demás propiedades del usuario */}
                    </li>
                ))}
            </ul>
        </div>
    );
};