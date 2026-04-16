export function IndustryTicker() {
  const items = [
    'B2B SaaS',
    'Professional Services',
    'Precision Manufacturing',
    'Healthcare Technology',
    'Financial Services',
    'Industrial Automation',
    'Legal Technology',
    'Management Consulting',
    'Engineering Services',
    'Clean Energy',
    'Supply Chain',
    'Life Sciences',
  ];

  return (
    <section className="social-proof">
      <div className="ticker">
        <div className="ticker-content" aria-hidden="true">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
