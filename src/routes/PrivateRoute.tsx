import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    isAuthenticated: boolean;
    userRole: string | null;
    children: ReactNode;
}

const PrivateRoute = ({ isAuthenticated, userRole, children }: PrivateRouteProps) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;

