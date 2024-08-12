import React, { useEffect, useState } from 'react';
import { useGetCurrentUserQuery } from '../app/api/user';
import { useDispatch } from 'react-redux';
import { setRole } from '../app/store/slice/user.slice';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/common/Loader';

function UserProtect() {
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [sts, setSts] = useState(false);

  const apiRequest = useGetCurrentUserQuery(token, { skip: !token });
  const { data, status, error, isSuccess, isError, isLoading } = apiRequest;

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    if (
      data?.data?.data?.role === 'admin' &&
      isSuccess &&
      data?.status === 'success'
    ) {
      dispatch(setRole(data?.data?.data));
    }
    if (!isSuccess && !isLoading) {
      setSts(true);
      return;
    }
  }, [data, isSuccess, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <>
        <Navigate to="/*" replace />
      </>
    );
  }

  if (
    data?.data?.data?.role === 'emp' &&
    isSuccess &&
    data?.status === 'success'
  ) {
    return <Outlet />;
  }
  if (sts) {
    localStorage.removeItem('user');
    return <Navigate to="/*" replace />;
  }
  if (!sts) return <Loader />;
  return <Loader />;
}

export default UserProtect;
