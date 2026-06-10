import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardPaste,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Film,
  Video,
  Image,
  BookOpen,
  LayoutGrid,
  X,
} from "lucide-react";
import { InstagramIcon } from "./Icons";
import { isValidInstagramUrl, pasteFromClipboard } from "../lib/utils";
import GradientButton from "./GradientButton";
import { useLanguage } from "../context/LanguageContext";

const supportedBadges = [
  { id: "reels", key: "common.reels", icon: Film },
  { id: "videos", key: "common.videos", icon: Video },
  { id: "photos", key: "common.photos", icon: Image },
  { id: "stories", key: "common.stories", icon: BookOpen },
  { id: "carousel", key: "common.carousel", icon: LayoutGrid },
];

const floatingCards = [
  { label: "Reels", icon: "🎬", x: -70, y: -90, delay: 0 },
  { label: "Videos", icon: "📹", x: 190, y: -50, delay: 0.2 },
  { label: "Photos", icon: "📷", x: -90, y: 60, delay: 0.4 },
  { label: "Stories", icon: "📖", x: 210, y: 100, delay: 0.6 },
  { label: "Carousel", icon: "🎠", x: 50, y: 190, delay: 0.8 },
];

type DownloadState = "idle" | "loading" | "success" | "error";
type ToastState = { type: "success" | "error", message: string } | null;

export default function Hero() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<DownloadState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [toast, setToast] = useState<ToastState>(null);
  const { t } = useLanguage();

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handlePaste = async () => {
    const text = await pasteFromClipboard();
    if (text) setUrl(text);
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      setState("error");
      setErrorMsg(t("error.emptyUrl"));
      showToast("error", t("error.emptyUrl"));
      setTimeout(() => setState("idle"), 3000);
      return;
    }
    if (!isValidInstagramUrl(url)) {
      setState("error");
      setErrorMsg(t("error.invalidUrl"));
      showToast("error", t("error.invalidUrl"));
      setTimeout(() => setState("idle"), 3000);
      return;
    }
    setState("loading");
    
    // Fake server busy message requested by user
    setTimeout(() => {
      setState("error");
      setErrorMsg(t("error.serverBusy"));
      showToast("error", t("error.serverBusy"));
      setTimeout(() => setState("idle"), 3000);
    }, 1500);

    /*
    try {
      const response = await fetch("http://localhost:5000/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to download content");
      }
      
      setState("success");
      showToast("success", "Success! Content fetched successfully.");
      
    } catch (err: any) {
      setState("error");
      setErrorMsg(err.message || "Something went wrong.");
      showToast("error", err.message || "Something went wrong.");
    } finally {
      setTimeout(() => setState("idle"), 3000);
    }
    */
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Toast Notification Popup */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className={`fixed top-24 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border ${
              toast.type === "error" 
                ? "bg-red-500/10 border-red-500/20 text-red-400" 
                : "bg-green-500/10 border-green-500/20 text-green-400"
            }`}
          >
            {toast.type === "error" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <span className="font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70 transition-opacity cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-700" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-ig-purple/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-ig-red/8 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-ig-orange/5 blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Top badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {[t("hero.badge1"), t("hero.badge2"), t("hero.badge3")].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-ig-purple to-ig-orange" />
                  {tag}
                </span>
              ))}
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl mt-2 block">
                {t("hero.subtitle")}
              </span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed">
              {t("hero.description")}
            </p>

            {/* URL Input */}
            <div className="relative flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => { setUrl(e.target.value); if (state === "error") setState("idle"); }}
                  placeholder={t("hero.placeholder")}
                  className={`w-full pl-12 pr-14 py-4 rounded-xl bg-white/5 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    state === "error"
                      ? "border-red-500/50 focus:ring-red-500/30"
                      : "border-white/10 focus:ring-ig-purple/30 focus:border-ig-purple/50"
                  }`}
                />
                <button onClick={handlePaste}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Paste from clipboard"
                >
                  <ClipboardPaste className="w-4 h-4" />
                </button>
              </div>
              <GradientButton onClick={handleDownload} disabled={state === "loading"} size="lg" className="sm:w-auto w-full whitespace-nowrap">
                {state === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                {state === "success" && <CheckCircle2 className="w-5 h-5" />}
                {state === "error" && <AlertCircle className="w-5 h-5" />}
                {state === "idle" && <Download className="w-5 h-5" />}
                {state === "loading" ? t("hero.btn.processing") : state === "success" ? t("hero.btn.success") : state === "error" ? t("hero.btn.error") : t("hero.btn.download")}
              </GradientButton>
            </div>

            {state === "error" && errorMsg && (
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mb-4 flex items-center gap-1.5"
              >
                <AlertCircle className="w-4 h-4" />
                {errorMsg}
              </motion.p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500">{t("hero.supportText")}</span>
              {supportedBadges.map((badge) => (
                <span key={badge.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/8 transition-all">
                  <badge.icon className="w-3.5 h-3.5" />
                  {t(badge.key)}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[280px] h-[560px] rounded-[3rem] bg-gradient-to-b from-dark-600 to-dark-800 border-2 border-white/10 p-3"
                style={{ boxShadow: "0 0 15px rgba(131,58,180,0.15), 0 0 30px rgba(253,29,29,0.1), 0 20px 40px rgba(0,0,0,0.4)" }}
              >
                <div className="w-full h-full rounded-[2.4rem] bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-dark-900 rounded-b-2xl" />
                  <div className="flex items-center justify-center h-full">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ig-purple via-ig-red to-ig-orange flex items-center justify-center"
                    >
                      <InstagramIcon className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[2.4rem]" />
                </div>
              </motion.div>

              {/* Floating cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + card.delay, type: "spring" }}
                  style={{ position: "absolute", left: `calc(50% + ${card.x}px)`, top: `calc(50% + ${card.y}px)` }}
                  className="z-10"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className="bg-dark-800/90 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 cursor-default"
                    style={{ boxShadow: "0 0 15px rgba(131,58,180,0.15), 0 0 30px rgba(253,29,29,0.1), 0 20px 40px rgba(0,0,0,0.4)" }}
                  >
                    <span className="text-lg">{card.icon}</span>
                    <span className="text-sm font-medium text-white whitespace-nowrap">{card.label}</span>
                  </motion.div>
                </motion.div>
              ))}

              <div className="absolute inset-0 -z-10 blur-[80px] opacity-40">
                <div className="w-full h-full bg-gradient-to-br from-ig-purple via-ig-red to-ig-orange rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
