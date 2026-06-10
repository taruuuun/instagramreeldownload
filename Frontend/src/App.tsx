import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import SupportedContent from "./components/SupportedContent";
import LivePreview from "./components/LivePreview";
import Statistics from "./components/Statistics";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Trust from "./components/Trust";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-700">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <SupportedContent />
      <LivePreview />
      <Statistics />
      <FAQ />
      <Blog />
      <Trust />
      <Footer />
    </main>
  );
}
