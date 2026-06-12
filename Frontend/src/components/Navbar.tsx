import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";

import instaLogo from "../assets/insta-logo.png";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "howItWorks", href: "#how-it-works" },
  { key: "features", href: "#features" },
  { key: "faq", href: "#faq" },
  { key: "blog", href: "#blog" },
  { key: "contact", href: "#contact" },
];

const languages = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
  { code: "HI", label: "हिन्दी" },
  { code: "PT", label: "Português" },
  { code: "AR", label: "العربية" },
  { code: "RU", label: "Русский" },
  { code: "ZH", label: "中文" },
  { code: "JA", label: "日本語" },
];

import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const { language: selectedLang, setLanguage: setSelectedLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark-900/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <img src={instaLogo} alt="Logo" className="h-10 object-contain group-hover:scale-105 transition-transform" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {selectedLang}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-dark-800/95 backdrop-blur-xl border border-white/10 overflow-hidden shadow-xl"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setSelectedLang(lang.code); setLangOpen(false); }}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                          selectedLang === lang.code ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-dark-800 border-l border-white/10 z-50 p-6 lg:hidden"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl bg-white/5 text-gray-300 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-gray-300 hover:text-white rounded-xl hover:bg-white/5 transition-all text-base"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3">
                <button onClick={() => setDarkMode(!darkMode)}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
                <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 cursor-pointer"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
