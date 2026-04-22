import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';

const NAV_SECTIONS = [
  { id: 'transformation', label: 'Our Process' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
] as const;

type NavSectionId = typeof NAV_SECTIONS[number]['id'];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId | null>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map(s => s.id);
    const observers: IntersectionObserver[] = [];

    const visibilityMap = new Map<NavSectionId, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.id as NavSectionId;
          visibilityMap.set(id, entry.intersectionRatio);
        });

        // Pick the most visible section
        let topId: NavSectionId | null = null;
        let topRatio = 0;
        visibilityMap.forEach((ratio, id) => {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        });
        if (topRatio > 0.05) setActiveSection(topId);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          zIndex: 200,
          background: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          style={{
            width: progressWidth,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-sage), var(--color-sand))',
            transformOrigin: 'left',
          }}
        />
      </div>

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="nav-logo-word">Forma</span>
            <span className="nav-logo-dot">.</span>
          </div>

          <div className="nav-links-desktop">
            {NAV_SECTIONS.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                  onClick={() => scrollTo(id)}
                  style={{ position: 'relative' }}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="navActiveIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 16,
                        height: 2,
                        borderRadius: 1,
                        background: 'var(--color-sand)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            className="btn-primary nav-cta"
            onClick={() => scrollTo('contact')}
          >
            Start the conversation
          </button>

          <button
            className="nav-hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="nav-mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  className="nav-mobile-link"
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
