import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CourseCatalog from '../components/CourseCatalog';
import WhyWorq from '../components/WhyWorq';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <div id="courses">
        <CourseCatalog />
      </div>
      <div id="about">
        <WhyWorq />
      </div>
      <TestimonialsSection />
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact">
        <CTASection />
      </div>
    </main>
  );
}
