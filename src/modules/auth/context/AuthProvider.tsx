/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/AuthService';
import { AuthContext } from './AuthContext';
import type { User } from './types';


export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticate] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    useEffect(() => {
        const storedToken = sessionStorage.getItem('isAuthenticated');
        if (storedToken === 'true') {
            setIsAuthenticate(true);
        } else setIsAuthenticate(false)
        setIsLoading(false);
    }, []);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        } else navigate('/dashboard')
    }, [isAuthenticated])
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await AuthService.login({ email, password });

            sessionStorage.setItem('isAuthenticated', String(response.success));
            setIsAuthenticate(response.success);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        sessionStorage.removeItem('authToken');
        setIsAuthenticate(false);
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

