import { useState, useEffect, useRef } from "react";
import {
  BookOpen, Code2, Users, BarChart2, Star, CheckCircle,
  ArrowRight, MessageCircle, Award, Zap, Clock, TrendingUp,
  ChevronDown, Play, Sparkles, Target, Shield, Phone,
  Menu, X, ExternalLink, BadgeCheck,
  GraduationCap, Briefcase, LineChart, Cpu
} from "lucide-react";

// Custom SVG icons untuk platform sosial (tidak tersedia di versi lucide-react ini)
const Instagram = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Youtube = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>
);

/* ================================================================
   ✏️  DATA PRODUK — Edit bagian ini untuk mengubah konten kartu
   ================================================================ */
const PRODUCTS = [
  {
    id: 1,
    icon: "Cpu",
    badge: "Terlaris",
    badgeColor: "emerald",
    category: "Workshop & Kelas",
    title: "Kelas Excel & Otomasi Office",
    desc: "Kuasai formula advanced, Power Query, dan otomasi laporan dengan macro. Dari nol hingga siap kerja dalam 6 minggu.",
    price: "Rp 499.000",
    priceNote: "sekali bayar · akses seumur hidup",
    highlights: ["Rekaman HD 40+ jam", "File latihan siap pakai", "Grup alumni eksklusif"],
    ctaLabel: "Daftar Sekarang",
    ctaLink: "#", // ← Ganti dengan link Midtrans / Tokopedia / dll
    popular: true,
  },
  {
    id: 2,
    icon: "Code2",
    badge: "Custom",
    badgeColor: "navy",
    category: "Jasa Pembuatan Sistem",
    title: "Sistem Otomasi Google Apps Script",
    desc: "Kami bangunkan sistem otomasi bisnis kustom: laporan otomatis, manajemen data, integrasi API — sesuai kebutuhan Anda.",
    price: "Mulai Rp 1.500.000",
    priceNote: "harga sesuai scope proyek",
    highlights: ["Konsultasi kebutuhan gratis", "Pengerjaan 7–14 hari kerja", "Garansi revisi 30 hari"],
    ctaLabel: "Konsultasi Gratis",
    ctaLink: "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20sistem%20GAS", // ← Ganti nomor WA
    popular: false,
  },
  {
    id: 3,
    icon: "Users",
    badge: "Eksklusif",
    badgeColor: "amber",
    category: "Mentoring 1-on-1",
    title: "Leadership & Manajemen Tim",
    desc: "Sesi mentoring private bersama praktisi 15+ tahun. Bahas strategi kepemimpinan, rekrutmen, dan manajemen kinerja tim Anda.",
    price: "Rp 350.000 / sesi",
    priceNote: "sesi 60 menit via Zoom",
    highlights: ["Jadwal fleksibel", "Materi disesuaikan kondisi nyata", "Follow-up via chat 7 hari"],
    ctaLabel: "Booking Sesi",
    ctaLink: "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20booking%20sesi%20mentoring", // ← Ganti nomor WA
    popular: false,
  },
  {
    id: 4,
    icon: "LineChart",
    badge: "Spesialis",
    badgeColor: "blue",
    category: "Pelatihan Spesialis",
    title: "Analisis Kredit & Keuangan",
    desc: "Pelatihan intensif analisis laporan keuangan, credit scoring, dan pengambilan keputusan kredit berbasis data nyata perbankan.",
    price: "Rp 799.000",
    priceNote: "termasuk modul & sertifikat",
    highlights: ["Studi kasus bank nyata", "Simulasi komite kredit", "Sertifikat kompetensi"],
    ctaLabel: "Daftar Sekarang",
    ctaLink: "#", // ← Ganti dengan link pendaftaran
    popular: false,
  },
];

/* ================================================================
   ✏️  KONFIGURASI UMUM — Ganti sesuai profil bisnis Anda
   ================================================================ */
const CONFIG = {
  brandName: "Tutoria",          // ← Nama brand utama
  brandSuffix: "Indonesia",      // ← Sufiks (akan berwarna emerald)
  headline: "Mentor Karir Kamu,",
  headlineLine2: "Tingkatkan Efisiensi.",
  subHeadline: "Program pelatihan & layanan digital oleh praktisi 15+ tahun — untuk profesional yang ingin naik level lebih cepat.",
  whatsappNumber: "6282376790296",       // ← Nomor WA tanpa tanda +
  whatsappText: "Halo%20Tutoria%20Indonesia%2C%20saya%20ingin%20tahu%20lebih%20lanjut", // URL encoded
  instagramLink: "https://www.instagram.com/tutoriaindonesia/", // ← Link IG
  youtubeLink: "https://www.youtube.com/@TutoriaIndonesia",    // ← Link YouTube
  mentorName: "Vindri Hardiansyah",       // ← Nama mentor
  mentorTitle: "Senior Data Analyst & Visualization",
  mentorExp: "15+ Tahun Pengalaman",
  mentorCompanies: "BFI Finance Indonesia Tbk",
  mentorBio: "Lebih dari 15 tahun berpengalaman di bidang analisis kredit, otomasi proses bisnis, dan pengelolaan data management meliputi visualisasi, modelling dan pengelolaan  swasta nasional. Telah melatih lebih dari 1.000 profesional aktif.",
};

/* ================================================================ */

// waLink ditaruh di module scope agar bisa diakses ProductCard & komponen lain
const waLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${CONFIG.whatsappText}`;

const IconMap = { Cpu, Code2, Users, LineChart, BookOpen, BarChart2 };

const badgeStyles = {
  emerald: { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
  navy:    { bg: "#dbeafe", color: "#1e3a8a", dot: "#3b82f6" },
  amber:   { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  blue:    { bg: "#e0f2fe", color: "#075985", dot: "#0ea5e9" },
};

// Custom hook: intersection observer
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// Animated number
function AnimNum({ target, suffix = "", prefix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(target);
    let start = 0;
    const steps = 50;
    const inc = num / steps;
    const iv = setInterval(() => {
      start += inc;
      if (start >= num) { setVal(num); clearInterval(iv); }
      else setVal(Math.floor(start));
    }, duration / steps);
    return () => clearInterval(iv);
  }, [inView]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// Product Card
function ProductCard({ product, index }) {
  const [ref, inView] = useInView();
  const Icon = IconMap[product.icon] || BookOpen;
  const badge = badgeStyles[product.badgeColor] || badgeStyles.emerald;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        background: "#fff",
        borderRadius: "20px",
        border: product.popular ? "2px solid #10b981" : "1.5px solid #e2e8f0",
        boxShadow: product.popular ? "0 8px 32px rgba(16,185,129,0.12)" : "0 2px 16px rgba(0,0,0,0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: `opacity 0.55s ease ${index * 0.1}s, transform 0.55s ease ${index * 0.1}s, box-shadow 0.25s ease`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 20px 48px rgba(30,58,138,0.13)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = product.popular ? "0 8px 32px rgba(16,185,129,0.12)" : "0 2px 16px rgba(0,0,0,0.06)";
      }}
    >
      {/* Popular ribbon */}
      {product.popular && (
        <div style={{
          position: "absolute", top: 0, right: 0,
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "#fff", fontSize: "0.7rem", fontWeight: 700,
          padding: "5px 16px 5px 20px",
          borderBottomLeftRadius: "12px",
          letterSpacing: "0.06em",
        }}>⭐ TERLARIS</div>
      )}

      {/* Card Header */}
      <div style={{ padding: "28px 28px 20px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
          <div style={{
            width: 48, height: 48, borderRadius: "14px", flexShrink: 0,
            background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={22} color="#1e3a8a" />
          </div>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: badge.bg, color: badge.color,
              padding: "3px 10px", borderRadius: "6px",
              fontSize: "0.7rem", fontWeight: 700, marginBottom: "6px",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: badge.dot, display: "inline-block" }} />
              {product.category}
            </div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.3 }}>
              {product.title}
            </h3>
          </div>
        </div>
        <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: "0" }}>
          {product.desc}
        </p>
      </div>

      {/* Highlights */}
      <div style={{ padding: "18px 28px", flex: 1 }}>
        {product.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: i < product.highlights.length - 1 ? "9px" : 0 }}>
            <CheckCircle size={14} color="#10b981" />
            <span style={{ fontSize: "0.83rem", color: "#475569" }}>{h}</span>
          </div>
        ))}
      </div>

      {/* Pricing + CTA */}
      <div style={{ padding: "20px 28px 24px", borderTop: "1px solid #f1f5f9" }}>
        <div style={{ marginBottom: "14px" }}>
          <span style={{ fontSize: "1.35rem", fontWeight: 900, color: "#1e3a8a" }}>{product.price}</span>
          <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "2px" }}>{product.priceNote}</div>
        </div>
        <a
          href={product.ctaLink}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            width: "100%", padding: "13px 20px",
            background: product.popular
              ? "linear-gradient(135deg, #10b981, #059669)"
              : "linear-gradient(135deg, #1e3a8a, #1e40af)",
            color: "#fff", borderRadius: "12px",
            fontWeight: 700, fontSize: "0.9rem",
            textDecoration: "none",
            transition: "filter 0.2s, transform 0.15s",
            boxShadow: product.popular ? "0 4px 16px rgba(16,185,129,0.3)" : "0 4px 16px rgba(30,58,138,0.25)",
          }}
          onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.08)"; e.currentTarget.style.transform = "scale(1.01)"; }}
          onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          {product.ctaLabel} <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

export default function TutoriaIndonesia() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Program", href: "#programs" },
    { label: "Tentang", href: "#about" },
    { label: "Keunggulan", href: "#benefits" },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#f8fafc", color: "#0f172a", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Sora:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #1e3a8a; border-radius: 4px; }
        a { text-decoration: none; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-wa {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          70% { box-shadow: 0 0 0 14px rgba(37,211,102,0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .hero-animate { animation: fadeSlideUp 0.7s ease both; }
        .wa-float { animation: pulse-wa 2.2s ease infinite; }
        .float-anim { animation: float 4s ease-in-out infinite; }

        .nav-link { color: #475569; font-weight: 600; font-size: 0.9rem; transition: color 0.2s; }
        .nav-link:hover { color: #1e3a8a; }

        .benefit-card:hover .benefit-icon { transform: scale(1.12) rotate(-3deg); }
        .benefit-icon { transition: transform 0.3s ease; }

        @media (max-width: 768px) {
          .programs-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-row { grid-template-columns: repeat(2, 1fr) !important; }
          .desktop-nav { display: none !important; }
          .mobile-btn { display: flex !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-badges { flex-wrap: wrap !important; }
        }
        @media (min-width: 769px) {
          .mobile-btn { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>

      {/* ── FLOATING WHATSAPP BUTTON ── */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        style={{
          position: "fixed", bottom: 28, right: 24, zIndex: 9999,
          width: 58, height: 58, borderRadius: "50%",
          background: "linear-gradient(135deg, #25D366, #128C7E)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 6px 24px rgba(37,211,102,0.45)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        title="Chat via WhatsApp"
      >
        <MessageCircle size={26} color="#fff" fill="#fff" />
      </a>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 68,
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center",
        padding: "0 5%",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "11px",
            background: "linear-gradient(135deg, #1e3a8a, #1e40af)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(30,58,138,0.3)",
          }}>
            <GraduationCap size={20} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#1e3a8a" }}>
            {CONFIG.brandName}<span style={{ color: "#10b981" }}>{CONFIG.brandSuffix}</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <a href={waLink} target="_blank" rel="noreferrer" style={{
            display: "flex", alignItems: "center", gap: "7px",
            background: "linear-gradient(135deg, #10b981, #059669)",
            color: "#fff", padding: "10px 20px", borderRadius: "10px",
            fontWeight: 700, fontSize: "0.875rem",
            boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
            transition: "transform 0.2s, filter 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.filter = "brightness(1.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}>
            <MessageCircle size={15} /> Konsultasi Gratis
          </a>
        </div>

        {/* Mobile menu btn */}
        <button className="mobile-btn" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#1e3a8a", padding: "4px" }}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="mobile-drawer" style={{
          position: "fixed", top: 68, left: 0, right: 0, zIndex: 999,
          background: "#fff", borderBottom: "1px solid #e2e8f0",
          padding: "20px 5% 28px",
          display: "flex", flexDirection: "column", gap: "18px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ color: "#1e3a8a", fontWeight: 700, fontSize: "1.05rem" }}>{l.label}</a>
          ))}
          <a href={waLink} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "#fff", padding: "13px", borderRadius: "12px",
              fontWeight: 700, fontSize: "1rem",
            }}>
            <MessageCircle size={17} /> Konsultasi via WhatsApp
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 5% 60px",
        background: "linear-gradient(160deg, #eff6ff 0%, #f0fdf4 40%, #f8fafc 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(30,58,138,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "2%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Floating shapes */}
        <div className="float-anim" style={{
          position: "absolute", top: "15%", right: "8%",
          width: 72, height: 72, borderRadius: "20px",
          background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
          opacity: 0.12,
        }} />
        <div className="float-anim" style={{
          position: "absolute", bottom: "20%", right: "15%",
          width: 44, height: 44, borderRadius: "14px",
          background: "linear-gradient(135deg, #10b981, #059669)",
          opacity: 0.15, animationDelay: "1s",
        }} />

        <div style={{ maxWidth: 700, position: "relative", zIndex: 1 }}>
          {/* Pill badge */}
          <div className="hero-animate" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
            color: "#059669", padding: "7px 16px", borderRadius: "30px",
            fontSize: "0.82rem", fontWeight: 700, marginBottom: "24px",
            animationDelay: "0s",
          }}>
            <Sparkles size={13} /> Platform Pelatihan Profesional Indonesia
          </div>

          <h1 className="hero-animate" style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
            fontWeight: 800, lineHeight: 1.12,
            color: "#0f172a", marginBottom: "6px",
            letterSpacing: "-0.03em",
            animationDelay: "0.1s",
          }}>
            {CONFIG.headline}
          </h1>
          <h1 className="hero-animate" style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
            fontWeight: 800, lineHeight: 1.12,
            marginBottom: "24px",
            letterSpacing: "-0.03em",
            animationDelay: "0.18s",
            background: "linear-gradient(135deg, #1e3a8a 0%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {CONFIG.headlineLine2}
          </h1>

          <p className="hero-animate" style={{
            fontSize: "1.1rem", color: "#64748b", lineHeight: 1.75,
            maxWidth: 560, marginBottom: "36px",
            animationDelay: "0.28s",
          }}>
            {CONFIG.subHeadline}
          </p>

          <div className="hero-animate hero-buttons" style={{
            display: "flex", gap: "14px", flexWrap: "wrap",
            animationDelay: "0.38s",
          }}>
            <a href="#programs" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #1e3a8a, #1e40af)",
              color: "#fff", padding: "15px 30px", borderRadius: "12px",
              fontWeight: 800, fontSize: "1rem",
              boxShadow: "0 6px 24px rgba(30,58,138,0.3)",
              transition: "transform 0.2s, filter 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.filter = "brightness(1.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "brightness(1)"; }}>
              Jelajahi Program <ArrowRight size={18} />
            </a>
            <a href={waLink} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#fff", color: "#1e3a8a", padding: "15px 28px", borderRadius: "12px",
              fontWeight: 700, fontSize: "1rem", border: "2px solid #e2e8f0",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#1e3a8a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <MessageCircle size={17} /> Tanya Gratis
            </a>
          </div>

          {/* Trust badges */}
          <div className="hero-animate hero-badges" style={{
            display: "flex", gap: "20px", marginTop: "40px",
            animationDelay: "0.5s",
          }}>
            {[
              { icon: <Users size={14} />, text: "2.000+ Alumni" },
              { icon: <Star size={14} />, text: "4.9 Rating" },
              { icon: <Shield size={14} />, text: "Garansi 30 Hari" },
            ].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "0.82rem" }}>
                <span style={{ color: "#10b981" }}>{b.icon}</span>
                <span style={{ fontWeight: 600 }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a, #1e40af)",
        padding: "40px 5%",
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px",
          textAlign: "center",
        }} className="stats-row">
          {[
            { n: "2000", s: "+", pre: "", label: "Alumni Aktif" },
            { n: "15", s: "+", pre: "", label: "Tahun Pengalaman" },
            { n: "98", s: "%", pre: "", label: "Kepuasan Peserta" },
            { n: "4", s: "", pre: "", label: "Bidang Keahlian" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#fff" }}>
                <AnimNum target={s.n} suffix={s.s} prefix={s.pre} />
              </div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.82rem", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROGRAMS GRID ── */}
      <section id="programs" style={{ padding: "90px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "#eff6ff", color: "#1e3a8a",
              padding: "6px 16px", borderRadius: "20px",
              fontSize: "0.78rem", fontWeight: 700, marginBottom: "14px",
              letterSpacing: "0.06em",
            }}>
              <Target size={12} /> PROGRAM & LAYANAN
            </div>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800, color: "#0f172a", marginBottom: "14px",
            }}>
              Pilih Program yang Tepat untuk Anda
            </h2>
            <p style={{ color: "#64748b", maxWidth: 500, margin: "0 auto", fontSize: "0.95rem", lineHeight: 1.65 }}>
              Semua program dirancang berbasis praktik nyata, bukan sekadar teori — langsung bisa diterapkan di tempat kerja.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }} className="programs-grid">
            {PRODUCTS.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT MENTOR ── */}
      <section id="about" style={{
        padding: "90px 5%",
        background: "linear-gradient(160deg, #eff6ff, #f0fdf4)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "56px", alignItems: "center",
          }} className="about-grid">
            {/* Visual side */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 200, height: 200, borderRadius: "50%", margin: "0 auto 20px",
                background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 16px 48px rgba(30,58,138,0.25)",
                fontSize: "5rem",
              }}>
                👨‍💼
              </div>
              {/* Credential badges */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: 240, margin: "0 auto" }}>
                {[
                  { icon: <Award size={14} />, text: "Certified Financial Analyst" },
                  { icon: <BadgeCheck size={14} />, text: "Google Workspace Expert" },
                  { icon: <Briefcase size={14} />, text: CONFIG.mentorCompanies },
                ].map((b, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    background: "#fff", padding: "10px 14px", borderRadius: "10px",
                    border: "1px solid #e2e8f0", fontSize: "0.78rem",
                    color: "#475569", fontWeight: 600,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}>
                    <span style={{ color: "#1e3a8a" }}>{b.icon}</span> {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Text side */}
            <div>
              <div style={{
                display: "inline-block", background: "#d1fae5", color: "#065f46",
                padding: "5px 14px", borderRadius: "8px", fontSize: "0.78rem",
                fontWeight: 700, marginBottom: "16px", letterSpacing: "0.05em",
              }}>
                TENTANG MENTOR
              </div>
              <h2 style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800,
                color: "#0f172a", marginBottom: "8px",
              }}>
                {CONFIG.mentorName}
              </h2>
              <p style={{ color: "#10b981", fontWeight: 700, fontSize: "0.9rem", marginBottom: "16px" }}>
                {CONFIG.mentorTitle}
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "#1e3a8a", color: "#fff",
                padding: "7px 16px", borderRadius: "8px",
                fontSize: "0.82rem", fontWeight: 700, marginBottom: "20px",
              }}>
                <Clock size={13} /> {CONFIG.mentorExp}
              </div>
              <p style={{ color: "#475569", lineHeight: 1.75, fontSize: "0.95rem", marginBottom: "28px" }}>
                {CONFIG.mentorBio}
              </p>

              {/* Stats mini */}
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {[
                  { val: "2.000+", label: "Peserta Terlatih" },
                  { val: "4.9★", label: "Rating Rata-rata" },
                  { val: "40+", label: "Perusahaan Klien" },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "16px 20px", background: "#fff", borderRadius: "14px",
                    border: "1px solid #e2e8f0", textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#1e3a8a" }}>{s.val}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "3px" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section id="benefits" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "#f0fdf4", color: "#059669",
              padding: "6px 16px", borderRadius: "20px",
              fontSize: "0.78rem", fontWeight: 700, marginBottom: "14px",
              letterSpacing: "0.06em",
            }}>
              <Zap size={12} /> MENGAPA TUTORIA INDONESIA
            </div>
            <h2 style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              fontWeight: 800, color: "#0f172a",
            }}>
              Bukan Kursus Online Biasa
            </h2>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px",
          }} className="benefits-grid">
            {[
              {
                icon: "🎯",
                title: "Kurikulum Berbasis Studi Kasus Nyata",
                desc: "Setiap materi menggunakan data dan permasalahan nyata dari industri — bukan contoh buku teks yang jauh dari realita kerja.",
              },
              {
                icon: "⚡",
                title: "Langsung Bisa Diterapkan",
                desc: "Template, tools, dan file latihan siap pakai. Peserta rata-rata merasakan perubahan dalam 2 minggu pertama.",
              },
              {
                icon: "🤝",
                title: "Mentoring Aktif & Responsif",
                desc: "Akses langsung ke mentor via grup WhatsApp selama program berlangsung — pertanyaan dijawab dalam 24 jam.",
              },
              {
                icon: "🏆",
                title: "Sertifikat yang Diakui",
                desc: "Sertifikat penyelesaian yang dapat ditambahkan ke profil LinkedIn dan CV untuk meningkatkan daya saing karier.",
              },
              {
                icon: "📱",
                title: "Belajar Kapan Saja, Di Mana Saja",
                desc: "Rekaman HD dapat diakses seumur hidup. Pelajari ulang materi sesuai kebutuhan tanpa batas waktu.",
              },
              {
                icon: "🛡️",
                title: "Garansi Kepuasan 30 Hari",
                desc: "Tidak puas? Kami kembalikan 100% investasi Anda dalam 30 hari pertama — tanpa pertanyaan berlebihan.",
              },
            ].map((b, i) => (
              <div key={i} className="benefit-card" style={{
                padding: "28px 24px", borderRadius: "18px",
                background: "#f8fafc", border: "1.5px solid #e2e8f0",
                transition: "border-color 0.25s, box-shadow 0.25s, transform 0.25s",
                cursor: "default",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#1e3a8a";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(30,58,138,0.1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}>
                <div className="benefit-icon" style={{ fontSize: "2.2rem", marginBottom: "14px" }}>{b.icon}</div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a", marginBottom: "8px", lineHeight: 1.35 }}>{b.title}</h3>
                <p style={{ fontSize: "0.84rem", color: "#64748b", lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA SECTION ── */}
      <section style={{
        padding: "80px 5%",
        background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #065f46 100%)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }} />
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>💬</div>
          <h2 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 800,
            color: "#fff", marginBottom: "14px",
          }}>
            Masih Bingung Program Mana yang Cocok?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem", lineHeight: 1.65, marginBottom: "36px" }}>
            Konsultasikan langsung dengan tim kami via WhatsApp. Gratis, tanpa komitmen, dijawab dalam 1 jam kerja.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#25D366", color: "#fff",
              padding: "16px 36px", borderRadius: "14px",
              fontWeight: 800, fontSize: "1.05rem",
              boxShadow: "0 8px 32px rgba(37,211,102,0.4)",
              transition: "transform 0.2s, filter 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px) scale(1.02)"; e.currentTarget.style.filter = "brightness(1.07)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.filter = "brightness(1)"; }}>
            <MessageCircle size={20} fill="#fff" /> Chat WhatsApp Sekarang
          </a>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: "14px" }}>
            Jam operasional: Senin–Sabtu, 08.00–20.00 WIB
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0a0f1a", padding: "48px 5% 28px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "10px",
                background: "linear-gradient(135deg, #1e3a8a, #1e40af)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <GraduationCap size={18} color="#fff" />
              </div>
              <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#f1f5f9" }}>
                {CONFIG.brandName}<span style={{ color: "#10b981" }}>{CONFIG.brandSuffix}</span>
              </span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { Icon: Instagram, href: CONFIG.instagramLink, label: "Instagram" },
                { Icon: Youtube, href: CONFIG.youtubeLink, label: "YouTube" },
                { Icon: MessageCircle, href: waLink, label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  title={label}
                  style={{
                    width: 38, height: 38, borderRadius: "10px",
                    background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#64748b", transition: "background 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#1e3a8a"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#1e293b"; e.currentTarget.style.color = "#64748b"; }}>
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "28px" }}>
            {["Program", "Tentang Mentor", "Keunggulan", "Konsultasi"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`}
                style={{ color: "#475569", fontSize: "0.85rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#10b981"}
                onMouseLeave={e => e.target.style.color = "#475569"}>
                {l}
              </a>
            ))}
          </div>

          <div style={{
            paddingTop: "20px", borderTop: "1px solid #1e293b",
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px",
          }}>
            <p style={{ color: "#334155", fontSize: "0.78rem" }}>
              © {new Date().getFullYear()} {CONFIG.brandName}{CONFIG.brandSuffix}. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Kebijakan Privasi", "Syarat & Ketentuan"].map(l => (
                <a key={l} href="#" style={{ color: "#334155", fontSize: "0.78rem" }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
