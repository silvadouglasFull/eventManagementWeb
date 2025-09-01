// src/router/AppRouter.tsx
import ProtectedRoute from '@modules/auth/components/ProtectedRoute';
import LoginPage from '@modules/auth/pages/LoginPage';
import RegisterPage from '@modules/auth/pages/RegisterPage';
import DashboardPage from '@modules/reservations/pages/DashboardPage';
import NotFoundPage from '@pages/notFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;