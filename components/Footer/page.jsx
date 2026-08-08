import "./footer.css"
export default function Footer() {
  return (
    <div className="plrf-root">
     

      {/* ============ FOOTER ============ */}
      <footer className="plrf-site-footer">

        <div className="plrf-footer-top">

          {/* Column 1: About */}
          <div className="plrf-footer-col plrf-footer-col--about">
            <div className="plrf-footer-brand">
              <span className="plrf-footer-brand__mark" aria-hidden="true">PLR</span>
              <span className="plrf-footer-brand__name">Pt. L.R. Group of Institutions</span>
            </div>
            <p className="plrf-footer-about-text">
              Pt. L.R. Group of Institutions is a trusted name in technical, pharmaceutical and
              management education in Faridabad, Haryana. AICTE and PCI approved, the group
              focuses on industry-oriented learning, modern infrastructure, and career-ready
              graduates serving students across Faridabad and the wider Delhi NCR region.
            </p>
            <ul className="plrf-accreditation-badges" aria-label="Accreditations">
              <li>AICTE Approved</li>
              <li>PCI Approved</li>
              <li>ISO Certified</li>
            </ul>
          </div>

          {/* Column 2: Our Institutions */}
          <div className="plrf-footer-col">
            <h3 className="plrf-footer-col__title">Our Institutions</h3>
            <ul className="plrf-footer-links">
              <li><a href="#PLRCT">PLRCT</a></li>
              <li><a href="#plrcp">Pt. L.R. College of Pharmacy</a></li>
              <li><a href="#plrcm">Pt. L.R. College of Management</a></li>
              <li><a href="#plrsp">Pt. L.R. School of Pharmacy</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="plrf-footer-col">
            <h3 className="plrf-footer-col__title">Quick Links</h3>
            <ul className="plrf-footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#courses">Courses</a></li>
              <li><a href="#admissions">Admissions</a></li>
              <li><a href="#placements">Placements</a></li>
              <li><a href="#faculty">Faculty</a></li>
              <li><a href="#facilities">Campus Facilities</a></li>
              <li><a href="#notices">Notice Board</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Student Services */}
          <div className="plrf-footer-col">
            <h3 className="plrf-footer-col__title">Student Services</h3>
            <ul className="plrf-footer-links">
              <li><a href="#apply-online">Online Admission</a></li>
              <li><a href="#inquiry">Admission Inquiry</a></li>
              <li><a href="#prospectus">Download Prospectus</a></li>
              <li><a href="#fees">Fee Structure</a></li>
              <li><a href="#scholarships">Scholarships</a></li>
              <li><a href="#calendar">Academic Calendar</a></li>
              <li><a href="#exam-notices">Examination Notices</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#erp">Student ERP</a></li>
              <li><a href="#faculty-portal">Faculty Portal</a></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="plrf-footer-col plrf-footer-col--contact">
            <h3 className="plrf-footer-col__title">Contact Us</h3>
            <ul className="plrf-contact-list">
              <li>
                <span className="plrf-contact-list__icon" aria-hidden="true">📍</span>
                <span>Faridabad, Haryana, India</span>
              </li>
              <li>
                <span className="plrf-contact-list__icon" aria-hidden="true">📞</span>
                <a href="tel:+919876543210">+91-95400-28828</a>
              </li>
              <li>
                <span className="plrf-contact-list__icon" aria-hidden="true">✉️</span>
                <a href="mailto:admissions@PLRCT.edu.in">admissions@PLRCT.edu.in</a>
              </li>
              <li>
                <span className="plrf-contact-list__icon" aria-hidden="true">🌐</span>
                <a href="http://www.PLRCT.edu.in">www.PLRCT.edu.in</a>
              </li>
            </ul>
            <a
              href="https://maps.google.com/?q=Faridabad+Haryana"
              className="plrf-btn plrf-btn--map"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">📍</span> View on Google Maps
            </a>
          </div>
        </div>

        {/* ============ NOTICE BOARD + NEWSLETTER ============ */}
        <div className="plrf-footer-widgets">

          <div className="plrf-widget-card plrf-notice-widget" aria-label="Latest notices">
            <h3 className="plrf-footer-col__title">Notice Board</h3>
            <ul className="plrf-mini-notices">
              <li>
                <div className="plrf-mini-notice__meta">
                  <span className="plrf-mini-notice__date">04 Aug 2026</span>
                  <span className="plrf-mini-notice__title">Latest Admission Notice</span>
                </div>
                <a href="#" className="plrf-mini-notice__link" aria-label="View PDF">PDF <span aria-hidden="true">⬇</span></a>
              </li>
              <li>
                <div className="plrf-mini-notice__meta">
                  <span className="plrf-mini-notice__date">02 Aug 2026</span>
                  <span className="plrf-mini-notice__title">Scholarship Notification</span>
                </div>
                <a href="#" className="plrf-mini-notice__link" aria-label="View PDF">PDF <span aria-hidden="true">⬇</span></a>
              </li>
              <li>
                <div className="plrf-mini-notice__meta">
                  <span className="plrf-mini-notice__date">28 Jul 2026</span>
                  <span className="plrf-mini-notice__title">Placement Drive</span>
                </div>
                <a href="#" className="plrf-mini-notice__link" aria-label="View PDF">PDF <span aria-hidden="true">⬇</span></a>
              </li>
              <li>
                <div className="plrf-mini-notice__meta">
                  <span className="plrf-mini-notice__date">30 Jul 2026</span>
                  <span className="plrf-mini-notice__title">Examination Schedule</span>
                </div>
                <a href="#" className="plrf-mini-notice__link" aria-label="View PDF">PDF <span aria-hidden="true">⬇</span></a>
              </li>
            </ul>
          </div>

          <div className="plrf-widget-card plrf-newsletter-widget" aria-label="Newsletter subscription">
            <h3 className="plrf-footer-col__title">Stay Updated</h3>
            <p className="plrf-newsletter-widget__text">
              Subscribe to receive admission updates, scholarship announcements, placement
              opportunities, and academic notifications.
            </p>
            <form className="plrf-newsletter-form" action="#" method="post">
              <label className="plrf-sr-only" htmlFor="newsletter-email">Email address</label>
              <input id="newsletter-email" type="email" placeholder="Enter your email" required />
              <button type="submit" className="plrf-btn plrf-btn--primary">Subscribe</button>
            </form>
          </div>

        </div>

        {/* ============ SOCIAL ============ */}
        <div className="plrf-social-row" aria-label="Social media links">
          <a href="#" className="plrf-social-icon" aria-label="Facebook">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M13.5 22v-8.4h2.8l.4-3.3h-3.2V8.2c0-.95.26-1.6 1.63-1.6H17V3.6C16.7 3.55 15.7 3.46 14.5 3.46c-2.4 0-4.05 1.47-4.05 4.16v2.7H7.7v3.3h2.75V22h3.05z" />
            </svg>
          </a>
          <a href="#" className="plrf-social-icon" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" />
            </svg>
          </a>
          <a href="#" className="plrf-social-icon" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M6.94 8.4H3.56V20H6.94V8.4zM5.25 3.4a2 2 0 100 4 2 2 0 000-4zM20.45 20h-3.38v-6.03c0-1.44-.03-3.28-2-3.28-2 0-2.31 1.56-2.31 3.18V20h-3.38V8.4h3.24v1.58h.05c.45-.86 1.56-1.76 3.2-1.76 3.42 0 4.05 2.25 4.05 5.18V20z" />
            </svg>
          </a>
          <a href="#" className="plrf-social-icon" aria-label="YouTube">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M22 12s0-3.2-.4-4.7a2.6 2.6 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.5A2.6 2.6 0 002.4 7.3C2 8.8 2 12 2 12s0 3.2.4 4.7a2.6 2.6 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.5a2.6 2.6 0 001.8-1.8c.4-1.5.4-4.7.4-4.7zM10 15.2V8.8L15.5 12 10 15.2z" />
            </svg>
          </a>
          <a href="#" className="plrf-social-icon" aria-label="X (Twitter)">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M18.9 3H21.7l-6.1 7 7.2 9.9h-5.6l-4.4-5.8-5 5.8H4.8l6.5-7.5L4.4 3H10l4 5.3L18.9 3z" />
            </svg>
          </a>
        </div>

        {/* ============ TRUST / RECOGNITION ============ */}
        <div className="plrf-trust-strip" aria-label="Recognition and accreditation">
          <span>AICTE Approved</span>
          <span>PCI Approved</span>
          <span>Industry Connected</span>
          <span>Placement Support</span>
          <span>Modern Infrastructure</span>
          <span>Academic Excellence</span>
        </div>

        {/* ============ SEO PARAGRAPH ============ */}
        <p className="plrf-seo-text">
          Pt. L.R. Group of Institutions is recognised as one of the best engineering colleges in
          Faridabad, offering AICTE approved engineering, PCI approved pharmacy, and management
          programs in Haryana. Serving students from Faridabad, Ballabgarh, Palwal, Gurugram and
          the wider Delhi NCR region, the group is a trusted destination for professional
          education, combining industry-connected engineering, pharmacy and management colleges
          near Delhi NCR with strong placement support across the Greater Faridabad and NCR
          region.
        </p>

        {/* ============ BOTTOM BAR ============ */}
        <div className="plrf-footer-bottom">
          <p className="plrf-footer-bottom__copy">&copy; 2026 Pt. L.R. Group of Institutions. All Rights Reserved.</p>
          <ul className="plrf-footer-bottom__legal">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms &amp; Conditions</a></li>
            <li><a href="#disclaimer">Disclaimer</a></li>
            <li><a href="#sitemap">Sitemap</a></li>
          </ul>
          <p className="plrf-footer-bottom__credit">Designed with excellence for education and innovation.</p>
        </div>

      </footer>
    </div>
  );
}