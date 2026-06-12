import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Send } from "lucide-react";
import { InstagramIcon, TwitterIcon, FacebookIcon, YoutubeIcon } from "./Icons";
import ScrollReveal from "./ScrollReveal";
import instaLogo from "../assets/insta-logo.png";

const footerLinks = {
  Product: [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Blog", href: "#blog" },
    { label: "Contact Us", href: "#contact" },
  ],
  Resources: [
    { label: "FAQ", href: "#faq" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "DMCA", href: "#" },
    { label: "Report a Bug", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Status", href: "#" },
    { label: "API", href: "#" },
    { label: "Feedback", href: "#" },
  ],
};

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: YoutubeIcon, href: "#", label: "Youtube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="relative pt-24 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <ScrollReveal className="lg:col-span-2">
            <a href="#home" className="flex items-center mb-4 group">
              <img src={instaLogo} alt="Logo" className="h-10 object-contain group-hover:scale-105 transition-transform" />
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              The best Instagram downloader tool to download Reels, Videos, Stories, Photos and more. Fast, free and easy to use.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a key={social.label} href={social.href} whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {Object.entries(footerLinks).map(([title, links], i) => (
            <ScrollReveal key={title} delay={0.1 + i * 0.05}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>

        {/* Newsletter */}
        <ScrollReveal>
          <div className="rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Subscribe to Our Newsletter</h3>
                <p className="text-gray-400 text-sm">Get updates, tips and latest features directly in your inbox.</p>
              </div>
              <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ig-purple/30 focus:border-ig-purple/50 text-sm transition-all"
                  required
                />
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange text-white font-medium text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" />
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </motion.button>
              </form>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Save Reel. All rights reserved.</p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-ig-red fill-current" /> for Instagram lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
