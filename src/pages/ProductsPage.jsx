import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from '@/contexts/SupabaseContext.jsx';

const ProductsPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { products, loading, error, refetch } = useSupabase();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 24 : 12;

  const categories = useMemo(() => {
    if (loading) return [];
    const all = [...new Set(products.map(p => p.category))].sort();
    return ['All', ...all];
  }, [products, loading]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, searchQuery]);

  const handleQuoteRequest = (productName) => {
    const subject = `Permintaan Penawaran: ${productName}`;
    const body = `Halo, saya tertarik untuk mendapatkan penawaran untuk ${productName}. Mohon hubungi saya mengenai harga dan ketersediaan.`;
    window.location.href = `mailto:tsm.metal.oil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    toast({
      title: "Membuka Klien Email",
      description: "Mempersiapkan permintaan penawaran Anda...",
    });
  };

  const handleDownloadBrochure = () => {
    window.open("https://drive.google.com/file/d/1JQPmUD80tka2l-pSpQoZWw05DqHQk61b/view?usp=sharing", '_blank');
    toast({
      title: "Mengunduh Brosur",
      description: "Membuka katalog produk di tab baru.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Katalog Produk | Toho Sukses Mandiri</title>
        <meta name="description" content="Jelajahi katalog lengkap pelumas Sugimura rekayasa Jepang kami." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-yellow-800">Menampilkan Data Offline</h3>
                <p className="text-sm text-yellow-700 mt-1">{error}</p>
                <Button onClick={refetch} variant="link" className="p-0 h-auto text-yellow-800 font-semibold mt-2 flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" /> Coba sambungkan ulang
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sticky top-28">
                <div className="flex items-center gap-2 mb-4 text-gray-900 font-semibold">
                  <Filter className="h-4 w-4" />
                  <span>Filter Kategori</span>
                </div>
                
                {loading ? (
                   <div className="space-y-2 animate-pulse">
                     {[1,2,3,4,5].map(i => <div key={i} className="h-8 bg-gray-100 rounded"></div>)}
                   </div>
                ) : (
                  <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 flex justify-between items-center group ${
                          selectedCategory === cat 
                            ? 'bg-green-50 text-[#009200] font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        {selectedCategory === cat && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </aside>

            <main className="flex-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Katalog Produk</h1>
                    <p className="text-sm text-gray-500 mt-1">
                      {loading ? "Memuat inventaris..." : `Menampilkan ${filteredProducts.length} pelumas premium`}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-grow md:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Cari berdasarkan nama..." 
                        className="pl-9 bg-gray-50 border-gray-200 focus:ring-[#009200] focus:border-[#009200]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleDownloadBrochure}
                      className="hidden sm:flex gap-2 border-gray-300 text-gray-700 hover:text-[#009200] hover:border-[#009200]"
                    >
                      <Download className="h-4 w-4" />
                      <span>Katalog</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Filter Dropdown */}
              <div className="md:hidden mb-6 relative z-30">
                <Button 
                  onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                  className="w-full bg-white border border-gray-200 text-gray-900 justify-between items-center h-12 shadow-sm"
                  variant="outline"
                  disabled={loading}
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#009200]" />
                    <span className="font-medium">
                      Kategori: {selectedCategory}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileFilterOpen ? 'rotate-180' : ''}`} />
                </Button>

                <AnimatePresence>
                  {isMobileFilterOpen && !loading && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto"
                    >
                      <div className="p-2 space-y-1">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsMobileFilterOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm rounded-md transition-all duration-200 flex justify-between items-center ${
                              selectedCategory === cat 
                                ? 'bg-green-50 text-[#009200] font-medium' 
                                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                            }`}
                          >
                            <span>{cat}</span>
                            {selectedCategory === cat && <CheckCircle2 className="h-4 w-4" />}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
                  {[1,2,3,4,5,6].map((n) => (
                    <div key={n} className="bg-white rounded-xl h-64 md:h-96 border border-gray-100 shadow-sm animate-pulse flex flex-col">
                      <div className="h-32 md:h-48 bg-gray-100 w-full"></div>
                      <div className="p-3 md:p-4 space-y-3 flex-1">
                        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-100 rounded w-full mt-4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 md:p-12 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                  </div>
                  <h3 className="text-base md:text-lg font-medium text-gray-900">Tidak ada produk ditemukan</h3>
                  <p className="text-sm md:text-base text-gray-500 mt-1">Coba sesuaikan kriteria pencarian atau filter Anda.</p>
                  <Button 
                    variant="link" 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    className="mt-4 text-[#009200]"
                  >
                    Hapus semua filter
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6">
                    <AnimatePresence mode='popLayout'>
                      {paginatedProducts.map((product, idx) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2, delay: idx * 0.05 }}
                          layout
                        >
                          <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-gray-200 group overflow-hidden bg-white">
                            <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden border-b border-gray-100">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-contain p-4 md:p-6 transform group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://images.unsplash.com/photo-1699373381566-296f6e3a96dc' }}
                              />
                            </div>
                            <CardHeader className="p-3 md:p-5 pb-1 md:pb-2">
                              <h3 className="font-bold text-sm md:text-lg text-gray-900 leading-tight group-hover:text-[#009200] transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-[10px] md:text-xs text-gray-500 font-medium mt-1 md:mt-1.5 uppercase tracking-wide truncate">
                                {product.category}
                              </p>
                            </CardHeader>
                            <CardContent className="px-3 md:px-5 py-1 md:py-2 flex-grow">
                              <div className="mt-2 md:mt-4 pt-2 md:pt-4 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between text-xs md:text-sm gap-1 md:gap-0">
                                <span className="text-gray-500 hidden md:inline">Kemasan</span>
                                <span className="font-semibold text-gray-900">{product.quantity} Liter</span>
                              </div>
                            </CardContent>
                            <CardFooter className="p-3 md:p-5 pt-2 md:pt-2 flex gap-3">
                              <Button 
                                className="w-full bg-[#009200] hover:bg-[#007a00] text-white shadow-sm text-xs md:text-sm h-8 md:h-10 px-2 md:px-4"
                                onClick={() => handleQuoteRequest(product.name)}
                              >
                                Penawaran
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 md:mt-12">
                      <Button
                        variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-auto md:w-24 text-xs md:text-sm px-2 md:px-3"
                      >
                        <span className="hidden md:inline">Sebelumnya</span>
                        <span className="md:hidden">{'<'}</span>
                      </Button>
                      <span className="text-xs md:text-sm font-medium text-gray-600 px-2 md:px-4 whitespace-nowrap">
                        Hal {currentPage} / {totalPages}
                      </span>
                      <Button
                        variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-auto md:w-24 text-xs md:text-sm px-2 md:px-3"
                      >
                        <span className="hidden md:inline">Berikutnya</span>
                        <span className="md:hidden">{'>'}</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;