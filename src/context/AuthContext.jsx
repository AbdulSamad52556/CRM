// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const roleRoutes = {
    Admin: '/admin-dashboard',
    user: '/user-dashboard', 
    LegalTeam: '/legal-team-dashboard',
    Owner:'/owner-dashboard',
    Agent:'/agent-dashboard',
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
        const userid = localStorage.getItem('userid');
        if (token && role && userid) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ token, role, id: userid });
        }
        setLoading(false);
    }, []);

    const signup = async (first_name, last_name, email, phone_number, role, password) => {
        const username = email
        const response = await axios.post(`${BASE_URL}/api/users/register/`, { first_name, last_name, username, email, phone_number, role, password });
        return response.data
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
        localStorage.setItem('userid', user.id);

        setUser({ token: access, role: user.role, id: user.id });
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
        localStorage.removeItem('role');
        localStorage.removeItem('userid');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout, createuser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
