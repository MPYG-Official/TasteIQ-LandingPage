import { generateFAQStructuredData, metadataForPage } from '@/lib/seo';
import Hero from '@/components/sections/Hero';
import QuickStart from '@/components/sections/QuickStart';
import PostAI from '@/components/sections/PostAI';
import WhySwitch from '@/components/sections/WhySwitch';
import UseCases from '@/components/sections/UseCases';
import Pricing from '@/components/sections/Pricing';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import SwitchingProcess from '@/components/sections/SwitchingProcess';
import ContactForm from '@/components/sections/ContactForm';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/layout/Footer';
import WhatsAppWidget from '@/components/widgets/WhatsAppWidget';

export const metadata = metadataForPage('home');

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <PostAI />
        <QuickStart />
        <WhySwitch />
        <UseCases />
        <Pricing />
        <Features />
        <Testimonials />
        <SwitchingProcess />
        <ContactForm />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}

