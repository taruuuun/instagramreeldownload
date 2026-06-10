import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link, ClipboardPaste, Eye, Download } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  { icon: Link, title: "Copy Instagram Link", description: "Copy the link of any Instagram post, reel, story or video you want to download.", step: 1, color: "from-blue-500 to-cyan-500" },
  { icon: ClipboardPaste, title: "Paste URL", description: "Paste the link in the input box above and click the download button.", step: 2, color: "from-ig-purple to-purple-600" },
  { icon: Eye, title: "Preview Content", description: "Preview the content details including quality, file size, and duration.", step: 3, color: "from-ig-red to-pink-600" },
  { icon: Download, title: "Download", description: "Choose the quality and download your content instantly. It's that simple!", step: 4, color: "from-ig-orange to-yellow-500" },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Download Instagram content in just 4 simple steps</p>
        </ScrollReveal>

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-white/5">
            <motion.div
              initial={{ height: "0%" }}
              animate={isInView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-ig-purple via-ig-red to-ig-orange rounded-full"
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse md:text-right"}`}>
                  <div className="flex-1 ml-16 md:ml-0">
                    <motion.div whileHover={{ y: -4 }}
                      className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                    >
                      <span className="text-xs font-semibold bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent uppercase tracking-wider">
                        Step {step.step}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 200 }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                    >
                      <step.icon className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
