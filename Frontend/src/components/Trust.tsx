import { motion } from "framer-motion";
import { ShieldCheck, Zap, MonitorSmartphone, UserX } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const trustItems = [
  { icon: UserX, title: "No Login Required", description: "Use InstaSave without creating any account or sharing personal data", color: "from-blue-500 to-cyan-500" },
  { icon: ShieldCheck, title: "Secure Download", description: "All downloads are processed securely. We never store your data", color: "from-green-500 to-emerald-500" },
  { icon: Zap, title: "Instant Processing", description: "Our servers process your download requests in milliseconds", color: "from-ig-purple to-purple-500" },
  { icon: MonitorSmartphone, title: "Works on All Devices", description: "Compatible with phones, tablets, laptops, and desktop computers", color: "from-ig-orange to-amber-500" },
];

export default function Trust() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">Millions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Here's why users around the world choose InstaSave</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
                className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 text-center h-full"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ig-purple/5 via-transparent to-ig-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}
                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
