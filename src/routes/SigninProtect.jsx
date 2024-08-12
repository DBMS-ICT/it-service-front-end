import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/common/Loader';

function SigninProtect() {
  const [token, setToken] = useState(localStorage.getItem('user'));
  const [ststus, setStatus] = useState('w');

  useEffect(() => {
    if (token) setStatus('s');
    else if (!token) setStatus('e');
  }, [, token]);
  if (ststus === 's') return <Navigate to="/" replace />;
  if (ststus === 'e') return <Outlet />;
  return <Loader />;
}

export default SigninProtect;
