import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.products'), path: '/products' },
    { name: t('navbar.about'), path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleContactClick = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact-us');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#contact-us');
    }
  };

  return (
    <nav 
      aria-label="Main Navigation"
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-200/50 py-2" 
          : "bg-white border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Toho Sukses Mandiri Home">
            <div className="relative">
              <div className="absolute inset-0 bg-[#009200]/10 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img 
                src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/c727a0189b5f858e51d08b52b5a14b6e.jpg" 
                alt="Toho Sukses Mandiri Logo" 
                className="relative h-11 w-11 object-contain bg-white rounded-full p-0.5 shadow-sm border border-gray-100" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-lg leading-tight text-gray-900 tracking-tight group-hover:text-[#009200] transition-colors">
                Toho Sukses Mandiri
              </span>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                Distributor Resmi Sugimura Oil 
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100/50" role="menubar">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                role="menuitem"
                aria-current={isActive(item.path) ? "page" : undefined}
                className={cn(
                  "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  isActive(item.path)
                    ? "text-gray-900 bg-white shadow-sm ring-1 ring-gray-200"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#009200]"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              onClick={handleContactClick}
              aria-label="Contact Us"
              className="bg-[#009200] hover:bg-[#007a00] text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg px-5 h-10 font-semibold text-sm gap-2"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{t('navbar.contact')}</span>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
              className="text-gray-900 hover:bg-gray-50"
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            id="mobile-menu"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    isActive(item.path)
                      ? "bg-green-50 text-[#009200] font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {item.name}
                  {isActive(item.path) && <div className="w-1.5 h-1.5 rounded-full bg-[#009200]" />}
                </Link>
              ))}
              
              <div className="h-px bg-gray-100 my-4"></div>
              
              <Button 
                onClick={handleContactClick} 
                className="w-full bg-[#009200] text-white h-12 rounded-xl font-bold shadow-sm"
              >
                {t('navbar.contact')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;