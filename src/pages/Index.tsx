import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Trust from "@/components/Trust";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Trust />
        <Gallery />
        <Process />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
