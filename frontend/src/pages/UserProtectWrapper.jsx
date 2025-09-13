import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext); // Changed to object destructuring
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`   // Show the token to the server
      }
    })
    .then(response => {
      if (response.status === 200) { 
        setUser(response.data);                // Write the user's info on the global board.
        setIsLoading(false);               // Turn off the "Loading..." sign.
      }
    })
    .catch(err => {
      // Server says the token is BAD or expired!
      console.log(err);
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [token, navigate, setUser]);   // This list tells the bouncer when to do his check again.

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;