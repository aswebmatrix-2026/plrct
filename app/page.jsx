"use client";

import { useState } from "react";
import AdmissionModal from "@/components/admission/AdmissionModal";
import NoticeTicker from "@/components/NoticeTicker";
import "./globals.css";

const COLLEGE = "Pt. L.R. College of Technology";

const programs = [
  { icon: "⚙️", title: "B.Tech", duration: "4 Years", eligibility: "10+2 with PCM", text: "CSE, Mechanical & Civil streams with strong core-engineering demand across NCR industry.", href: "#btech" },
  { icon: "🛠️", title: "Diploma Engineering", duration: "3 Years", eligibility: "10th Pass", text: "Hands-on technical training with lateral-entry pathway into B.Tech second year.", href: "#diploma" },
  { icon: "💻", title: "BCA", duration: "3 Years", eligibility: "10+2 Any Stream", text: "Software development, cloud & data foundations for a career in IT services and product teams.", href: "#bca" },
  { icon: "📊", title: "BBA", duration: "3 Years", eligibility: "10+2 Any Stream", text: "Management fundamentals with live-project exposure to marketing, finance & operations.", href: "#bba" },
  { icon: "📈", title: "MBA", duration: "2 Years", eligibility: "Bachelor's Degree", text: "Industry-mentored specializations built for mid-management roles across NCR.", href: "#mba" },
  { icon: "💊", title: "Pharmacy", duration: "4 Years", eligibility: "10+2 with PCB/PCM", text: "Pharmaceutical sciences with hospital & industry internship placement.", href: "#pharmacy" },
];

const why = [
  ["🖥️", "Smart Classrooms", "Interactive, tech-enabled lecture spaces built for active learning."],
  ["🔬", "Advanced Laboratories", "Fully equipped labs mirroring current industry tools and standards."],
  ["🧑‍🏫", "Experienced Faculty", "PhD-qualified and industry-seasoned mentors across every department."],
  ["🏭", "Industry Training", "Structured internships and live-project partnerships with NCR companies."],
  ["🎯", "Placement Assistance", "Dedicated placement cell with resume, aptitude & interview coaching."],
  ["📚", "Skill Development", "Certification tracks in coding, data & communication beyond the syllabus."],
];

const facilities = [
  ["/images/library_image.webp", "Central Library", true],
  ["/images/computerlab.webp", "Computer Laboratories"],
  ["/images/workshop.webp", "Engineering Workshops"],
  ["/images/student.webp", "Classrooms"],
  ["/images/auditorium.webp", "Auditorium"],
  ["/images/hostel.webp", "Hostel"],
  ["/images/cafetria.webp", "Cafeteria"],
  ["/images/imageslider.png", "Campus"],
  ["/images/transport.jpeg", "Transportation"],
];

const faqs = [
  [`Is ${COLLEGE} AICTE approved?`, `Yes. ${COLLEGE} is an AICTE-approved institution offering B.Tech, Diploma, BCA, BBA, MBA and Pharmacy programs in Faridabad, Haryana.`],
  [`What courses are offered at ${COLLEGE}?`, `${COLLEGE} offers B.Tech (CSE, Mechanical, Civil), Diploma Engineering, BCA, BBA, MBA and Pharmacy, each designed around current industry hiring needs in Delhi NCR.`],
  ["How can I apply for admission?", "Apply online through the admissions portal, upload your academic documents, complete counseling and verification, then confirm your seat with fee payment."],
  [`What are the placement opportunities at ${COLLEGE}?`, "The placement cell runs year-round drives with recruiters across IT, manufacturing and core engineering, alongside resume building, mock interviews and career counseling."],
  ["Are internships available for students?", "Yes, structured summer and semester internships are arranged with industry partners across Faridabad, Gurugram, Noida and South Delhi."],
  ["Is hostel accommodation provided?", "On-campus hostel accommodation is available with mess facilities, security and access to sports and medical facilities."],
  ["Does the college offer practical, hands-on training?", "Every program includes lab-based and project-based learning, supplemented by industry workshops, live projects and corporate mentoring."],
  [`Why choose ${COLLEGE} in Faridabad?`, "AICTE-approved academics, modern smart-campus infrastructure, experienced faculty and a strong placement track record, serving students across Faridabad, Ballabgarh, Palwal and the wider Delhi NCR region."],
];

const testimonials = [
  ["Ritika Sharma", "B.Tech CSE, 2025", "The lab access and faculty support gave me real project experience before I even graduated.", 1],
  ["Aman Verma", "BBA, 2024", "The placement cell prepared me thoroughly — mock interviews made the real ones far less nerve-wracking.", 2],
  ["Sneha Yadav", "MBA, 2023", "Small class sizes meant every professor actually knew my work. That mentorship made all the difference.", 3],
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main className="home">
      {/* ============ HERO ============ */}
      <section className="hero" id="hero" aria-label="Introduction">
        <div className="hero__media" aria-hidden="true">
          <img className="hero__img" loading="eager" src="/images/college.webp" alt="" />
          <div className="hero__overlay"></div>
        </div>

        <div className="hero__inner">
          <div className="hero__content">
            <p className="eyebrow">Est. 2011 &middot; AICTE Approved &middot; Faridabad, Haryana</p>
            <h1 className="hero__title">
              Best Engineering and
              <br />
              Professional College
              <br />
              in Faridabad
            </h1>
            <p className="hero__sub">
              {COLLEGE} provides industry-focused B.Tech, Diploma, BCA, BBA, MBA, and professional
              education with modern infrastructure, experienced faculty, practical learning,
              research opportunities, and career-oriented placement support across Faridabad,
              Haryana, and Delhi NCR.
            </p>
            <div className="hero__ctas">
              <button type="button" onClick={openModal} className="btn btn--primary">Online Admissions</button>
              <a href="#brochure" className="btn btn--ghost">Download Brochure</a>
              <a href="/student-application" className="btn btn--text">ID Card Registration &rarr;</a>
            </div>
          </div>

          <aside className="hero__plaque" aria-label={`${COLLEGE} at a glance`}>
            <div className="plaque__seal">AICTE<br />Approved</div>
            <ul className="plaque__list">
              <li><span className="plaque__num">2011</span><span className="plaque__label">Established</span></li>
              <li><span className="plaque__num">15+</span><span className="plaque__label">Academic Programs</span></li>
              <li><span className="plaque__num">92%</span><span className="plaque__label">Industry Placement Support</span></li>
              <li><span className="plaque__num">100%</span><span className="plaque__label">Modern Smart Campus</span></li>
            </ul>
            <p className="plaque__footnote">Career-focused education, built for Delhi NCR&apos;s industry.</p>
          </aside>
        </div>
      </section>

      {/* ============ NOTICE BOARD ============ */}
      <section className="notices" aria-label="Latest notices">
        <div className="notices__head">
          <div>
            <p className="eyebrow eyebrow--dark">Notice Board</p>
            <h2 className="h2">What&apos;s happening at {COLLEGE}</h2>
          </div>
          <div className="notices__tools">
            <label className="notices__search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search notices" aria-label="Search notices" />
            </label>
            <a href="/notice-board" className="btn btn--outline-sm">View all notices</a>
          </div>
        </div>
        <NoticeTicker />
      </section>

      {/* ============ QUICK ACTIONS ============ */}
      <section className="quick-actions" aria-label="Quick actions">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Quick Actions</p>
          <h2 className="h2">Everything you need, one tap away</h2>
        </div>
        <div className="qa-grid">
          <a className="qa-card" href="#apply" onClick={openModal}>
            <span className="qa-card__icon" aria-hidden="true">🎓</span>
            <h3>Apply Online</h3>
            <p>Start your 2026 admission application in minutes.</p>
          </a>
          <a className="qa-card" href="/contact" target="_blank" rel="noopener noreferrer">
            <span className="qa-card__icon" aria-hidden="true">💬</span>
            <h3>Admission Enquiry</h3>
            <p>Talk to our counsellors about programs &amp; eligibility.</p>
          </a>
          <a className="qa-card" href="#prospectus">
            <span className="qa-card__icon" aria-hidden="true">📘</span>
            <h3>Download Prospectus</h3>
            <p>Full course catalogue, faculty &amp; facilities in one PDF.</p>
          </a>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="about" id="about" aria-label={`About ${COLLEGE}`}>
        <div className="about__gallery" aria-hidden="true">
          <figure className="about__img about__img--a">
            <img loading="lazy" src="/images/chairman%20sir.webp" alt="" />
          </figure>
          <figure className="about__img about__img--b">
            <img loading="lazy" src="/images/library_image.webp" alt="" />
          </figure>
          <figure className="about__img about__img--c">
            <img loading="lazy" src="/images/auditorium.webp" alt="" />
          </figure>
        </div>

        <div className="about__content">
          <p className="eyebrow eyebrow--dark">About {COLLEGE}</p>
          <h2 className="h2">Fifteen Years of Excellence in Technical Education</h2>
          <p className="about__intro">
            {COLLEGE} has grown into one of Faridabad&apos;s trusted names in technical education by
            combining academic excellence, practical learning, and an industry-focused approach.
          </p>
          <p>
            Our B.Tech, Diploma, BCA, BBA, MBA, and Pharmacy programs are designed to help students
            build the technical knowledge, professional skills, and practical experience required to
            succeed in today&apos;s competitive workplace. We continuously focus on modern learning
            methods and industry-relevant education to prepare students for opportunities across
            Delhi NCR and beyond.
          </p>
          <p>
            Our experienced faculty bring together academic knowledge, research expertise, and
            practical industry experience. Through project-based learning, laboratory sessions,
            technical activities, research initiatives, and mentorship, students get opportunities
            to apply classroom concepts to real-world challenges.
          </p>
          <p>
            Beyond academics, we encourage students to develop leadership, communication, creativity,
            and entrepreneurial skills through technical societies, hackathons, workshops,
            entrepreneurship activities, and structured soft-skills training.
          </p>

          <ul className="about__stats" aria-label="College highlights">
            <li><strong>15+</strong><span>Academic Programs</span></li>
            <li><strong>2011</strong><span>AICTE Approved Since</span></li>
            <li><strong>92%</strong><span>Placement Support Rate</span></li>
          </ul>

          <div className="about__actions">
            <a href="#more" className="btn btn--primary">Discover Our College <span aria-hidden="true">→</span></a>
            <a href="#contact" className="about__link">Talk to Admissions <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      {/* ============ ACADEMIC PROGRAMS ============ */}
      <section className="programs" id="programs" aria-label="Academic programs">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Academic Programs</p>
          <h2 className="h2">Programs built around Delhi NCR&apos;s job market</h2>
        </div>
        <div className="programs-grid">
          {programs.map((p) => (
            <article className="program-card" key={p.title}>
              <span className="program-card__icon" aria-hidden="true">{p.icon}</span>
              <h3>{p.title}</h3>
              <dl className="program-card__meta">
                <div><dt>Duration</dt><dd>{p.duration}</dd></div>
                <div><dt>Eligibility</dt><dd>{p.eligibility}</dd></div>
              </dl>
              <p>{p.text}</p>
              <a href={p.href} className="card-link">Learn More &rarr;</a>
            </article>
          ))}
        </div>
      </section>

      {/* ============ WHY CHOOSE ============ */}
      <section className="why" aria-label={`Why choose ${COLLEGE}`}>
        <div className="section-head section-head--center">
          <p className="eyebrow">Why Choose {COLLEGE}</p>
          <h2 className="h2 h2--light">Six reasons students choose us</h2>
        </div>
        <div className="why-grid">
          {why.map(([icon, title, text]) => (
            <article className="why-card" key={title}>
              <span className="why-card__icon" aria-hidden="true">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ PLACEMENTS ============ */}
      <section className="placements" id="placements" aria-label="Placement and career success">
        <div className="placements__left">
          <p className="eyebrow eyebrow--dark">Placement &amp; Career Success</p>
          <h2 className="h2">A placement cell that works from year one</h2>
          <ul className="placements__list">
            <li><strong>Internship pipeline</strong> — structured summer &amp; semester internships with NCR employers.</li>
            <li><strong>Industry collaborations</strong> — sponsored labs, guest faculty and live projects.</li>
            <li><strong>Resume building</strong> — one-on-one resume clinics for every final-year student.</li>
            <li><strong>Interview preparation</strong> — mock interviews and aptitude bootcamps each semester.</li>
            <li><strong>Career counselling</strong> — individual guidance mapped to each student&apos;s program.</li>
            <li><strong>Entrepreneurship support</strong> — incubation cell for student-founded ventures.</li>
          </ul>
          <a href="#placement-report" className="btn btn--primary">View Placement Report</a>
        </div>

        <div className="placements__right">
          <div className="placement-stats">
            <div className="placement-stat"><span className="placement-stat__num">₹12 LPA</span><span className="placement-stat__label">Highest Package</span></div>
            <div className="placement-stat"><span className="placement-stat__num">₹4.8 LPA</span><span className="placement-stat__label">Average Package</span></div>
            <div className="placement-stat"><span className="placement-stat__num">92%</span><span className="placement-stat__label">Placement Rate</span></div>
            <div className="placement-stat"><span className="placement-stat__num">85%</span><span className="placement-stat__label">Internship Rate</span></div>
          </div>
          <div className="recruiter-strip" aria-label="Recruiter partners">
            <span>TCS</span><span>Infosys</span><span>Wipro</span><span>HCLTech</span><span>Maruti Suzuki</span><span>Escorts Kubota</span>
          </div>
          <svg className="career-chart" viewBox="0 0 320 140" role="img" aria-label="Placement rate trending upward over five years">
            <polyline points="0,110 60,95 120,80 180,55 240,35 320,15" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
            <circle cx="316" cy="15" r="5" fill="#C8102E" />
          </svg>
        </div>
      </section>

      {/* ============ INDUSTRY COLLABORATION ============ */}
      <section className="industry" aria-label="Industry collaboration">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Industry Collaboration</p>
          <h2 className="h2">Learning that reaches past the campus gate</h2>
        </div>
        <ol className="timeline timeline--h">
          {[
            ["Industry Partnerships", "MoUs with NCR manufacturing & IT companies."],
            ["Live Projects", "Real briefs from partner companies, credit-linked."],
            ["Guest Lectures", "Practitioners teaching current industry practice."],
            ["Corporate Mentoring", "1:1 mentorship for final-year project teams."],
            ["Innovation Workshops", "Hands-on sessions on emerging tools & platforms."],
            ["Startup Incubation", "Seed support for student-founded ventures."],
            ["Technical Competitions", "Inter-college hackathons and case challenges."],
          ].map(([t, d]) => (
            <li key={t}><span className="timeline__dot"></span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </section>

      {/* ============ CAMPUS FACILITIES ============ */}
      <section className="facilities" aria-label="Campus facilities">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Campus Facilities</p>
          <h2 className="h2">A campus designed for the whole day, not just the timetable</h2>
        </div>
        <div className="facilities-grid">
          {facilities.map(([src, label, large]) => (
            <figure className={`facility-tile${large ? " facility-tile--lg" : ""}`} key={label}>
              <img loading="lazy" src={src} alt={`${label} at ${COLLEGE}`} />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ============ STUDENT LIFE ============ */}
      <section className="student-life" aria-label="Student life">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Student Life</p>
          <h2 className="h2">Beyond the classroom</h2>
        </div>
        <div className="life-grid">
          {[
            ["Coding Clubs", "Weekly builds, code reviews & competitive programming."],
            ["Technical Societies", "Department-run societies driving projects & events."],
            ["Cultural Events", "Annual fests, music, art & performance showcases."],
            ["Sports Activities", "Inter-college tournaments across a dozen disciplines."],
            ["Innovation Competitions", "Idea-to-prototype challenges judged by industry mentors."],
            ["Hackathons", "24-48 hour builds with cross-department teams."],
            ["Annual Festivals", "Flagship techno-cultural festival drawing regional colleges."],
            ["Leadership Programs", "Structured student-council & mentorship pathways."],
          ].map(([t, d]) => (
            <article className="life-card" key={t}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>

      {/* ============ ADMISSION PROCESS ============ */}
      <section className="admission" id="admissions" aria-label="Admission process">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Admission Process</p>
          <h2 className="h2">Four steps to your seat at {COLLEGE}</h2>
        </div>
        <ol className="timeline timeline--h timeline--steps">
          <li><span className="timeline__num">1</span><h3>Apply Online</h3><p>Complete the application form with basic academic details.</p></li>
          <li><span className="timeline__num">2</span><h3>Upload Documents</h3><p>Submit mark sheets, ID proof &amp; photographs.</p></li>
          <li><span className="timeline__num">3</span><h3>Counseling &amp; Verification</h3><p>Meet our counsellors; documents verified on campus or online.</p></li>
          <li><span className="timeline__num">4</span><h3>Admission Confirmation</h3><p>Confirm your seat with fee payment &amp; orientation details.</p></li>
        </ol>
        <p className="admission__note">
          Scholarship-eligible applicants are assessed automatically at the counseling stage.
          Eligibility varies by program &mdash; our admissions team will confirm the exact criteria
          for your course during counseling.
        </p>
      </section>

      {/* ============ SCHOLARSHIPS ============ */}
      <section className="scholarships" aria-label="Scholarships">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Scholarships &amp; Financial Support</p>
          <h2 className="h2">Making {COLLEGE} possible for every serious student</h2>
        </div>
        <div className="scholarship-grid">
          {[
            ["Merit Scholarships", "Tuition support for top-scoring entrants each academic year."],
            ["Academic Excellence Awards", "Ongoing recognition for sustained top academic performance."],
            ["Financial Assistance", "Need-based support assessed case by case with our finance office."],
            ["Government Scholarship Support", "Guided applications for state & central scholarship schemes."],
            ["Education Loan Guidance", "Bank partnerships and paperwork support for education loans."],
          ].map(([t, d]) => (
            <article className="scholarship-card" key={t}><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials" aria-label="Student testimonials">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Student Testimonials</p>
          <h2 className="h2">In their own words</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map(([name, course, quote, n]) => (
            <article className="testimonial-card" key={name}>
              <img
                loading="lazy"
                className="testimonial-card__photo"
                src={`https://picsum.photos/seed/plrct-student${n}/160/160`}
                alt={`Photo of ${name}`}
              />
              <div className="testimonial-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p>&quot;{quote}&quot;</p>
              <p className="testimonial-card__name">{name} <span>&middot; {course}</span></p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq" aria-label="Frequently asked questions">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Frequently Asked Questions</p>
          <h2 className="h2">Everything applicants ask us</h2>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details className="faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta" aria-label="Start your admission journey">
        <div className="final-cta__shapes" aria-hidden="true"></div>
        <div className="final-cta__inner">
          <h2 className="h2 h2--light">Start Your Journey with {COLLEGE}</h2>
          <p>
            Join one of the leading engineering and professional colleges in Faridabad and build a
            successful career with industry-focused education, modern infrastructure, experienced
            faculty, and strong placement support.
          </p>
          <div className="final-cta__ctas">
            <button type="button" onClick={openModal} className="btn btn--white">Enquiry Now</button>
            <a href="#contact" className="btn btn--ghost-light">Contact Admissions</a>
            <a href="#brochure" className="btn btn--text-light">Download Brochure &rarr;</a>
          </div>
        </div>
      </section>

      <AdmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}