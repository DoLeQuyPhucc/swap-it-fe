import { Outlet } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1" style={{marginTop: '74px'}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
