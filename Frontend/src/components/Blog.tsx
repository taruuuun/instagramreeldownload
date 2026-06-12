import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const articles = [
  {
    title: "How to Download Instagram Reels in HD Quality",
    description: "A complete step-by-step guide to downloading Instagram Reels in the highest quality available. Learn the fastest methods.",
    category: "Tutorial",
    readTime: "5 min read",
    author: "Save Reel Team",
    gradient: "from-ig-purple to-purple-600",
  },
  {
    title: "Download Instagram Stories Before They Disappear",
    description: "Don't miss out on your favorite stories. Learn how to save Instagram stories from any public profile permanently.",
    category: "Guide",
    readTime: "4 min read",
    author: "Save Reel Team",
    gradient: "from-ig-red to-pink-600",
  },
  {
    title: "Save Instagram Videos in HD - Complete Guide",
    description: "Everything you need to know about downloading Instagram videos, IGTV content, and feed videos in original quality.",
    category: "Tutorial",
    readTime: "6 min read",
    author: "Save Reel Team",
    gradient: "from-ig-orange to-amber-500",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ig-purple/3 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Latest from Our{" "}
            <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">Blog</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Tips, tutorials, and guides for downloading Instagram content</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.12}>
              <motion.article whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 300 }}
                className="group rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 overflow-hidden h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-700" />
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${article.gradient} text-white`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 w-20 h-20 rounded-full border border-white/10 opacity-20" />
                  <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 opacity-10" />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-ig-purple group-hover:via-ig-red group-hover:to-ig-orange group-hover:bg-clip-text transition-all">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{article.description}</p>

                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{article.author}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-sm font-medium bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent inline-flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                      Read More <ArrowRight className="w-4 h-4 text-ig-red" />
                    </span>
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
