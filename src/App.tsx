import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { publicRoutes } from './routes/routes';
import UserLayout from './layouts/UserLayout';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            
            {/* public routes */}
            <Route element={<UserLayout />}>
              {publicRoutes.map((item, index) => {
                const Page = item.component;
                return (
                  <Route key={index} path={item.path} element={<Page />} />
                );
              })}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
