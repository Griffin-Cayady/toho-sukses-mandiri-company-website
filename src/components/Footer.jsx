import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, Factory, FileCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleLinkClick = (feature) => {
    toast({
      title: "Coming Soon",
      description: `The ${feature} page is currently under development.`,
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#contact-us';
    }
  };

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-800 font-sans">
      {/* The pre-footer CTA strip has been removed as per user request */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* 1. Brand Block - 4 Columns */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-[#009200]/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                <img 
                  src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/c727a0189b5f858e51d08b52b5a14b6e.jpg" 
                  alt="Toho Sukses Mandiri Logo" 
                  className="relative h-11 w-11 object-contain bg-white rounded-full p-0.5 shadow-sm border border-gray-800" 
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-black text-lg leading-tight text-white tracking-tight group-hover:text-[#009200] transition-colors">
                  Toho Sukses Mandiri
                </span>
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Sugimura Oil Distributor
                </span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed pr-4">
              Distributor resmi Sugimura Oil. Membawa kualitas Jepang ke industri Indonesia sejak 2009.
            </p>
          </div>

          {/* 2. Navigation - 2 Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider text-[#009200]">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#009200] transition-all"></span>{t('navbar.home')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#009200] transition-all"></span>{t('navbar.about')}</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"><span className="w-0 group-hover:w-2 h-px bg-[#009200] transition-all"></span>{t('navbar.products')}</Link></li>
              <li><button onClick={scrollToContact} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group text-left"><span className="w-0 group-hover:w-2 h-px bg-[#009200] transition-all"></span>Contact Us</button></li>
            </ul>
          </div>

          {/* 3. Products - 3 Columns */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider text-[#009200]">Solutions</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors block">Industrial Oils</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors block">Automotive Oils</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors block">Hydraulic Fluids</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors block">Specialty Lubricants</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info - 3 Columns */}
          <div className="lg:col-span-3">
             <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider text-[#009200]">Contact</h4>
             <ul className="space-y-4">
               <li className="flex items-start gap-3 text-sm text-gray-400 group">
                 <MapPin className="h-5 w-5 text-gray-600 group-hover:text-[#009200] transition-colors shrink-0 mt-0.5" />
                 <span className="leading-snug hover:text-gray-300 transition-colors">Jl. Hayam Wuruk, Gedung HWI Lindeteves Lt. 1 CKS-024, Jakarta Barat</span>
               </li>
               <li className="flex items-center gap-3 text-sm text-gray-400 group">
                 <Phone className="h-5 w-5 text-gray-600 group-hover:text-[#009200] transition-colors shrink-0" />
                 <span className="hover:text-gray-300 transition-colors">(021) 2262-4033</span>
               </li>
               <li className="flex items-center gap-3 text-sm text-gray-400 group">
                 <Mail className="h-5 w-5 text-gray-600 group-hover:text-[#009200] transition-colors shrink-0" />
                 <span className="hover:text-gray-300 transition-colors">tsm.metal.oil@gmail.com</span>
               </li>
             </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2025 CV Toho Sukses Mandiri. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <button onClick={() => handleLinkClick('Privacy')} className="hover:text-gray-400 transition-colors">Privacy Policy</button>
            <button onClick={() => handleLinkClick('Terms')} className="hover:text-gray-400 transition-colors">Terms of Service</button>
            <button onClick={() => handleLinkClick('Sitemap')} className="hover:text-gray-400 transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;