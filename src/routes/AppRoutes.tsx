import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import UserLayout from '../layouts/UserLayout';
import { privateRoutes, publicRoutes } from './routes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import AuthScreens from '../pages/Auth/AuthScreen';

interface AppRoutesProps {
    isAuthenticated: boolean;
    userRole: string | null;
}

const AppRoutes = ({ isAuthenticated, userRole }: AppRoutesProps) => (
    <Router>
        <Routes>
            <Route path="/auth" element={<AuthScreens />} />

            {/* <Route path="*" element={<Navigate to="/home" replace />} />
            <Route path="/" element={<Navigate to="/home" replace />} /> */}
            
            {/* public routes */}
            <Route element={<UserLayout />}>
              {publicRoutes.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<PublicRoute><Page /></ PublicRoute>} />
                );
              })}
            </Route>
            
            {/* private routes */}
            <Route element={<UserLayout />}>
              {privateRoutes.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole}><Page /></PrivateRoute>} />
                );
              })}
            </Route>
        </Routes>
    </Router>
);

export default AppRoutes;
