import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const faqs = [
  { question: "Is this Instagram downloader free?", answer: "Yes, Save Reel is completely free to use. There are no hidden charges, subscriptions, or premium tiers. You can download unlimited Instagram content without paying anything." },
  { question: "Is it safe to use?", answer: "Absolutely. We don't store any of your data or downloaded content on our servers. Your privacy is our top priority. We don't require login or any personal information." },
  { question: "Can I download Instagram reels?", answer: "Yes! You can download Instagram Reels in HD quality. Simply copy the reel link from Instagram and paste it in the input box above. You'll get options to download in HD and SD quality." },
  { question: "Can I download Instagram stories?", answer: "Yes, you can download Instagram stories from public accounts. Copy the story link and paste it here. Note that stories are only available for 24 hours, so download them before they expire." },
  { question: "Why is the download failing?", answer: "Downloads may fail if the content is from a private account, the link is invalid, or the content has been deleted. Make sure you're using a direct link to a public Instagram post. If the issue persists, try refreshing the page." },
  { question: "Do I need to create an account?", answer: "No, you don't need to create any account or log in. Save Reel works without any registration. Just paste the link and download instantly." },
];

function FAQItem({ faq, isOpen, onClick }: { faq: { question: string; answer: string }; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`rounded-xl border transition-all duration-300 ${isOpen ? "bg-white/[0.06] backdrop-blur-2xl border-white/[0.15]" : "bg-white/[0.03] backdrop-blur-xl border-white/[0.05] hover:border-white/10"}`}>
      <button onClick={onClick} className="w-full flex items-center justify-between p-5 text-left cursor-pointer">
        <span className={`font-medium text-sm sm:text-base pr-4 transition-colors ${isOpen ? "text-white" : "text-gray-300"}`}>
          {faq.question}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isOpen ? "bg-gradient-to-br from-ig-purple via-ig-red to-ig-orange text-white" : "bg-white/5 text-gray-400"}`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-ig-purple via-ig-red to-ig-orange bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Got questions? We've got answers.</p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto grid gap-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem faq={faq} isOpen={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
