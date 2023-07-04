import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersA = () => {
  const [users, setUsers] = useState([]);

  

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/user/mostrarUser');
      setUsers(data.listaUsers);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/eliminar/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

 

  return {
    users,
    deleteUser
    
  };
};

export default UsersA;