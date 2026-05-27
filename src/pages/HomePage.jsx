import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, BarChart3, Clock, ShieldCheck, MapPin, Phone, Mail, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { useToast } from "@/components/ui/use-toast";
import { useSupabase } from '@/contexts/SupabaseContext.jsx';
import { supabase } from '@/lib/customSupabaseClient';
import { logSupabaseError } from '@/lib/supabaseDebug';

const HomePage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const location = useLocation();
  const { products, loading, error, refetch } = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (location.hash === '#contact-us') {
      const contactSection = document.getElementById('contact-us');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const bestSellingProducts = useMemo(() => {
    const bestSellingProductIds = [72, 77, 86, 104];
    if (loading) return [];
    const found = products.filter(p => bestSellingProductIds.includes(p.id));
    return found.length > 0 ? found : products.slice(0, 4);
  }, [products, loading]);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
      };

      const { error: insertError } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (insertError) throw insertError;

      toast({
        title: "Pesan Terkirim!",
        description: "Tim kami akan segera menghubungi Anda.",
      });
      e.target.reset();
    } catch (err) {
      logSupabaseError('handleContactSubmit', err);
      setSubmitError("Gagal terhubung ke database. Silakan hubungi kami langsung via Email atau Telepon.");
      toast({
        variant: "destructive",
        title: "Gagal Mengirim Pesan",
        description: "Terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuoteRequest = productName => {
    const subject = `Permintaan Penawaran: ${productName}`;
    const body = `Halo, saya tertarik untuk mendapatkan penawaran untuk ${productName}. Mohon hubungi saya mengenai harga dan ketersediaan.`;
    window.location.href = `mailto:tsm.metal.oil@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    toast({
      title: "Membuka Klien Email",
      description: "Mempersiapkan permintaan penawaran Anda..."
    });
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CV Toho Sukses Mandiri",
    "url": "https://tohosuksesmandiri.com",
    "logo": "https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/c727a0189b5f858e51d08b52b5a14b6e.jpg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-21-2262-4033",
      "contactType": "customer service"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CV Toho Sukses Mandiri",
    "image": "https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/c727a0189b5f858e51d08b52b5a14b6e.jpg",
    "telephone": "+62-21-2262-4033",
    "email": "tsm.metal.oil@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Hayam Wuruk, Gedung HWI Lindeteves Lt. 1 CKS-024",
      "addressLocality": "Jakarta Barat",
      "addressRegion": "DKI Jakarta",
      "addressCountry": "ID"
    },
    "areaServed": "Indonesia",
    "description": "Distributor resmi oli Jepang premium Sugimura di Jakarta Barat, melayani kebutuhan pelumas industri seluruh Indonesia."
  };

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    "itemListElement": bestSellingProducts.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "image": p.imageUrl || "https://images.unsplash.com/photo-1699373381566-296f6e3a96dc",
        "description": `Oli Jepang pelumas premium Sugimura. Kategori: ${p.category}. Kemasan: ${p.quantity} Liter.`,
        "brand": {
          "@type": "Brand",
          "name": "Sugimura"
        }
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Toho Sukses Mandiri - Distributor Oli Jepang Premium Sugimura</title>
        <meta name="description" content="CV Toho Sukses Mandiri adalah distributor resmi oli Jepang premium Sugimura. Maksimalkan efisiensi dan perpanjang umur mesin industri Anda dengan pelumas premium berkualitas." />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        {bestSellingProducts.length > 0 && <script type="application/ld+json">{JSON.stringify(productSchema)}</script>}
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1568099659323-b95d41d3dba3?w=1920&q=75&auto=format&fit=crop" alt="Mesin industri berat yang menggunakan oli Jepang pelumas premium" className="w-full h-full object-cover opacity-60" fetchpriority="high" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-[#009200]"></span>
              <span className="text-sm font-medium text-gray-200 tracking-wide uppercase">Distributor Resmi Oli Jepang Sejak 2019</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Maksimalkan Presisi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Industri.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light">
              Lindungi mesin anda dengan <strong className="text-white font-semibold">Pelumas Premium Sugimura</strong>. Diciptakan di Jepang untuk meningkatkan performa dan memperpanjang umur mesin anda hingga 2x lipat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button className="h-14 px-8 bg-[#009200] hover:bg-green-700 text-white text-lg font-semibold rounded-md w-full sm:w-auto transition-all duration-300 shadow-[0_0_20px_rgba(0,146,0,0.3)]">
                  Lihat Produk Oli Jepang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button onClick={() => document.getElementById('contact-us').scrollIntoView({ behavior: 'smooth' })} className="h-14 px-8 bg-gray-700 hover:bg-gray-800 text-white text-lg font-medium rounded-md w-full sm:w-auto transition-all duration-300">
                Minta Penawaran
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility */}
      <div className="bg-white border-b border-gray-100 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-center text-4xl font-black text-gray-900 mb-8 leading-tight">Sertifikasi & Kredibilitas</h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center transition-all duration-500">
             <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/iso-logo-1-zjUUq.jpeg" alt="Sertifikat ISO 9001 untuk kualitas distributor oli jepang" className="h-24 md:h-32 object-contain" loading="lazy" />
             <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/sni-logo-QipY4.jpeg" alt="Sertifikasi SNI Standar Nasional Indonesia untuk pelumas premium" className="h-20 md:h-24 object-contain" loading="lazy" />
             <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/iso-logo-2-39fK2.jpeg" alt="Sertifikat Akreditasi KAN untuk pelumas industri" className="h-24 md:h-32 object-contain" loading="lazy" />
          </div>
        </div>
      </div>

      {/* "Why Sugimura" */}
      <section className="bg-gray-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Jangan biarkan pelumas buruk <br /><span className="text-[#009200]">Menghentikan Produksi Anda.</span></h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">Kegagalan mesin bukan hanya ketidaknyamanan, itu adalah kerugian pendapatan. Formulasi oli Jepang Sugimura dirancang khusus sebagai pelumas premium untuk menahan lingkungan operasional suhu tinggi dan kelembaban tinggi disegala industri di Indonesia.</p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/5 p-3 rounded-lg border border-white/10"><BarChart3 className="h-6 w-6 text-[#009200]" /></div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">Peningkatan Efisiensi 30%</h3>
                    <p className="text-gray-500 text-sm mt-1">Pelumas premium terbukti mengurangi koefisien gesekan untuk sistem hidrolik industri.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/5 p-3 rounded-lg border border-white/10"><Clock className="h-6 w-6 text-[#009200]" /></div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">Interval Perawatan 2x Lebih Lama</h3>
                    <p className="text-gray-500 text-sm mt-1">Aditif tahan lama oli Jepang berarti lebih sedikit penggantian pelumas dan waktu henti produksi.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-white/5 p-3 rounded-lg border border-white/10"><ShieldCheck className="h-6 w-6 text-[#009200]" /></div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-white">Nol Risiko Pemalsuan</h3>
                    <p className="text-gray-500 text-sm mt-1">Langsung dari sumber distributor oli jepang resmi. Dijamin kelas industri premium.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#009200]/20 blur-2xl rounded-full"></div>
              <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/0a66034f90d2bcb7-ifU3b.png" alt="Mesin industri berat di pabrik manufaktur yang menggunakan pelumas premium" className="relative rounded-lg shadow-2xl border border-white/10" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[#009200] font-bold tracking-wider uppercase text-sm">Katalog Pelumas Premium</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2">Diciptakan untuk Performa Tinggi</h2>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-gray-600 hover:text-[#009200] font-medium transition-colors">
              Lihat Semua Oli Jepang <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {error && <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-4 mb-6 flex items-center gap-3 text-yellow-800">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">Server sedang tidak dapat dijangkau. Menampilkan data katalog offline.</p>
            </div>}
            
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? [1, 2, 3, 4].map(i => <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-xl"></div>) : bestSellingProducts.map((product) => (
              <div key={product.id}>
                <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-gray-200 group overflow-hidden bg-white">
                  <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden border-b border-gray-100">
                    <img src={product.imageUrl} alt={`Produk oli Jepang pelumas premium ${product.name}`} className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition-transform duration-500" onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1699373381566-296f6e3a96dc'; }} />
                  </div>
                  <CardHeader className="p-5 pb-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-[#009200] transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wide">{product.category}</p>
                  </CardHeader>
                  <CardContent className="px-5 py-2 flex-grow">
                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                      <span className="text-gray-500">Kemasan</span>
                      <span className="font-semibold text-gray-900">{product.quantity} Liter</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-5 pt-2 flex gap-3">
                    <Button className="flex-1 bg-[#009200] hover:bg-[#007a00] text-white shadow-sm" onClick={() => handleQuoteRequest(product.name)}>Minta Penawaran</Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link to="/products"><Button variant="outline" className="w-full">Lihat Katalog Oli Jepang Lengkap</Button></Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Hubungi Kami</h2>
            <p className="text-xl text-gray-600">Dapatkan penawaran khusus atau konsultasi gratis pelumas premium hari ini. Tim kami siap membantu segala kebutuhan oli untuk mesin industri Anda.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
            <div className="bg-gray-900 p-10 md:w-2/5 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-6">Info Kontak</h3>
                <div className="space-y-6">
                  <div className="flex items-start"><MapPin className="h-6 w-6 text-[#009200] mr-4 mt-1 flex-shrink-0" /><p className="text-gray-300 text-sm">Jl. Hayam Wuruk, Gedung HWI Lindeteves Lt. 1 CKS-024, Jakarta Barat</p></div>
                  <div className="flex items-center"><Phone className="h-6 w-6 text-[#009200] mr-4 flex-shrink-0" /><p className="text-gray-300 text-sm">(021) 2262-4033</p></div>
                  <div className="flex items-center"><Mail className="h-6 w-6 text-[#009200] mr-4 flex-shrink-0" /><p className="text-gray-300 text-sm">tsm.metal.oil@gmail.com</p></div>
                </div>
              </div>
            </div>
            <div className="p-10 md:w-3/5 bg-white">
              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-3 text-sm">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>{submitError}</p>
                </div>
              )}
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-medium text-black">Nama Lengkap</Label>
                    <Input id="name" name="name" required placeholder="Nama Anda" className="bg-gray-50 border-gray-200 focus:border-[#009200] focus:ring-[#009200] text-gray-900" />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="phone" className="text-gray-700 font-medium text-black">Nomor Telepon</Label>
                     <Input id="phone" name="phone" required placeholder="+62..." className="bg-gray-50 border-gray-200 focus:border-[#009200] focus:ring-[#009200] text-gray-900" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium text-black">Email Perusahaan</Label>
                  <Input id="email" name="email" type="email" required placeholder="email@perusahaan.com" className="bg-gray-50 border-gray-200 focus:border-[#009200] focus:ring-[#009200] text-gray-900" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium text-black">Kebutuhan Pelumas Premium Anda?</Label>
                  <Textarea id="message" name="message" required rows={4} placeholder="Saya tertarik dengan oli Jepang tipe..." className="bg-gray-50 border-gray-200 focus:border-[#009200] focus:ring-[#009200] text-gray-900" />
                </div>
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-[#009200] hover:bg-green-700 text-white font-bold h-12 text-base">
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</> : 'Kirim Permintaan'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default HomePage;