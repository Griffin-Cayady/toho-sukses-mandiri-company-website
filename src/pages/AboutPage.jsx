import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext.jsx';
import { CheckCircle2, Award, Users, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const {
    t
  } = useLanguage();
  const navigate = useNavigate();
  const benefits = [{
    icon: ShieldCheck,
    text: "Standar Kualitas Jepang"
  }, {
    icon: Award,
    text: "Sertifikasi Internasional"
  }, {
    icon: Clock,
    text: "Pengiriman Tepat Waktu"
  }];
  const stats = [{
    number: "8+",
    label: "Tahun Pengalaman"
  }, {
    number: "100+",
    label: "Perusahaan Industri"
  }, {
    number: "98%",
    label: "Tingkat Kepuasan"
  }, {
    number: "24/7",
    label: "Layanan Pelanggan"
  }];
  const certifications = [{
    name: "ISO 9001:2015",
    desc: "Sistem Manajemen Mutu"
  }, {
    name: "ISO 14001:2015",
    desc: "Sistem Manajemen Lingkungan"
  }, {
    name: "SNI",
    desc: "Standar Nasional Indonesia"
  }];
  const clientLogos = [{
    name: "PT. TOYOTA MOTOR MANUFACTURING INDONESIA"
  }, {
    name: "PT. ASTRA DAIHATSU MOTOR"
  }, {
    name: "PT. KOMATSU UNDERCARRIAGE INDONESIA"
  }, {
    name: "PT UNITED STEEL CENTER INDONESIA"
  }, {
    name: "PT. PANASONIC GOBEL LIFE SOLUTION"
  }, {
    name: "PT. KOBELCO TRADING INDONESIA"
  }];
  const handleContactClick = () => {
    navigate('/#contact-us');
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CV Toho Sukses Mandiri",
    "url": "https://tohosuksesmandiri.com",
    "logo": "https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/c727a0189b5f858e51d08b52b5a14b6e.jpg",
    "description": "Distributor resmi oli Sugimura kualitas Jepang di Jakarta dengan pengalaman melayani klien industri. Bersertifikasi ISO & API.",
    "foundingDate": "2009",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Hayam Wuruk, Gedung HWI Lindeteves Lt. 1 CKS-024",
      "addressLocality": "Jakarta Barat",
      "addressCountry": "ID"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-21-2262-4033",
      "contactType": "customer service",
      "email": "tsm.metal.oil@gmail.com"
    }
  };
  return <>
      <Helmet>
        <title>Tentang Toho Sukses Mandiri - Distributor Oli Jepang Berkualitas</title>
        <meta name="description" content="Tentang CV Toho Sukses Mandiri, distributor resmi oli Jepang berkualitas premium (Sugimura) di Jakarta dengan lebih dari 8 tahun pengalaman mendistribusikan pelumas industri terbaik." />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="bg-white text-black">
        {/* Hero Section */}
        <section className="relative h-[70vh] md:h-[85vh]">
          <div className="absolute inset-0">
            <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/305e0b34b9f3debf-dXKFF.png" alt="Fasilitas penyimpanan pelumas industri premium Sugimura" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <motion.div initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="max-w-3xl">
              <div className="mb-6 flex items-center space-x-3">
                <div className="h-1 w-16 bg-[#009200]"></div>
                <span className="text-[#009200] font-semibold text-sm tracking-wider uppercase">Distributor Resmi Oli Jepang</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                Kualitas Jepang.<br />
                <span className="text-[#FFF101]">Kepercayaan Indonesia.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light leading-relaxed">Lebih dari 100+ perusahaan industri telah memercayai pelumas premium Sugimura sebagai solusi oli Jepang berkualitas.</p>

              <div className="flex flex-wrap gap-4 mb-8">
                {benefits.map((benefit, index) => <div key={index} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <benefit.icon className="h-5 w-5 text-[#009200]" />
                    <span className="text-white text-sm font-medium">{benefit.text}</span>
                  </div>)}
              </div>

              <Button onClick={handleContactClick} className="bg-[#009200] hover:bg-[#007700] text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                Konsultasi Gratis Sekarang
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#009200] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-sm md:text-base text-white/90 font-medium">{stat.label}</div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="lg:col-span-2">
                <div className="sticky top-24">
                  <div className="mb-4">
                    <span className="text-[#009200] font-bold text-sm tracking-wider uppercase">Sejarah Perusahaan Kami Sejak 2009</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">Partner Terpercaya Perusahaan Industri</h2>
                  <div className="h-1 w-24 bg-[#009200] mb-6"></div>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} className="lg:col-span-3 space-y-8">
                <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-[#009200]">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mengapa Memilih Pelumas Premium Sugimura?</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    Sebagai distributor resmi oli Jepang, misi kami adalah menghadirkan pelumas premium dengan teknologi formulasi Jepang yang telah terbukti meningkatkan efisiensi mesin hingga 30% dan memperpanjang interval perawatan hingga 2x lipat di industri Indonesia. Keahlian kami dalam distribusi oli Jepang premium menjamin keaslian dan kualitas tiap produk.
                  </p>
                  <div className="space-y-3">
                    {["Formulasi oli Jepang khusus untuk iklim tropis Indonesia", "Perlindungan pelumas premium pada suhu ekstrem", "Mengurangi konsumsi bahan bakar hingga 15%", "Meminimalkan downtime operasional manufaktur"].map((item, index) => <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-6 w-6 text-[#009200] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/laboratorium-csmrp.png" alt="Fasilitas manufaktur oli Jepang premium Sugimura" className="rounded-xl shadow-lg h-48 w-full object-cover" />
                  <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/gudang-WT6J5.png" alt="Laboratorium quality control pelumas premium industri" className="rounded-xl shadow-lg h-48 w-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Standar Tertinggi, Terjamin</h2>
              <p className="text-xl text-gray-400">Sertifikasi internasional yang membuktikan komitmen distributor oli Jepang berkualitas kami</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {certifications.map((cert, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }} viewport={{
              once: true
            }} className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-[#009200] transition-all duration-300">
                  <Award className="h-12 w-12 text-[#009200] mb-4" />
                <h3 className="text-2xl font-bold mb-2">{cert.name}</h3>
                <p className="text-l text-gray-400">{cert.desc}</p>
                </motion.div>)}
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hidden md:block">
              <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/24200142-9abd-4aaa-889d-6c2062a46193-Ft5vl.jpeg" alt="Sertifikasi ISO dan jaminan mutu oli Sugimura" className="w-full h-64 object-cover rounded-xl mb-6" />
            </div>
          </div>
        </section>

        {/* Trusted Clients */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Dipercaya Pemimpin Industri
              </h2>
              <p className="text-xl text-gray-600">Lebih dari 100 perusahaan industri di Indonesia sudah memercayai produk Sugimura Oil.</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {clientLogos.map((client, index) => <motion.div key={index} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: index * 0.05
            }} viewport={{
              once: true
            }} className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-[#009200] hover:shadow-lg transition-all duration-300 text-center flex items-center justify-center min-h-[120px]">
                  <div className="text-sm md:text-base font-bold text-gray-900 leading-tight">{client.name}</div>
                </motion.div>)}
            </div>

            <div className="bg-gradient-to-r from-[#009200] to-[#007700] p-12 rounded-2xl text-center text-white">
              <TrendingUp className="h-16 w-16 mx-auto mb-6 text-white" />
              <h3 className="text-3xl font-bold mb-4">Bergabung dengan 100+ Perusahaan Lainnya</h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Tingkatkan efisiensi operasional Anda dengan pelumas kualitas Jepang yang terbukti
              </p>
              <Button onClick={handleContactClick} className="bg-white text-[#009200] hover:bg-gray-100 px-8 py-6 text-lg font-bold rounded-lg shadow-xl">
                Dapatkan Penawaran Khusus
              </Button>
            </div>
          </div>
        </section>

        {/* Real Impact */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <img src="https://horizons-cdn.hostinger.com/d0add064-3096-4fce-8785-3403938947b9/0a66034f90d2bcb7-acJGA.png" alt="Gudang penyimpanan inventaris produk pelumas premium" className="rounded-2xl shadow-2xl" />
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }}>
                <div className="mb-4">
                  <span className="text-[#009200] font-bold text-sm tracking-wider uppercase">Bukti Nyata</span>
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-6">
                  Hasil yang Terukur untuk Bisnis Anda
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#009200]">
                    <div className="text-3xl font-black text-[#009200] mb-2">30%</div>
                    <p className="text-gray-700 font-semibold">Peningkatan efisiensi pada mesin industri</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#FFF101]">
                    <div className="text-3xl font-black text-gray-900 mb-2">2x</div>
                    <p className="text-gray-700 font-semibold">Perpanjangan interval perawatan untuk armada transportasi dan logistik menggunakan oli Jepang kami</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#009200]">
                    <div className="text-3xl font-black text-[#009200] mb-2">15%</div>
                    <p className="text-gray-700 font-semibold">Pengurangan konsumsi bahan bakar pada mesin diesel industri dengan pelumas premium</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default AboutPage;