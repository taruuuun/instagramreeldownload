import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Download, Globe, Server, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stats = [
  { icon: Download, value: 50000000, label: "Downloads", display: "50M+", color: "from-blue-500 to-cyan-500" },
  { icon: Globe, value: 120, label: "Countries", display: "120+", color: "from-green-500 to-emerald-500" },
  { icon: Server, value: 99.9, label: "Uptime", display: "99.9%", color: "from-ig-purple to-purple-600" },
  { icon: Users, value: 500000, label: "Daily Users", display: "500K+", color: "from-ig-orange to-yellow-500" },
];

function AnimatedCounter({ target, display, isInView }: { target: number; display: string; isInView: boolean }) {
  const [count, setCount] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (progress >= 1) {
        setCount(display);
        clearInterval(timer);
      } else {
        if (target >= 1000000) setCount(`${(eased * target / 1000000).toFixed(0)}M`);
        else if (target >= 1000) setCount(`${(eased * target / 1000).toFixed(0)}K`);
        else if (target < 100) setCount(`${(eased * target).toFixed(1)}`);
        else setCount(`${Math.floor(eased * target)}`);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target, display]);

  return <span>{count}</span>;
}

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ig-purple/3 to-transparent" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] p-8 sm:p-12"
            style={{ boxShadow: "0 0 15px rgba(131,58,180,0.15), 0 0 30px rgba(253,29,29,0.1), 0 20px 40px rgba(0,0,0,0.4)" }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter target={stat.value} display={stat.display} isInView={isInView} />
                  </div>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
