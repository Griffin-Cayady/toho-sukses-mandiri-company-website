import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import AboutPage from '@/pages/AboutPage';
import { useLanguage } from '@/context/LanguageContext.jsx';
import ScrollToTop from '@/components/ScrollToTop';
import { SupabaseProvider } from '@/contexts/SupabaseContext.jsx';

function App() {
  const { language } = useLanguage();
  const title = language === 'id' ? 'CV Toho Sukses Mandiri | Distributor Oli Sugimura Kualitas Jepang' : 'CV Toho Sukses Mandiri | Japanese Quality Sugimura Oil Distributor';
  const description = language === 'id' 
    ? 'CV Toho Sukses Mandiri adalah distributor resmi oli Sugimura kualitas Jepang di Jakarta dan Indonesia. Kami menyediakan Sugilube, Sugigear, dan pelumas industri lainnya.'
    : 'CV Toho Sukses Mandiri is the official distributor of Japanese quality Sugimura oil in Jakarta and Indonesia. We provide Sugilube, Sugigear, and other industrial lubricants.';

  return (
    <SupabaseProvider>
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="icon" type="image/png" href="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/f0443b38fce01d321b711dee4881bf26.png" />
        </Helmet>
        
        <ScrollToTop />
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </SupabaseProvider>
  );
}

export default App;