import { motion } from "framer-motion";
import { Film, Video, BookOpen, Image, LayoutGrid, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const contentTypes = [
  { icon: Film, title: "Reels", description: "Download Instagram Reels in HD quality with audio", color: "from-pink-500 to-rose-600" },
  { icon: Video, title: "Videos", description: "Save IGTV and feed videos in original quality", color: "from-red-500 to-orange-600" },
  { icon: BookOpen, title: "Stories", description: "Download stories before they disappear in 24 hours", color: "from-purple-500 to-indigo-600" },
  { icon: Image, title: "Photos", description: "Save photos and profile pictures in full resolution", color: "from-blue-500 to-cyan-600" },
  { icon: LayoutGrid, title: "Carousel", description: "Download all images and videos from carousel posts", color: "from-green-500 to-teal-600" },
  { icon: Star, title: "Highlights", description: "Save story highlights collections permanently", color: "from-amber-500 to-yellow-600" },
];

export default function SupportedContent() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ig-purple/3 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            We{" "}
            <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">Support</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Download any type of content from Instagram</p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentTypes.map((type, i) => (
            <ScrollReveal key={type.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-default overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                <div className="relative flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <type.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{type.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{type.description}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
