"use client";

import { useState } from "react";
import AdmissionModal from "@/components/admission/AdmissionModal";
import NoticeTicker from "@/components/NoticeTicker";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="hero" id="hero" aria-label="Introduction">
        <div className="hero__media" aria-hidden="true">
          <img
            className="hero__img"
            loading="eager"
            src="/images/college.webp"
            alt=""
          />
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
              PLRCT provides industry-focused B.Tech, Diploma, BCA, BBA, MBA, and professional
              education with modern infrastructure, experienced faculty, practical learning,
              research opportunities, and career-oriented placement support across Faridabad,
              Haryana, and Delhi NCR.
            </p>
            <div className="hero__ctas">
              <button type="button" onClick={openModal} className="btn btn--primary">
                Online Admissions
              </button>
              <a href="#brochure" className="btn btn--ghost">Download Brochure</a>
              <a href="/student-application" className="btn btn--text">ID Card Registration &rarr;</a>
            </div>
          </div>

          <aside className="hero__plaque" aria-label="PLRCT at a glance">
            <div className="plaque__seal">
              AICTE
              <br />
              Approved
            </div>
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
      <h2 className="h2">What&apos;s happening at PLRCT</h2>
    </div>
    <div className="notices__tools">
      <label className="notices__search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
     {/* ============ ABOUT ============ */}
<section className="about" id="about" aria-label="About Pt. L.R. College of Technology">

  {/* Image Gallery */}
  <div className="about__gallery" aria-hidden="true">

    <figure className="about__img about__img--a">
      <img
        loading="lazy"
        src="/images/chairman sir.webp"
        alt=""
      />
    </figure>

    <figure className="about__img about__img--b">
      <img
        loading="lazy"
        src="/images/library_image.webp"
        alt=""
      />
    </figure>

    <figure className="about__img about__img--c">
      <img
        loading="lazy"
        src="/images/auditorium.webp"
        alt=""
      />
    </figure>

  </div>


  {/* About Content */}
  <div className="about__content">

    <p className="eyebrow eyebrow--dark">
      About Pt. L.R. College of Technology
    </p>

    <h2 className="h2">
      Fifteen Years of Excellence in Technical Education
    </h2>

    <p className="about__intro">
      Pt. L.R. College of Technology has grown into one of Faridabad&apos;s
      trusted names in technical education by combining academic excellence,
      practical learning, and an industry-focused approach.
    </p>

    <p>
      Our B.Tech, Diploma, BCA, BBA, MBA, and Pharmacy programs are designed
      to help students build the technical knowledge, professional skills,
      and practical experience required to succeed in today&apos;s competitive
      workplace. We continuously focus on modern learning methods and
      industry-relevant education to prepare students for opportunities
      across Delhi NCR and beyond.
    </p>

    <p>
      Our experienced faculty bring together academic knowledge, research
      expertise, and practical industry experience. Through project-based
      learning, laboratory sessions, technical activities, research
      initiatives, and mentorship, students get opportunities to apply
      classroom concepts to real-world challenges.
    </p>

    <p>
      Beyond academics, Pt. L.R. College of Technology encourages students
      to develop leadership, communication, creativity, and entrepreneurial
      skills through technical societies, hackathons, workshops,
      entrepreneurship activities, and structured soft-skills training.
    </p>


    {/* Stats */}
    <ul className="about__stats" aria-label="College highlights">

      <li>
        <strong>15+</strong>
        <span>Academic Programs</span>
      </li>

      <li>
        <strong>2011</strong>
        <span>AICTE Approved Since</span>
      </li>

      <li>
        <strong>92%</strong>
        <span>Placement Support Rate</span>
      </li>

    </ul>


    {/* CTA */}
    <div className="about__actions">

      <a href="#more" className="btn btn--primary">
        Discover Our College
        <span aria-hidden="true">→</span>
      </a>

      <a href="#contact" className="about__link">
        Talk to Admissions
        <span aria-hidden="true">↗</span>
      </a>

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
          <article className="program-card">
            <span className="program-card__icon" aria-hidden="true">⚙️</span>
            <h3>B.Tech</h3>
            <dl className="program-card__meta">
              <div><dt>Duration</dt><dd>4 Years</dd></div>
              <div><dt>Eligibility</dt><dd>10+2 with PCM</dd></div>
            </dl>
            <p>CSE, Mechanical &amp; Civil streams with strong core-engineering demand across NCR industry.</p>
            <a href="#btech" className="card-link">Learn More &rarr;</a>
          </article>

          <article className="program-card">
            <span className="program-card__icon" aria-hidden="true">🛠️</span>
            <h3>Diploma Engineering</h3>
            <dl className="program-card__meta">
              <div><dt>Duration</dt><dd>3 Years</dd></div>
              <div><dt>Eligibility</dt><dd>10th Pass</dd></div>
            </dl>
            <p>Hands-on technical training with lateral-entry pathway into B.Tech second year.</p>
            <a href="#diploma" className="card-link">Learn More &rarr;</a>
          </article>

          <article className="program-card">
            <span className="program-card__icon" aria-hidden="true">💻</span>
            <h3>BCA</h3>
            <dl className="program-card__meta">
              <div><dt>Duration</dt><dd>3 Years</dd></div>
              <div><dt>Eligibility</dt><dd>10+2 Any Stream</dd></div>
            </dl>
            <p>Software development, cloud &amp; data foundations for a career in IT services and product teams.</p>
            <a href="#bca" className="card-link">Learn More &rarr;</a>
          </article>

          <article className="program-card">
            <span className="program-card__icon" aria-hidden="true">📊</span>
            <h3>BBA</h3>
            <dl className="program-card__meta">
              <div><dt>Duration</dt><dd>3 Years</dd></div>
              <div><dt>Eligibility</dt><dd>10+2 Any Stream</dd></div>
            </dl>
            <p>Management fundamentals with live-project exposure to marketing, finance &amp; operations.</p>
            <a href="#bba" className="card-link">Learn More &rarr;</a>
          </article>

          <article className="program-card">
            <span className="program-card__icon" aria-hidden="true">📈</span>
            <h3>MBA</h3>
            <dl className="program-card__meta">
              <div><dt>Duration</dt><dd>2 Years</dd></div>
              <div><dt>Eligibility</dt><dd>Bachelor&apos;s Degree</dd></div>
            </dl>
            <p>Industry-mentored specializations built for mid-management roles across NCR.</p>
            <a href="#mba" className="card-link">Learn More &rarr;</a>
          </article>

          <article className="program-card">
            <span className="program-card__icon" aria-hidden="true">💊</span>
            <h3>Pharmacy</h3>
            <dl className="program-card__meta">
              <div><dt>Duration</dt><dd>4 Years</dd></div>
              <div><dt>Eligibility</dt><dd>10+2 with PCB/PCM</dd></div>
            </dl>
            <p>Pharmaceutical sciences with hospital &amp; industry internship placement.</p>
            <a href="#pharmacy" className="card-link">Learn More &rarr;</a>
          </article>
        </div>
      </section>

      {/* ============ WHY CHOOSE PLRCT ============ */}
      <section className="why" aria-label="Why choose PLRCT">
        <div className="section-head section-head--center">
          <p className="eyebrow">Why Choose Pt. L.R. College of Technology</p>
          <h2 className="h2 h2--light">Six reasons students choose us over VIT, SRM &amp; Manipal</h2>
        </div>
        <div className="why-grid">
          <article className="why-card">
            <span className="why-card__icon" aria-hidden="true">🖥️</span>
            <h3>Smart Classrooms</h3>
            <p>Interactive, tech-enabled lecture spaces built for active learning.</p>
          </article>
          <article className="why-card">
            <span className="why-card__icon" aria-hidden="true">🔬</span>
            <h3>Advanced Laboratories</h3>
            <p>Fully equipped labs mirroring current industry tools and standards.</p>
          </article>
          <article className="why-card">
            <span className="why-card__icon" aria-hidden="true">🧑‍🏫</span>
            <h3>Experienced Faculty</h3>
            <p>PhD-qualified and industry-seasoned mentors across every department.</p>
          </article>
          <article className="why-card">
            <span className="why-card__icon" aria-hidden="true">🏭</span>
            <h3>Industry Training</h3>
            <p>Structured internships and live-project partnerships with NCR companies.</p>
          </article>
          <article className="why-card">
            <span className="why-card__icon" aria-hidden="true">🎯</span>
            <h3>Placement Assistance</h3>
            <p>Dedicated placement cell with resume, aptitude &amp; interview coaching.</p>
          </article>
          <article className="why-card">
            <span className="why-card__icon" aria-hidden="true">📚</span>
            <h3>Skill Development</h3>
            <p>Certification tracks in coding, data &amp; communication beyond the syllabus.</p>
          </article>
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
            <circle cx="320" cy="15" r="5" fill="#C8102E" />
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
          <li><span className="timeline__dot"></span><h3>Industry Partnerships</h3><p>MoUs with NCR manufacturing &amp; IT companies.</p></li>
          <li><span className="timeline__dot"></span><h3>Live Projects</h3><p>Real briefs from partner companies, credit-linked.</p></li>
          <li><span className="timeline__dot"></span><h3>Guest Lectures</h3><p>Practitioners teaching current industry practice.</p></li>
          <li><span className="timeline__dot"></span><h3>Corporate Mentoring</h3><p>1:1 mentorship for final-year project teams.</p></li>
          <li><span className="timeline__dot"></span><h3>Innovation Workshops</h3><p>Hands-on sessions on emerging tools &amp; platforms.</p></li>
          <li><span className="timeline__dot"></span><h3>Startup Incubation</h3><p>Seed support for student-founded ventures.</p></li>
          <li><span className="timeline__dot"></span><h3>Technical Competitions</h3><p>Inter-college hackathons and case challenges.</p></li>
        </ol>
      </section>

      {/* ============ CAMPUS FACILITIES ============ */}
      <section className="facilities" aria-label="Campus facilities">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Campus Facilities</p>
          <h2 className="h2">A campus designed for the whole day, not just the timetable</h2>
        </div>
        <div className="facilities-grid">
          <figure className="facility-tile facility-tile--lg">
            <img loading="lazy" src="/images/library_image.webp" alt="Central Library at PLRCT" />
            <figcaption>Central Library</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="/images/computerlab_image.webp" alt="Computer laboratories at PLRCT" />
            <figcaption>Computer Laboratories</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-workshop/700/560" alt="Engineering workshops at PLRCT" />
            <figcaption>Engineering Workshops</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-classroom/700/560" alt="Smart classrooms at PLRCT" />
            <figcaption>Smart Classrooms</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-auditorium/700/560" alt="Auditorium at PLRCT" />
            <figcaption>Auditorium</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-hostel/700/560" alt="Hostel facilities at PLRCT" />
            <figcaption>Hostel</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-sports/700/560" alt="Sports complex at PLRCT" />
            <figcaption>Sports Complex</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-cafeteria/700/560" alt="Cafeteria at PLRCT" />
            <figcaption>Cafeteria</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-medical/700/560" alt="Medical facilities at PLRCT" />
            <figcaption>Medical Facilities</figcaption>
          </figure>
          <figure className="facility-tile">
            <img loading="lazy" src="https://picsum.photos/seed/PLRCT-transport/700/560" alt="Transportation at PLRCT" />
            <figcaption>Transportation</figcaption>
          </figure>
        </div>
      </section>

      {/* ============ STUDENT LIFE ============ */}
      <section className="student-life" aria-label="Student life">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Student Life</p>
          <h2 className="h2">Beyond the classroom</h2>
        </div>
        <div className="life-grid">
          <article className="life-card"><h3>Coding Clubs</h3><p>Weekly builds, code reviews &amp; competitive programming.</p></article>
          <article className="life-card"><h3>Technical Societies</h3><p>Department-run societies driving projects &amp; events.</p></article>
          <article className="life-card"><h3>Cultural Events</h3><p>Annual fests, music, art &amp; performance showcases.</p></article>
          <article className="life-card"><h3>Sports Activities</h3><p>Inter-college tournaments across a dozen disciplines.</p></article>
          <article className="life-card"><h3>Innovation Competitions</h3><p>Idea-to-prototype challenges judged by industry mentors.</p></article>
          <article className="life-card"><h3>Hackathons</h3><p>24-48 hour builds with cross-department teams.</p></article>
          <article className="life-card"><h3>Annual Festivals</h3><p>Flagship techno-cultural festival drawing regional colleges.</p></article>
          <article className="life-card"><h3>Leadership Programs</h3><p>Structured student-council &amp; mentorship pathways.</p></article>
        </div>
      </section>

      {/* ============ ADMISSION PROCESS ============ */}
      <section className="admission" id="admissions" aria-label="Admission process">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Admission Process</p>
          <h2 className="h2">Four steps to your seat at Pt. L.R. College of Technology</h2>
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
          <h2 className="h2">Making Pt. L.R. College of Technology possible for every serious student</h2>
        </div>
        <div className="scholarship-grid">
          <article className="scholarship-card"><h3>Merit Scholarships</h3><p>Tuition support for top-scoring entrants each academic year.</p></article>
          <article className="scholarship-card"><h3>Academic Excellence Awards</h3><p>Ongoing recognition for sustained top academic performance.</p></article>
          <article className="scholarship-card"><h3>Financial Assistance</h3><p>Need-based support assessed case by case with our finance office.</p></article>
          <article className="scholarship-card"><h3>Government Scholarship Support</h3><p>Guided applications for state &amp; central scholarship schemes.</p></article>
          <article className="scholarship-card"><h3>Education Loan Guidance</h3><p>Bank partnerships and paperwork support for education loans.</p></article>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials" aria-label="Student testimonials">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Student Testimonials</p>
          <h2 className="h2">In their own words</h2>
        </div>
        <div className="testimonial-grid">
          <article className="testimonial-card">
            <img loading="lazy" className="testimonial-card__photo" src="https://picsum.photos/seed/PLRCT-student1/160/160" alt="Photo of Ritika Sharma" />
            <div className="testimonial-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p>&quot;The lab access and faculty support at Pt. L.R. College of Technology gave me real project experience before I even graduated.&quot;</p>
            <p className="testimonial-card__name">Ritika Sharma <span>&middot; B.Tech CSE, 2025</span></p>
          </article>
          <article className="testimonial-card">
            <img loading="lazy" className="testimonial-card__photo" src="https://picsum.photos/seed/PLRCT-student2/160/160" alt="Photo of Aman Verma" />
            <div className="testimonial-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p>&quot;The placement cell prepared me thoroughly &mdash; mock interviews made the real ones far less nerve-wracking.&quot;</p>
            <p className="testimonial-card__name">Aman Verma <span>&middot; BBA, 2024</span></p>
          </article>
          <article className="testimonial-card">
            <img loading="lazy" className="testimonial-card__photo" src="https://picsum.photos/seed/PLRCT-student3/160/160" alt="Photo of Sneha Yadav" />
            <div className="testimonial-card__stars" aria-label="5 out of 5 stars">★★★★★</div>
            <p>&quot;Small class sizes meant every professor actually knew my work. That mentorship made all the difference.&quot;</p>
            <p className="testimonial-card__name">Sneha Yadav <span>&middot; MBA, 2023</span></p>
          </article>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="faq" aria-label="Frequently asked questions">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--dark">Frequently Asked Questions</p>
          <h2 className="h2">Everything applicants ask us</h2>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Is Pt. L.R. College of Technology AICTE approved?</summary>
            <p>Yes. Pt. L.R. College of Technology is an AICTE-approved institution offering B.Tech, Diploma, BCA, BBA, MBA and Pharmacy programs in Faridabad, Haryana.</p>
          </details>
          <details className="faq-item">
            <summary>What courses are offered at Pt. L.R. College of Technology?</summary>
            <p>Pt. L.R. College of Technology offers B.Tech (CSE, Mechanical, Civil), Diploma Engineering, BCA, BBA, MBA and Pharmacy, each designed around current industry hiring needs in Delhi NCR.</p>
          </details>
          <details className="faq-item">
            <summary>How can I apply for admission?</summary>
            <p>Apply online through the admissions portal, upload your academic documents, complete counseling and verification, then confirm your seat with fee payment.</p>
          </details>
          <details className="faq-item">
            <summary>What are the placement opportunities at Pt. L.R. College of Technology?</summary>
            <p>Pt. L.R. College of Technology&apos;s placement cell runs year-round drives with recruiters across IT, manufacturing and core engineering, alongside resume building, mock interviews and career counseling.</p>
          </details>
          <details className="faq-item">
            <summary>Are internships available for students?</summary>
            <p>Yes, structured summer and semester internships are arranged with industry partners across Faridabad, Gurugram, Noida and South Delhi.</p>
          </details>
          <details className="faq-item">
            <summary>Is hostel accommodation provided?</summary>
            <p>Pt. L.R. College of Technology offers on-campus hostel accommodation with mess facilities, security and access to sports and medical facilities.</p>
          </details>
          <details className="faq-item">
            <summary>Does Pt. L.R. College of Technology offer practical, hands-on training?</summary>
            <p>Every program includes lab-based and project-based learning, supplemented by industry workshops, live projects and corporate mentoring.</p>
          </details>
          <details className="faq-item">
            <summary>Why choose Pt. L.R. College of Technology in Faridabad?</summary>
            <p>Pt. L.R. College of Technology combines AICTE-approved academics, modern smart-campus infrastructure, experienced faculty and a strong placement track record, serving students across Faridabad, Ballabgarh, Palwal and the wider Delhi NCR region.</p>
          </details>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="final-cta" aria-label="Start your admission journey">
        <div className="final-cta__shapes" aria-hidden="true"></div>
        <div className="final-cta__inner">
          <h2 className="h2 h2--light">Start Your Journey with Pt. L.R. College of Technology</h2>
          <p>
            Join one of the leading engineering and professional colleges in Faridabad and build a
            successful career with industry-focused education, modern infrastructure, experienced
            faculty, and strong placement support.
          </p>
          <div className="final-cta__ctas">
            <button type="button" onClick={openModal} className="btn btn--white">Apply Now</button>
            <a href="#contact" className="btn btn--ghost-light">Contact Admissions</a>
            <a href="#brochure" className="btn btn--text-light">Download Brochure &rarr;</a>
          </div>
        </div>
      </section>

      <AdmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}     