// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const roleRoutes = {
    Admin: '/admin-dashboard',
    user: '/user-dashboard', 
    LegalTeam: '/legal-team-dashboard',
    Owner:'/owner-dashboard',
    lead_generation_specialist: '/lead-generation-dashboard',
    property_manager: '/property-manager-dashboard',
    facility_manager: '/facility-manager-dashboard',
    finance_team_member: '/finance-team-dashboard',
    manager: '/manager-dashboard',
    tenant: '/tenant-dashboard'
};

const BASE_URL = 'http://localhost:8000';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ token, role });
        }
        setLoading(false);
    }, []);

    const signup = async (username, password) => {
        const response = await axios.post(`${BASE_URL}/api/signup`, { username, password });
        const { token } = response.data.user;
        localStorage.setItem('token', token);
        setUser({ token });
        console.log(user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    const login = async (email, password) => {
        const response = await axios.post(
            `${BASE_URL}/api/users/login/`,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log(response.data)
        const { access, user } = response.data;
        localStorage.setItem('token', access);
        localStorage.setItem('role', user.role);
        localStorage.setItem('ownerid', user.id);
        console.log(user)
        setUser({ access, role:user.role });
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        console.log(user.role)
        if (user.role == 'Legal Team'){
            const redirectPath = roleRoutes['LegalTeam'] || '/';
            return redirectPath
        }
        const redirectPath = roleRoutes[user.role] || '/';
        return redirectPath
    };

    const createuser = async (data) => {
        console.log(data)
        const response = await axios.post(
            `${BASE_URL}/api/users/create-user/`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        console.log(response.data)

    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout, createuser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
