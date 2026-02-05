import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Add padding-top to account for fixed header */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
