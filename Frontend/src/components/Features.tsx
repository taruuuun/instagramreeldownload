import { motion } from "framer-motion";
import { Zap, Shield, Smartphone, MonitorPlay } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Zap,
    title: "Super Fast",
    description: "Download any content in just one click. Our servers process your request in milliseconds.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "100% Secure",
    description: "We don't store your data. Your privacy is our top priority. No login required.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Perfect experience on all devices. Works seamlessly on phones, tablets, and desktops.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MonitorPlay,
    title: "HD Quality",
    description: "Download in the highest quality available. Get crystal clear HD and Full HD content.",
    gradient: "from-purple-500 to-pink-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ig-purple/3 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">
              InstaSave
            </span>
            ?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            The fastest and most reliable Instagram content downloader on the web.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ig-purple/5 via-transparent to-ig-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
