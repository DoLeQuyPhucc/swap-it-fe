import { ReactNode } from 'react';

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    return <>{children}</>;
};

export default PublicRoute;
