import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

// ─── Formspree configuration ───────────────────────────────────────────────────
// To connect this form:
//   1. Create a free account at formspree.io
//   2. Create a new form and copy your form ID (e.g. "xpzvqrgb")
//   3. Replace the placeholder below with your actual form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_ID';

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // If Formspree is not configured, show success immediately (dev/preview mode)
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORMSPREE_ID')) {
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      }, 800);
      return;
    }

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => ({}));
        setSubmitError(
          (data as { error?: string }).error ||
            'Something went wrong. Please email us directly.'
        );
      }
    } catch {
      setSubmitError(
        'Unable to send. Please email hello@formadigital.co directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const questions = [
    {
      id: 'q1',
      name: 'q1',
      number: '01',
      label: 'What does your business do and who do you serve?',
      placeholder: 'Your model, target clients, and where you are in the growth arc.',
      rows: 3,
    },
    {
      id: 'q2',
      name: 'q2',
      number: '02',
      label: 'What feels misaligned about your current digital presence?',
      placeholder: "What impression do you suspect you're making on first contact?",
      rows: 3,
    },
    {
      id: 'q3',
      name: 'q3',
      number: '03',
      label: 'If this was fixed in 90 days, what would change?',
      placeholder: "Not what the site should look like — what it should do for the business.",
      rows: 2,
    },
  ];

  return (
    <section className="section section-light contact-section-v2" id="contact">
      <div className="container-wide" ref={ref}>
        <div className="contact-grid">
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">Start Here</span>
            <h2 className="section-headline contact-headline">
              Tell us about
              <br />
              your business.
            </h2>
            <p className="contact-description">
              Three questions so we can give you a useful initial response — not a generic follow-up.
            </p>
            <div className="contact-sidebar-details">
              <div className="contact-sidebar-item">
                <span className="contact-sidebar-label">Response time</span>
                <span className="contact-sidebar-value">Within one business day</span>
              </div>
              <div className="contact-sidebar-item">
                <span className="contact-sidebar-label">What you&apos;ll receive</span>
                <span className="contact-sidebar-value">Honest initial thoughts — not a pitch</span>
              </div>
              <div className="contact-sidebar-item">
                <span className="contact-sidebar-label">Next step</span>
                <span className="contact-sidebar-value">30-minute Clarity Call if there&apos;s a fit</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="contact-success-icon">&check;</div>
                <h3 className="contact-success-headline">Received.</h3>
                <p className="contact-success-body">
                  We&apos;ll review this and come back within one business day with honest initial thoughts.
                </p>
              </motion.div>
            ) : (
              <form className="contact-form-v2" onSubmit={handleSubmit}>
                {questions.map((q, i) => (
                  <motion.div
                    key={q.id}
                    className="form-group-v2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label htmlFor={q.id} className="form-label-v2">
                      <span className="form-q-number">{q.number}</span>
                      {q.label}
                    </label>
                    <textarea
                      id={q.id}
                      name={q.name}
                      className="form-textarea-v2"
                      rows={q.rows}
                      placeholder={q.placeholder}
                      required
                    />
                  </motion.div>
                ))}

                <motion.div
                  className="form-email-group"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <label htmlFor="email" className="form-label-v2">
                    <span className="form-q-number">&rarr;</span>
                    Your email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input-v2"
                    placeholder="So we can respond to you"
                    required
                  />
                </motion.div>

                {/* Error message */}
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontFamily: 'var(--font-body)', fontSize: 13,
                      color: '#EF4444', marginBottom: 12,
                    }}
                  >
                    {submitError}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    type="submit"
                    className="btn-primary btn-large form-submit-btn"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.65 : 1 }}
                  >
                    {isSubmitting ? 'Sending…' : 'Send'}
                  </button>
                  <p className="form-note-v2">
                    You&apos;ll receive a thoughtful response from the person who does the work.
                  </p>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}