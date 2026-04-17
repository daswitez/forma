"use client";

import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { IndustryTicker } from './components/IndustryTicker';
import { ProblemSection } from './components/ProblemSection';
import { PersonaSection } from './components/PersonaSection';
import { TransformationSection } from './components/TransformationSection';
import { ProcessSection } from './components/ProcessSection';
import { PlatformSection } from './components/PlatformSection';
import { OutcomesSection } from './components/OutcomesSection';
import { RetentionFunnelSection } from './components/RetentionFunnelSection';
import { CaseStudySection } from './components/CaseStudySection';
import { DifferentiatorSection } from './components/DifferentiatorSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';


export default function App() {
  return (
    <div className="app">
      <Navigation />

      {/* 1 — Hook */}
      <HeroSection />

      {/* 2 — Industries served (ticker) */}
      <IndustryTicker />

      {/* 3 — Name the problem */}
      <ProblemSection />

      {/* 4 — Who this is for (establish fit early, before proof) */}
      <PersonaSection />

      {/* 5 — What the transformation looks like */}
      <TransformationSection />

      {/* 6 — How we do it */}
      <ProcessSection />

      {/* 7 — Platform options */}
      <PlatformSection />

      {/* 8 — What changes after the work */}
      <OutcomesSection />

      {/* 8.5 — Retention & conversion funnel (3D visual proof) */}
      <RetentionFunnelSection />

      {/* 9 — Proof: real projects, real results */}
      <CaseStudySection />

      {/* 10 — Why us vs the alternatives */}
      <DifferentiatorSection />

      {/* 11 — Objection handling before the final ask */}
      <FAQSection />

      {/* 12 — Close */}
      <CTASection />

      {/* 13 — Start the conversation */}
      <ContactSection />

      <Footer />
    </div>
  );
}
