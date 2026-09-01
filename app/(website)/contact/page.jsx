'use client';

import React, { useState } from 'react';
import './contact.css';
import { color } from 'framer-motion';
import AdmissionModal from "../../../components/admission/AdmissionModal";

// Icon Components
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Helper Components
const SectionTitle = ({ title, subtitle }) => (
  <div className="section-title">
    <h2>{title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

const QuickContactCard = ({ title, phone, email, hours, icon }) => (
  <div className="quick-card glassmorphism">
    <div className="quick-card-icon">{icon}</div>
    <h3>{title}</h3>
    <p><PhoneIcon className="inline-icon" /> {phone}</p>
    <p><MailIcon className="inline-icon" /> {email}</p>
    <p><ClockIcon className="inline-icon" /> {hours}</p>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

// Main Component
export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    state: '',
    course: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ submitted: false, error: false, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.course) {
      setFormStatus({ submitted: true, error: true, message: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setFormStatus({
        submitted: true,
        error: false,
        message: 'Your inquiry has been sent successfully! We will contact you soon.',
      });
      setFormData({ fullName: '', email: '', mobile: '', city: '', state: '', course: '', subject: '', message: '' });
    } catch (err) {
      setFormStatus({
        submitted: true,
        error: true,
        message: err.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <span>Home</span> / <span>Enquiry Now</span>
            </nav>
            <h1 className="hero-title" style={{color:"#fcfdff"}} > <span style={{color:"#C8102E"}} > Pt. L.R. College </span> of Technology </h1>
            <p className="hero-subtitle">
              Get in touch with our admissions team, academic departments, and student support services.
              We are here to help you with admissions, courses, placements, and campus visits.
            </p>
            <div className="hero-buttons">
              <button type="button" onClick={openModal} className="btn btn-primary">
                Online Admissions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-map-grid">
            <div className="form-wrapper glassmorphism">
              <h3>Send an Inquiry</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number *"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <select name="course" value={formData.course} onChange={handleChange} required>
                    <option value="">Select Course Interested In *</option>
                    <option value="B.Tech Computer Science Engineering">B.Tech Computer Science Engineering</option>
                    <option value="B.Tech Electrical Engineering">B.Tech Electrical Engineering</option>
                    <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                    <option value="B.Tech Civil Engineering">B.Tech Civil Engineering</option>
                    <option value="B.Tech Electronics & Communication Engineering">B.Tech Electronics & Communication Engineering</option>
                    <option value="B.Tech Artificial Intelligence & Machine Learning">B.Tech Artificial Intelligence & Machine Learning</option>
                    <option value="Diploma Computer Science Engineering">Diploma Computer Science Engineering</option>
                    <option value="Diploma Electrical Engineering">Diploma Electrical Engineering</option>
                    <option value="Diploma Mechanical Engineering">Diploma Mechanical Engineering</option>
                    <option value="Diploma Civil Engineering">Diploma Civil Engineering</option>
                    <option value="M.Tech Engineering">M.Tech Engineering</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {formStatus.submitted && (
                  <div className={`form-status ${formStatus.error ? 'error' : 'success'}`}>
                    {formStatus.message}
                  </div>
                )}
                <div className="form-buttons">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  <button type="button" className="btn btn-secondary">Download Brochure</button>
                </div>
              </form>
            </div>
            <div className="map-wrapper">
              <h3>Our Campus</h3>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28048.451405821867!2d77.29578419999998!3d28.4084896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdc6b1e25e33d%3A0x7a3adcf3aecbf86a!2sFaridabad%2C%20Haryana!5e0!3m2!1sen!2sin!4v1740000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '24px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pt. L.R. College of Technology Campus Map"
                ></iframe>
              </div>
              <div className="map-actions">
                <button className="btn btn-outline">Get Directions</button>
                <button className="btn btn-outline">Open in Google Maps</button>
                <button className="btn btn-outline">Share Location</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Helpline */}
      <section className="admission-helpline">
        <div className="container">
          <div className="helpline-content">
            <h2 style={{color:'white'}}>Admissions Open for 2026</h2>
            <p>Connect with our admission helpline for personalized counseling and application support.</p>
            <div className="helpline-details">
              <p><PhoneIcon className="inline-icon" /> Admission Helpline:+91-9540028828,+91-9540028827</p>
              <p><MailIcon className="inline-icon" /> Email: ptlr.admission@gmail.com</p>
              <p><ClockIcon className="inline-icon" /> Campus Counseling: Mon-Sat 10 AM - 3 PM</p>
            </div>
             <a  href="https://wa.me/919540028828" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp Inquiry</a>
          </div>
        </div>
      </section>

      {/* Visit Campus */}
      <section className="visit-campus">
        <div className="container">
          <SectionTitle title="Visit Our Campus" subtitle="Experience Pt. L.R. College of Technology Campus" />
          <div className="visit-grid">
            <div className="visit-item"><span>🏛️</span> Schedule Campus Tour</div>
            <div className="visit-item"><span>👨‍🏫</span> Meet Faculty</div>
            <div className="visit-item"><span>🔬</span> Visit Laboratories</div>
            <div className="visit-item"><span>🏠</span> Hostel Tour</div>
            <div className="visit-item"><span>📋</span> Admission Counseling</div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="office-hours">
        <div className="container">
          <SectionTitle title="Office Hours" subtitle="When we are available to assist you" />
          <div className="hours-grid">
            <div className="hour-card"><h4>Monday – Friday</h4><p>9:00 AM – 4:00 PM</p></div>
            <div className="hour-card"><h4>Saturday</h4><p>9:00 AM – 2:00 PM</p></div>
            <div className="hour-card"><h4>Sunday</h4><p>Closed</p></div>
            <div className="hour-card"><h4>Admission Support</h4><p>Available Online</p></div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="social-media">
        <div className="container">
          <SectionTitle title="Follow Us" subtitle="Stay connected on social media" />
          <div className="social-icons">
            <a href="https://www.facebook.com/ptlrct" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://www.instagram.com/ptlrcollege" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://www.linkedin.com/school/ptlrct" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="https://www.youtube.com/@ptlrgroupofinstitutionsfar7153" aria-label="YouTube"><YouTubeIcon /></a>
            <a href="https://x.com/PTLRGROUP" aria-label="Twitter"><TwitterIcon /></a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="container">
          <SectionTitle title="Frequently Asked Questions" subtitle="Quick answers to common inquiries" />
          <div className="faq-list">
            <FAQItem question="How can I apply for admission?" answer="You can apply online through our admissions portal or visit the campus for offline application. The process includes filling the application form, submitting documents, and appearing for counseling." />
            <FAQItem question="What documents are required?" answer="Typical documents include 10th and 12th mark sheets, transfer certificate, migration certificate, character certificate, passport size photographs, and ID proof." />
            <FAQItem question="Is campus visit available?" answer="Yes, we offer campus visits on all working days. You can schedule a visit by calling our admissions office or booking online." />
            <FAQItem question="How can I contact the admissions office?" answer="You can call our admission helpline at +91 9540028828, 9540028827 email at ptlr.admission@gmail.com, or visit the campus in person." />
            <FAQItem question="Are scholarships available?" answer="Yes, we offer merit-based and need-based scholarships. Please contact the scholarship office for detailed information." />
            <FAQItem question="Is hostel accommodation available?" answer="Yes, we have separate hostels for boys and girls with all modern amenities. Limited seats are available." />
            <FAQItem question="How can I reach the college from Delhi NCR?" answer="Pt. L.R. College of Technology is located in Kaboolpur Banger,Sector -56,Faridabad, easily accessible Sohna-Samaypur Road, and local transport from Faridabad" />
            <FAQItem question="Can I submit inquiries online?" answer="Absolutely! You can use the contact form on this page or email us directly at ptlr.admission@gmail.com" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2 style={{color:'white'}}>Start Your Engineering Journey with  Pt. L.R. College of Technology</h2>
          <p>Connect with our admissions team today and take the first step toward a successful engineering career in Faridabad, Haryana.</p>
          <div className="cta-buttons">
            <a href="tel:9540028828" className="btn btn-secondary" >Call Admissions</a>
            <a href="https://wa.me/919540028828" target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">WhatsApp Us</a>
          </div>
        </div>
      </section>

      <AdmissionModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}