// src/modules/auth/components/ProtectedRoute.tsx
import { useAuth } from '@modules/auth/context/hooks/useAuth';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';


const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;