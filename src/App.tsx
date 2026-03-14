/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { COMPANY_INFO } from './data';
import Home from './pages/Home';
import Catalog from './pages/Catalog';

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSidebarClick = () => {
    closeSidebar();
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={openSidebar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={COMPANY_INFO.logoUrl} alt="Halimbekaul Logo" className="w-10 h-10 object-contain" />
            <span className="font-bold text-xl tracking-tight uppercase hidden sm:block">Halimbekaul</span>
          </Link>

          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-all active:scale-95"
          >
            Связь
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-white z-[70] shadow-2xl p-8 flex flex-col"
            >
              <div className="flex justify-end mb-12">
                <button onClick={closeSidebar} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-8">
                <Link 
                  to="/"
                  onClick={handleSidebarClick}
                  className={`text-4xl font-bold hover:text-red-600 transition-colors ${location.pathname === '/' ? 'text-red-600' : ''}`}
                >
                  Главная
                </Link>
                <Link 
                  to="/catalog"
                  onClick={handleSidebarClick}
                  className={`text-4xl font-bold hover:text-red-600 transition-colors ${location.pathname === '/catalog' ? 'text-red-600' : ''}`}
                >
                  Каталог
                </Link>
                <button 
                  onClick={() => {
                    setIsContactModalOpen(true);
                    closeSidebar();
                  }}
                  className="text-4xl font-bold hover:text-red-600 transition-colors text-left"
                >
                  Контакты
                </button>
              </nav>

              <div className="mt-auto pt-8 border-t border-gray-100">
                <p className="text-gray-400 text-sm mb-4 uppercase tracking-widest font-semibold">Связь</p>
                <a href={`tel:${COMPANY_INFO.phone}`} className="block text-xl font-medium mb-2 hover:text-red-600 transition-colors">{COMPANY_INFO.phone}</a>
                <a href={`mailto:${COMPANY_INFO.email}`} className="block text-gray-600 hover:text-red-600 transition-colors">{COMPANY_INFO.email}</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
      </Routes>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-2">
            <img src={COMPANY_INFO.logoUrl} alt="Halimbekaul Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg tracking-tight uppercase">Halimbekaul</span>
          </div>
          
          <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
            <Link to="/" className="hover:text-black transition-colors">Главная</Link>
            <Link to="/catalog" className="hover:text-black transition-colors">Каталог</Link>
            <button onClick={() => setIsContactModalOpen(true)} className="hover:text-black transition-colors">Контакты</button>
          </div>

          <div className="flex gap-4">
            <a href={COMPANY_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-all">
              <Instagram size={20} />
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} ХАЛИМБЕКАУЛ. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
        </div>
      </footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[2.5rem] p-12 shadow-2xl"
            >
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-3xl font-black tracking-tighter mb-8 uppercase">СВЯЖИТЕСЬ С НАМИ</h2>
              
              <div className="space-y-6">
                <a 
                  href={`tel:${COMPANY_INFO.phone}`} 
                  className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Телефон</p>
                    <p className="text-xl font-bold">{COMPANY_INFO.phone}</p>
                  </div>
                </a>

                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-xl font-bold">{COMPANY_INFO.email}</p>
                  </div>
                </a>

                <a 
                  href={COMPANY_INFO.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50 hover:bg-red-50 hover:text-red-600 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Instagram</p>
                    <p className="text-xl font-bold">@halimbekaul.ice</p>
                  </div>
                </a>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-400 text-sm">
                  Мы работаем ежедневно и всегда рады вашим вопросам и предложениям.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
