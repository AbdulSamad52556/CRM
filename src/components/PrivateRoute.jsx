// src/components/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }
    console.log(allowedRoles)
    console.log(user)
    const isAuthorized = user && allowedRoles.includes(user.role);

    return isAuthorized ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
