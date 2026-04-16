export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer-v2">
      <div className="container-wide footer-inner">
        <div className="footer-brand-col">
          <div className="footer-logo">Forma<span className="footer-logo-dot">.</span></div>
          <p className="footer-tagline">
            Digital repositioning for<br />growth-stage B2B businesses.
          </p>
          <p className="footer-platforms-note">
            Delivered in code, WordPress, and Webflow.
          </p>
        </div>

        <div className="footer-nav-col">
          <div className="footer-nav-group">
            <div className="footer-nav-heading">Navigate</div>
            <button className="footer-link" onClick={() => scrollTo('transformation')}>Our Process</button>
            <button className="footer-link" onClick={() => scrollTo('platforms')}>Platforms</button>
            <button className="footer-link" onClick={() => scrollTo('work')}>Work</button>
            <button className="footer-link" onClick={() => scrollTo('who')}>Who We Help</button>
            <button className="footer-link" onClick={() => scrollTo('contact')}>Start a Conversation</button>
          </div>
        </div>

        <div className="footer-cta-col">
          <p className="footer-cta-copy">
            Something resonating? The Clarity Sprint is where it starts.
          </p>
          <button
            className="btn-primary footer-btn"
            onClick={() => scrollTo('contact')}
          >
            Start the conversation
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container-wide footer-bottom-inner">
          <span className="footer-legal">
            © 2026 Forma. — Growth-Stage Digital Repositioning
          </span>
          <span className="footer-mono-note">
            Built in code · WordPress · Webflow
          </span>
        </div>
      </div>
    </footer>
  );
}
