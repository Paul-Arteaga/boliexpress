import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ user, handleLogout }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-orange-600">BoliExpress</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Rastrear envío</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Ubicaciones</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Blog</a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Ayuda</a>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="text-xl">🇨🇱</span>
              <span>Español</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.displayName || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-orange-600 transition-colors"
                >
                  Acceder
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Registrarse
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-orange-600 transition-colors px-2 py-2"
              >
                Rastrear envío
              </a>
              <a 
                href="#" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-orange-600 transition-colors px-2 py-2"
              >
                Ubicaciones
              </a>
              <a 
                href="#" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-orange-600 transition-colors px-2 py-2"
              >
                Blog
              </a>
              <a 
                href="#" 
                onClick={closeMobileMenu}
                className="text-gray-700 hover:text-orange-600 transition-colors px-2 py-2"
              >
                Ayuda
              </a>
              
              {/* Language Selector Mobile */}
              <div className="flex items-center space-x-2 text-gray-700 px-2 py-2">
                <span className="text-xl">🇨🇱</span>
                <span>Español</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* User Actions Mobile */}
              {user ? (
                <div className="flex flex-col space-y-2 px-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-700 px-2 py-2">{user.displayName || user.email}</span>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="text-left text-gray-700 hover:text-orange-600 transition-colors px-2 py-2"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-2 pt-2 border-t border-gray-200">
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/login');
                    }}
                    className="text-left text-gray-700 hover:text-orange-600 transition-colors px-2 py-2"
                  >
                    Acceder
                  </button>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/login');
                    }}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-center"
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

