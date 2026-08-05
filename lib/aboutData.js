/**
 * lib/aboutData.js
 * ---------------------------------------------------------------------------
 * Shared, structured content for every page under /about/*. Keeping copy here
 * (rather than inline in each page.jsx) means stats, FAQ answers, and the
 * leadership roster stay consistent everywhere they're reused, and non-devs
 * can update copy without touching layout code.
 *
 * NOTE: Figures marked "placeholder" are illustrative for the redesign and
 * should be replaced with PLRCT's verified, current figures (NIRF/AICTE
 * filings, latest placement report, actual faculty count) before publishing.
 * ---------------------------------------------------------------------------
 */

export const SITE = {
  name: 'Pt. L.R. College of Technology',
  shortName: 'PLRCT',
  city: 'Faridabad',
  locality: 'Ballabgarh',
  region: 'Haryana',
  metro: 'Delhi NCR',
  nearby: ['Faridabad', 'Ballabgarh', 'Palwal', 'Greater Faridabad', 'Delhi NCR'],
  phone: '+91-98765-43210',
  email: 'admissions@plrct.edu.in',
};

/* ---------------------------------------------------------------------- */
/* OVERVIEW                                                                */
/* ---------------------------------------------------------------------- */

export const OVERVIEW_STATS = [
  { value: 25, suffix: '+', label: 'Years of academic legacy' },
  { value: 6, suffix: '', label: 'Undergraduate & postgraduate programs' },
  { value: 1800, suffix: '+', label: 'Students on campus' },
  { value: 80, suffix: '+', label: 'Recruiting partners (placeholder)' },
];

export const OVERVIEW_TIMELINE = [
  { year: 'Founding', text: 'PLRCT is established in Ballabgarh, Faridabad, with an initial charter in engineering and pharmacy education under AICTE and PCI norms.' },
  { year: 'Early growth', text: 'Diploma and B.Tech programs in Civil, Mechanical, and Electrical Engineering are introduced as the campus builds out its first laboratory blocks.' },
  { year: 'Diversification', text: 'Computer Science, Electronics & Communication, BCA, BBA, and MBA programs are added, positioning PLRCT as a multi-disciplinary technical campus.' },
  { year: 'Digital-first campus', text: 'Smart classrooms, a digital library wing, and structured industry-placement partnerships are rolled out across departments.' },
  { year: 'Today', text: 'PLRCT is developing AI/ML specializations and expanding industry MoUs, continuing its shift toward an outcomes-driven, innovation-led curriculum.' },
];

export const OVERVIEW_PILLARS = [
  {
    title: 'Institutional Overview',
    body: 'Pt. L.R. College of Technology sits in Ballabgarh, Faridabad, inside the Delhi NCR industrial corridor — a location chosen deliberately, not incidentally. Being minutes from one of North India\'s densest manufacturing and IT belts means the college\'s engineering, management, and pharmacy programs are built with working industry as a neighbor rather than a distant case study. AICTE-approved and PCI-recognized, PLRCT operates under a governance structure that reports academic outcomes, infrastructure standards, and faculty qualifications transparently to regulatory bodies each year.',
  },
  {
    title: 'Academic Excellence',
    body: 'Every program at PLRCT — from B.Tech in Computer Science to Diploma Engineering, BCA, BBA, MBA, and Pharmacy — follows a curriculum benchmarked against AICTE model curricula and refreshed with current industry inputs. Continuous internal assessment, structured mentorship ratios, and department-level academic audits are used to keep classroom outcomes measurable rather than assumed. Faculty are drawn from both academia and practicing industry backgrounds, so theoretical grounding is consistently paired with applied context.',
  },
  {
    title: 'Industry-Oriented Education',
    body: 'Faridabad\'s manufacturing base — home to companies like JCB and Hitachi Construction Machinery, along with a dense ecosystem of automotive and industrial component makers — gives PLRCT students something a purely urban campus cannot offer as easily: a short commute to real factory floors, real quality-control labs, and real hiring managers. Internship tie-ups, guest industry lectures, and live project briefs are woven into the later years of every technical program, so graduates arrive at interviews having already solved problems that look like the ones they\'ll be paid to solve.',
  },
  {
    title: 'Student Development',
    body: 'Academics is one half of the campus experience. PLRCT runs technical societies, a placement cell, sports and cultural fests, and structured soft-skills training (communication, aptitude, group discussion, and interview readiness) that run parallel to the core curriculum from the second year onward. Hostel residents and day scholars alike have access to the same clubs, labs, and mentorship windows — student development at PLRCT is not an add-on reserved for a subset of students.',
  },
  {
    title: 'Innovation and Research',
    body: 'Final-year project work across engineering departments is increasingly steered toward applied problems sourced from local industry rather than purely theoretical exercises, and faculty are encouraged to pursue funded research and paper publication in their specializations. A growing mini-project and hackathon culture in the CSE and ECE departments is feeding an emerging innovation cell, with early conversations underway about a dedicated incubation space for student-led ventures.',
  },
  {
    title: 'Leadership and Values',
    body: 'The institution is governed by a leadership team spanning the Chairman\'s office, Director, and Principal, each accountable for a distinct layer of the college\'s functioning — strategic direction, academic administration, and day-to-day campus governance respectively. Integrity in assessment, transparency in fee and admission processes, and consistency in AICTE/PCI compliance are treated as non-negotiable operating standards rather than marketing language.',
  },
  {
    title: 'Future Vision',
    body: 'PLRCT\'s roadmap over the coming academic cycles centers on expanding AI/ML and data-oriented specializations within the B.Tech CSE stream, deepening formal industry MoUs beyond guest lectures into structured co-op and apprenticeship models, and continuing the shift from single-room lecture delivery toward smart-classroom and digital-library-first pedagogy across every department.',
  },
];

/* ---------------------------------------------------------------------- */
/* INFRASTRUCTURE                                                          */
/* ---------------------------------------------------------------------- */

export const INFRASTRUCTURE_FACILITIES = [
  {
    icon: 'smartboard',
    title: 'Smart Classrooms',
    body: 'Projector- and smart-board-equipped classrooms across departments support recorded lectures, interactive whiteboarding, and hybrid delivery for revision sessions, reducing dependence on single-format chalk-and-talk instruction.',
  },
  {
    icon: 'flask',
    title: 'Advanced Laboratories',
    body: 'Department-specific labs — Applied Sciences, Electronics, Communication, and specialization labs for each engineering branch — are maintained to AICTE equipment norms and refreshed on a rolling basis to keep pace with current syllabi.',
  },
  {
    icon: 'gear',
    title: 'Engineering Workshops',
    body: 'Mechanical and Civil workshops give students hands-on time with fabrication, measurement, and testing equipment before they encounter the same tools on an industry floor — a direct extension of PLRCT\'s applied-learning philosophy.',
  },
  {
    icon: 'monitor',
    title: 'Computer Centers',
    body: 'Networked computer labs serve CSE, ECE, BCA, and MBA coursework alike, with current toolchains for programming, data analysis, and design software maintained across dedicated centers rather than a single shared lab.',
  },
  {
    icon: 'book',
    title: 'Central Library',
    body: 'The central library spans roughly 500 square meters of air-conditioned carpet area, seats a meaningful share of the 1,800+ student body at any one time, and runs a parallel digital library section alongside its physical journal and reference collection.',
  },
  {
    icon: 'auditorium',
    title: 'Auditorium',
    body: 'A dedicated auditorium hosts convocations, technical fests, guest lectures, and cultural events — giving the campus a single large-format venue instead of repurposing classrooms for every gathering.',
  },
  {
    icon: 'hostel',
    title: 'Hostel Facilities',
    body: 'On-campus hostel accommodation is available for students commuting from outside the Faridabad–Ballabgarh–Palwal belt, with supervised residential arrangements maintained separately for the student body.',
  },
  {
    icon: 'sports',
    title: 'Sports Complex',
    body: 'Outdoor and indoor sports facilities support inter-departmental tournaments and regular fitness activity, reflecting PLRCT\'s stance that student development extends past the classroom and lab.',
  },
  {
    icon: 'cafeteria',
    title: 'Cafeteria',
    body: 'A campus cafeteria serves the day-to-day student and faculty population, positioned centrally enough to function as an informal meeting point between lecture blocks.',
  },
  {
    icon: 'bus',
    title: 'Transportation',
    body: 'A dedicated bus fleet connects the campus to surrounding residential pockets across Faridabad, Ballabgarh, and Palwal, reducing commute friction for the majority-local student base.',
  },
  {
    icon: 'medical',
    title: 'Medical Facilities',
    body: 'A basic on-campus medical and first-aid facility, along with tie-ups for emergency referral, gives the residential and day-scholar population a first point of contact for health concerns during campus hours.',
  },
  {
    icon: 'digital',
    title: 'Digital Learning Environment',
    body: 'Beyond smart classrooms, the campus is steadily digitizing attendance, evaluation, and library access — part of a broader push to make administrative and academic workflows paperless and auditable.',
  },
];

/* ---------------------------------------------------------------------- */
/* MESSAGES / LEADERSHIP                                                   */
/* ---------------------------------------------------------------------- */

export const LEADERSHIP = [
  {
    role: 'Chairman',
    name: 'Chairman\'s Message',
    quote: 'An institution is judged not by the size of its campus, but by the confidence with which its graduates walk into the world.',
    bio: 'The Chairman\'s office holds overall strategic responsibility for PLRCT — setting the institution\'s long-term direction, sanctioning capital investment in infrastructure, and safeguarding the values the college was founded on. That responsibility is treated as a continuing obligation to students, parents, and the Faridabad community the college serves, not a one-time founding act.',
    philosophy: 'Growth at PLRCT is measured deliberately: new programs and facilities are added only once the college is confident it can deliver them at the standard already set, rather than expanding for its own sake.',
    commitment: 'A continuing commitment to keeping fees transparent, admissions merit-based, and regulatory compliance (AICTE, PCI) uncompromised across every academic cycle.',
  },
  {
    role: 'Director',
    name: 'Director\'s Message',
    quote: 'Our role is to translate ambition into infrastructure, curriculum, and outcomes students can actually stand on.',
    bio: 'The Director\'s office bridges the Chairman\'s strategic vision and the Principal\'s academic administration — overseeing budget execution for labs and facilities, industry partnership development, and cross-departmental coordination so that engineering, management, and pharmacy programs operate as one coherent institution rather than separate silos.',
    philosophy: 'Infrastructure investment follows curriculum need, not the reverse — a new lab or classroom upgrade is justified by what students are being asked to learn, not the other way around.',
    commitment: 'Building formal, renewable industry MoUs with the manufacturing and technology employers already present across the Faridabad–Delhi NCR corridor.',
  },
  {
    role: 'Principal',
    name: 'Principal\'s Message',
    quote: 'A degree should be evidence of what a student can do, not just where they sat for four years.',
    bio: 'The Principal is responsible for day-to-day academic governance: faculty allocation, examination integrity, attendance and assessment policy, and the department heads who run each engineering, management, and pharmacy program. This is the office closest to a student\'s actual daily experience of the college.',
    philosophy: 'Assessment at PLRCT is designed to be difficult to game and easy to trust — continuous evaluation, transparent grading criteria, and department-level academic audits.',
    commitment: 'Every department head is held to the same standard: measurable learning outcomes, documented faculty qualifications, and a direct line of accountability to the Principal\'s office.',
  },
];

export const LEADERSHIP_VALUES = [
  { title: 'Accountability', body: 'Every layer of leadership — Chairman, Director, Principal, department heads — owns a specific, documented area of responsibility.' },
  { title: 'Transparency', body: 'Fee structures, admission criteria, and regulatory approvals are published and kept current rather than left to word-of-mouth.' },
  { title: 'Consistency', body: 'Policies on assessment, attendance, and compliance apply uniformly across departments and academic years.' },
  { title: 'Approachability', body: 'Leadership offices remain reachable to students and parents through the admissions and grievance channels, not only through formal ceremony.' },
];

/* ---------------------------------------------------------------------- */
/* AFFILIATIONS                                                            */
/* ---------------------------------------------------------------------- */

export const AFFILIATIONS = [
  {
    title: 'AICTE Approval',
    body: 'PLRCT\'s engineering, diploma, and management programs operate under approval from the All India Council for Technical Education (AICTE), the statutory body governing technical education standards across India. This approval is renewed on an annual cycle and covers faculty qualification norms, intake capacity, and infrastructure adequacy.',
  },
  {
    title: 'Pharmacy Council Recognition',
    body: 'The D.Pharm and B.Pharm programs are recognized by the Pharmacy Council of India (PCI), the regulatory authority overseeing pharmacy education, ensuring the curriculum, laboratory standards, and faculty qualifications meet the profession\'s statutory requirements.',
  },
  {
    title: 'University Affiliation',
    body: 'Academic programs are affiliated with the relevant state technical university for curriculum design, examination conduct, and degree conferral — meaning PLRCT\'s degrees carry the same statutory recognition as any other affiliated institution\'s within the state system.',
  },
  {
    title: 'Regulatory Compliance',
    body: 'Annual disclosures — faculty rosters, fee structures, infrastructure audits, and intake data — are filed with the relevant regulatory bodies as a matter of routine compliance rather than reactive paperwork.',
  },
  {
    title: 'Academic Standards',
    body: 'Curriculum design follows AICTE model curricula with periodic revision cycles, keeping course content aligned with both statutory minimums and current industry practice.',
  },
  {
    title: 'Quality Assurance',
    body: 'Internal academic audits, structured faculty feedback loops, and department-level review meetings are used to catch gaps between intended and delivered curriculum before they show up in student outcomes.',
  },
  {
    title: 'Institutional Governance',
    body: 'A defined governance structure — Chairman, Director, Principal, and department heads — keeps strategic, administrative, and academic decision-making separated and accountable, rather than concentrated in a single office.',
  },
  {
    title: 'Future Accreditation Goals',
    body: 'PLRCT is working toward pursuing NAAC and NBA accreditation processes as the institution\'s academic and infrastructure documentation matures — a deliberate next step beyond baseline AICTE/PCI approval.',
  },
];

/* ---------------------------------------------------------------------- */
/* VISION & MISSION                                                        */
/* ---------------------------------------------------------------------- */

export const VISION_STATEMENT =
  'To be a technical and management institution in the Delhi NCR region recognized for graduates who are as prepared for real industry problems as they are for examinations — built on rigorous academics, applied learning, and uncompromised institutional integrity.';

export const MISSION_CARDS = [
  {
    title: 'Academic Excellence',
    body: 'Deliver AICTE-aligned curricula across engineering, management, and pharmacy through qualified faculty, continuous assessment, and department-level accountability for learning outcomes.',
  },
  {
    title: 'Research & Innovation',
    body: 'Encourage faculty research output and steer student final-year projects toward applied, industry-sourced problems rather than purely theoretical exercises.',
  },
  {
    title: 'Industry Collaboration',
    body: 'Build formal, renewable partnerships with employers across the Faridabad–Delhi NCR industrial and IT corridor for internships, live projects, and placement pipelines.',
  },
  {
    title: 'Ethical Leadership',
    body: 'Model transparent governance — clear fee structures, merit-based admissions, and documented compliance — as the institutional standard, not the exception.',
  },
  {
    title: 'Skill Development',
    body: 'Run structured soft-skills, aptitude, and interview-readiness training alongside the core curriculum from the second year onward, for every program and every student.',
  },
  {
    title: 'Social Responsibility',
    body: 'Engage the surrounding Ballabgarh–Faridabad community through outreach, awareness, and skill-building initiatives that extend the campus\'s resources beyond its own enrolled students.',
  },
];

export const CORE_VALUES = [
  { title: 'Integrity', body: 'Assessment, admissions, and compliance decisions are made the same way regardless of who is watching.' },
  { title: 'Excellence', body: 'A standard applied consistently across every department, not reserved for flagship programs.' },
  { title: 'Innovation', body: 'Curriculum and infrastructure are expected to evolve with industry, not remain static between accreditation cycles.' },
  { title: 'Leadership', body: 'Students are trained to take ownership of problems, not just complete assignments.' },
  { title: 'Inclusivity', body: 'Access to labs, mentorship, and campus life is uniform across hostel residents and day scholars alike.' },
  { title: 'Sustainability', body: 'Campus operations and resource use are managed with a long-term institutional horizon in mind.' },
];

export const ROADMAP = [
  { area: 'Education', text: 'Expand AI/ML and data-oriented electives within the B.Tech CSE stream and refresh cross-department curricula on a shorter review cycle.' },
  { area: 'Research', text: 'Grow faculty-led funded research and formalize an applied, industry-sourced final-year project pipeline across engineering departments.' },
  { area: 'Placements', text: 'Deepen recruiter relationships across the local manufacturing and IT corridor and expand pre-placement training beyond final-year students.' },
  { area: 'Global Collaboration', text: 'Pursue exchange and certification partnerships that give PLRCT students exposure beyond the domestic curriculum.' },
  { area: 'Technology', text: 'Continue digitizing classrooms, library access, and administrative workflows toward a fully paperless academic record.' },
  { area: 'Entrepreneurship', text: 'Develop an early-stage incubation space for student ventures emerging from the growing hackathon and mini-project culture.' },
];

/* ---------------------------------------------------------------------- */
/* AEO — shared answer blocks, referenced (not duplicated) across pages    */
/* ---------------------------------------------------------------------- */

export const FAQ_WHY_CHOOSE = {
  q: 'Why choose PLRCT?',
  a: 'PLRCT combines AICTE-approved engineering and management programs with a Faridabad–Delhi NCR location close to major manufacturing employers, giving students applied exposure alongside classroom learning, plus structured placement support and a multi-disciplinary campus spanning engineering, pharmacy, BCA, BBA, and MBA.',
};

export const FAQ_FACILITIES = {
  q: 'What facilities are available at PLRCT?',
  a: 'Smart classrooms, department-specific engineering laboratories, a central air-conditioned library with a digital section, computer centers, an auditorium, hostel accommodation, a sports complex, cafeteria, campus transportation, and basic on-campus medical facilities.',
};

export const FAQ_APPROVED = {
  q: 'Is PLRCT approved?',
  a: 'Yes. PLRCT\'s engineering and management programs are approved by AICTE, and its pharmacy programs are recognized by the Pharmacy Council of India (PCI), with academic affiliation to the relevant state technical university.',
};

export const FAQ_VISION = {
  q: 'What is PLRCT\'s institutional vision?',
  a: 'To be recognized across the Delhi NCR region for graduates prepared for real industry problems, not just examinations — built on rigorous academics, applied learning, and transparent institutional governance.',
};

export const FAQ_LEADERSHIP = {
  q: 'Who leads PLRCT?',
  a: 'PLRCT is governed by a Chairman (strategic direction), a Director (institutional and industry-partnership oversight), and a Principal (academic administration), supported by department heads across each program.',
};

export const AEO_BLOCKS = [FAQ_WHY_CHOOSE, FAQ_FACILITIES, FAQ_APPROVED, FAQ_VISION, FAQ_LEADERSHIP];