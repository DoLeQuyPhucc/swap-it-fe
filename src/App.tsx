import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {

  const isAuthenticated = !!localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  return (
    <>
      <ThemeProvider>
        <AppRoutes isAuthenticated={isAuthenticated} userRole={userRole} />
      </ThemeProvider>
    </>
  );
};

export default App;
