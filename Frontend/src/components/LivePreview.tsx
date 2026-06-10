import { motion } from "framer-motion";
import { Download, Play, Clock, HardDrive, Sparkles, User } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import GradientButton from "./GradientButton";

export default function LivePreview() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Live{" "}
            <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">Preview</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">See how your downloads will look before saving</p>
        </ScrollReveal>

        <ScrollReveal>
          <motion.div whileHover={{ y: -4 }}
            className="max-w-3xl mx-auto rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] overflow-hidden"
            style={{ boxShadow: "0 0 15px rgba(131,58,180,0.15), 0 0 30px rgba(253,29,29,0.1), 0 20px 40px rgba(0,0,0,0.4)" }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Thumbnail */}
              <div className="relative md:w-72 h-52 md:h-auto shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-ig-purple/30 via-ig-red/20 to-ig-orange/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="w-full h-full bg-gradient-to-br from-orange-900/60 via-rose-900/50 to-purple-900/60 min-h-[200px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer border border-white/30"
                  >
                    <Play className="w-7 h-7 text-white ml-1" fill="white" />
                  </motion.div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ig-purple via-ig-red to-ig-orange flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Amazing Nature 🌍</h3>
                    <p className="text-gray-400 text-sm">@explore.worldwide</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: Clock, label: "Duration", value: "00:30" },
                    { icon: Play, label: "Type", value: "Reel" },
                    { icon: Sparkles, label: "Quality", value: "HD" },
                    { icon: HardDrive, label: "Size", value: "12.4 MB" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-sm text-white font-medium">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <GradientButton size="md">
                    <Download className="w-4 h-4" />
                    Download HD
                  </GradientButton>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download SD
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
