import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function UseToken() {
  const getToken = () => {
    return localStorage.getItem('token') || null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp < currentTime;
  };

  useEffect(() => {
    if (isTokenExpired()) {
      removeToken();
      window.location.href = '/'; 
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        removeToken();
        window.location.href = '/'; 
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array, so this effect only runs once

  return {
    token,
    setToken: saveToken,
    removeToken,
  };
}

export default UseToken;
