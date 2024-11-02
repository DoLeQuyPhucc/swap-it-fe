import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    return <>{children}</>;
};

export default PublicRoute;
