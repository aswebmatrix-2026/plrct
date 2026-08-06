export const PROGRAMS = [
  {
    id: 'btech',
    name: 'B.Tech Engineering',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry & Mathematics',
    outcomes: 'Software, core-engineering & analytics roles',
    demand: 'Very High',
    departments: ['CSE', 'EE', 'ME', 'CE', 'ECE', 'AI & ML', 'Data Science', 'IT'],
    href: '#btech',
    icon: 'engineering',
  },
  {
    id: 'diploma',
    name: 'Diploma Engineering',
    duration: '3 Years',
    eligibility: '10th pass (Science & Mathematics)',
    outcomes: 'Junior engineer roles & lateral entry to B.Tech',
    demand: 'High',
    departments: ['CSE', 'EE', 'ME', 'CE', 'ECE', 'IT'],
    href: '#diploma',
    icon: 'diploma',
  },
  {
    id: 'mtech',
    name: 'M.Tech Engineering',
    duration: '2 Years',
    eligibility: 'B.Tech / B.E. in the relevant discipline',
    outcomes: 'R&D, academia, PSU & senior engineering roles',
    demand: 'Growing',
    departments: ['CSE', 'EE', 'ME', 'CE', 'ECE'],
    href: '#mtech',
    icon: 'research',
  },
];

export const DEPARTMENTS = [
  {
    code: 'CSE',
    name: 'Computer Science Engineering',
    tags: ['Programming', 'AI', 'Data Science', 'Cloud Computing', 'Cybersecurity', 'Software Development'],
    description:
      "Computer Science Engineering at PLRCT is built around one idea: students should be writing real code from year one, not just studying it. The curriculum moves through data structures, algorithms, operating systems, databases and computer networks, then opens into electives in artificial intelligence, cloud computing and cybersecurity as students specialise. Every semester pairs theory with lab hours in modern computing facilities, so concepts like machine learning pipelines, containerised deployment or secure network design are tested hands-on, not left on a whiteboard. Final-year students build a full software project, often in partnership with an industry mentor, that becomes the centrepiece of their placement portfolio. Career opportunities span software development, full-stack engineering, cloud and DevOps roles, data analysis, AI/ML engineering and information-security positions across product companies, IT services firms and startups in Delhi NCR's fast-growing tech corridor. Graduates who want to go further can pursue M.Tech specialisations, GATE-based PSU recruitment, or postgraduate study abroad, and the department's project culture gives them a research foundation for any of these paths. Faridabad's proximity to Gurugram and Noida means CSE students have easy access to internships at product and services companies well before graduation, and the placement cell runs dedicated coding-interview and system-design preparation tracks alongside general aptitude training. Salary prospects for CSE graduates are consistently the strongest in the engineering cohort, driven by sustained industry demand for software and AI talent, and the department's laboratories are refreshed each year to keep pace with current tooling in cloud platforms, data engineering and applied AI.",
    facts: [
      ['Career opportunities', 'Software engineer, full-stack developer, AI/ML engineer, cloud engineer, cybersecurity analyst, data analyst'],
      ['Higher education', 'M.Tech in CSE/AI, GATE-based M.E./M.Tech admission, MS abroad'],
      ['Industry demand', 'Very high — IT services, product companies and startups across Delhi NCR'],
      ['Salary prospects', 'Strongest average package band among engineering branches'],
    ],
    labs: ['Programming & DSA Lab', 'AI & Machine Learning Lab', 'Cloud & Networks Lab', 'Cybersecurity Lab'],
  },
  {
    code: 'EE',
    name: 'Electrical Engineering',
    tags: ['Power Systems', 'Electrical Machines', 'Renewable Energy', 'Industrial Automation', 'PLC', 'Smart Grid'],
    description:
      "Electrical Engineering at PLRCT trains students to design, operate and protect the systems that generate, transmit and consume electrical power. Core coursework in circuit theory, electrical machines and power systems is reinforced through lab work on real machines and protection relays, while later semesters bring in renewable energy systems, industrial automation and PLC-based control, reflecting where the grid itself is heading. Students work on smart-grid and automation projects that mirror what utilities and industrial plants are deploying today, giving them practical fluency with sensors, drives and control panels rather than only simulation software. The department maintains strong ties with power utilities, EPC contractors and manufacturing plants across Faridabad's industrial belt, which feeds a steady stream of internships and live projects into the final two years. Career paths include roles as electrical design engineer, power-systems engineer, automation and PLC engineer, renewable-energy project engineer, and positions in electrical utilities, discoms, manufacturing plants and EPC companies. Government and PSU recruitment remains a major draw for this branch, with graduates regularly appearing for exams at state electricity boards, NTPC, PGCIL and similar organisations, supported by the placement cell's PSU-focused preparation track. Students aiming higher can pursue M.Tech in Power Systems or Electrical Machines, or move into research on renewable integration and smart grids. The renewable energy and industrial automation labs are the department's most active spaces, where students build and test solar and automation set-ups that translate directly into industry-ready skills valued by both public-sector and private employers.",
    facts: [
      ['Career opportunities', 'Electrical design engineer, power systems engineer, automation/PLC engineer, renewable energy engineer'],
      ['Higher education', 'M.Tech in Power Systems / Electrical Machines, PSU-linked GATE routes'],
      ['Industry demand', 'Steady — utilities, EPC contractors, manufacturing and renewable energy firms'],
      ['Salary prospects', 'Strong in PSU and utility roles; competitive in EPC and automation firms'],
    ],
    labs: ['Electrical Machines Lab', 'Power Systems Lab', 'Renewable Energy Lab', 'PLC & Automation Lab'],
  },
  {
    code: 'ME',
    name: 'Mechanical Engineering',
    tags: ['Manufacturing', 'CAD/CAM', 'Robotics', 'Thermal Engineering', 'Automobile', 'Industrial Design'],
    description:
      "Mechanical Engineering is PLRCT's largest and oldest department, and its workshops are built to match — full manufacturing bays, a thermal engineering lab and a dedicated CAD/CAM studio where students move from hand sketches to machined parts within the same semester. The programme covers manufacturing processes, thermodynamics, machine design and fluid mechanics, then layers in robotics, automobile engineering and industrial design as students specialise, so graduates leave with both classical mechanical fundamentals and exposure to automation-era tooling. Workshop hours are treated as core, not supplementary, with students operating lathes, CNC machines and 3D printers, and running thermal and fluid experiments that make textbook concepts tangible. Regular industrial visits to manufacturing plants, automobile companies and design studios in the NCR belt connect classroom learning to factory-floor practice well before final placements. Career opportunities include manufacturing/production engineer, design engineer, CAD/CAM engineer, robotics and automation engineer, quality engineer and roles in the automotive and industrial-design sectors, alongside strong PSU and government-sector demand for core mechanical graduates. Students who want to specialise further can pursue M.Tech in mechanical disciplines, competitive GATE-based PSU recruitment, or entrepreneurship in manufacturing and product design, an area the department actively encourages through its innovation cell. Faridabad's long-standing industrial ecosystem — one of North India's manufacturing hubs — gives ME students an unusually direct line from workshop training to shop-floor employment, and the placement cell maintains relationships with a broad base of manufacturing and automotive recruiters as a result.",
    facts: [
      ['Career opportunities', 'Manufacturing/production engineer, design engineer, robotics engineer, quality engineer'],
      ['Higher education', 'M.Tech in Manufacturing, Design, Thermal or Robotics; GATE-based PSU routes'],
      ['Industry demand', 'High — Faridabad\u2019s manufacturing and automotive industrial belt'],
      ['Salary prospects', 'Solid across manufacturing, automotive and PSU recruitment'],
    ],
    labs: ['Manufacturing Workshop', 'CAD/CAM Studio', 'Thermal Engineering Lab', 'Robotics Lab'],
  },
  {
    code: 'CE',
    name: 'Civil Engineering',
    tags: ['Structural Engineering', 'Construction', 'Transportation', 'Surveying', 'Environmental Engineering'],
    description:
      "Civil Engineering at PLRCT prepares students to plan, design and build the infrastructure a growing NCR region depends on. The curriculum runs through structural analysis, construction technology, surveying, transportation engineering and environmental engineering, with laboratory and field components in each — soil and material testing, surveying instrument practice, and structural modelling using current design software. Site visits to active construction projects, road works and infrastructure sites around Faridabad and the wider NCR are built into the programme, so students see structural and construction principles applied at full scale rather than only in scaled lab models. The department emphasises both traditional structural design and the environmental and transportation planning skills that Indian cities increasingly demand as urban infrastructure expands. Career opportunities include structural engineer, site/construction engineer, transportation planner, surveyor, environmental engineer and roles with construction firms, infrastructure developers, government public-works departments and urban planning bodies. Government and PSU opportunities are significant for civil graduates, with regular recruitment through state PWDs, municipal corporations and infrastructure PSUs, supported by the department's exam-preparation guidance. Higher education pathways include M.Tech in Structural, Transportation or Environmental Engineering, and civil graduates who clear GATE often move into PSU or research roles. With Delhi NCR in a sustained infrastructure and urban-development phase — metro expansion, highway corridors and housing projects — demand for civil engineers in the region remains steady, and PLRCT's location within this belt gives students direct access to live projects and site-based internships throughout their degree.",
    facts: [
      ['Career opportunities', 'Structural engineer, construction/site engineer, transportation planner, environmental engineer'],
      ['Higher education', 'M.Tech in Structural, Transportation or Environmental Engineering; GATE-based PSU routes'],
      ['Industry demand', 'High — NCR infrastructure, metro and highway expansion'],
      ['Salary prospects', 'Competitive, with strong government and PSU recruitment'],
    ],
    labs: ['Structural Engineering Lab', 'Surveying Lab', 'Environmental Engineering Lab', 'Materials Testing Lab'],
  },
  {
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    tags: ['Embedded Systems', 'IoT', 'VLSI', 'Communication Systems', 'Automation'],
    description:
      "Electronics & Communication Engineering sits at the intersection of hardware and connectivity, and PLRCT's ECE programme is built to keep both sides strong. Students move through analog and digital electronics, signals and communication systems, then specialise in embedded systems, IoT and VLSI design — the three areas driving most current demand in the electronics industry. Lab work includes building and programming embedded boards, prototyping IoT devices, and working with VLSI design tools, so graduates leave with demonstrable hardware projects rather than only circuit theory. The embedded systems and IoT labs are the department's busiest spaces, where student teams build connected devices and automation prototypes that regularly form the basis of final-year projects and startup ideas incubated through the college's innovation cell. Career opportunities include embedded systems engineer, IoT developer, VLSI design engineer, communication systems engineer, and automation engineer, with employers spanning telecom, semiconductor, consumer electronics and industrial automation companies across the NCR and beyond. The branch also feeds strongly into government and PSU recruitment in telecom and electronics-manufacturing organisations, alongside private-sector opportunities in India's expanding semiconductor and electronics-design ecosystem. Students aiming for deeper specialisation can pursue M.Tech in VLSI Design, Embedded Systems or Communication Engineering, or pursue GATE-based admission to premier institutes. As India's electronics manufacturing and design sector expands under national policy support, ECE graduates from PLRCT are positioned to enter a field with rising demand for both hardware design and connected-systems expertise, backed by placement support tuned specifically to embedded and VLSI interview processes.",
    facts: [
      ['Career opportunities', 'Embedded systems engineer, IoT developer, VLSI design engineer, communication systems engineer'],
      ['Higher education', 'M.Tech in VLSI Design, Embedded Systems or Communication Engineering'],
      ['Industry demand', 'Rising — telecom, semiconductor and industrial automation sectors'],
      ['Salary prospects', 'Competitive, especially in VLSI, embedded and telecom roles'],
    ],
    labs: ['Embedded Systems Lab', 'IoT Lab', 'VLSI Design Lab', 'Communication Systems Lab'],
  },
];

export const FEATURES = [
  { title: 'Industry-Oriented Curriculum', text: 'Course content mapped to current industry practice and reviewed with employer input each year.', icon: 'curriculum' },
  { title: 'Advanced Laboratories', text: 'Department-wise labs equipped for hands-on practice, from PLC panels to VLSI design tools.', icon: 'lab' },
  { title: 'Experienced Faculty', text: 'Faculty combining academic depth with industry and research experience across every department.', icon: 'faculty' },
  { title: 'Practical Training', text: 'Workshops, live projects and industrial visits built into every semester, not left to electives.', icon: 'practical' },
  { title: 'Internship Opportunities', text: 'Structured internships with regional manufacturing, IT and infrastructure employers.', icon: 'internship' },
  { title: 'Placement Assistance', text: 'Dedicated placement cell running training, mock interviews and recruiter drives year-round.', icon: 'placement' },
  { title: 'Soft Skills Training', text: 'Communication, teamwork and interview-readiness built alongside technical coursework.', icon: 'soft-skills' },
  { title: 'Entrepreneurship Development', text: 'An innovation cell supporting student ventures from prototype to pitch.', icon: 'entrepreneur' },
  { title: 'Research & Innovation', text: 'Faculty-guided research projects and publication opportunities from third year onward.', icon: 'research' },
  { title: 'M.Tech Research Guidance', text: 'Structured thesis mentoring and lab access for postgraduate research scholars.', icon: 'mtech-research' },
];

export const LABS = [
  { title: 'Computer Lab', desc: 'High-spec workstations for programming, AI and cloud coursework.', size: 'wide' },
  { title: 'Electrical Lab', desc: 'Machines, drives and protection systems for hands-on power engineering.', size: 'normal' },
  { title: 'Mechanical Workshop', desc: 'Manufacturing bays with lathes, CNC and fabrication tools.', size: 'tall' },
  { title: 'Civil Engineering Lab', desc: 'Materials testing, surveying and structural modelling equipment.', size: 'normal' },
  { title: 'Electronics Lab', desc: 'Embedded systems, IoT prototyping and communication test benches.', size: 'normal' },
  { title: 'AI Lab', desc: 'GPU-enabled systems for machine learning and applied AI projects.', size: 'wide' },
  { title: 'Robotics Lab', desc: 'Robotics kits and automation cells for mechanical and ECE projects.', size: 'normal' },
  { title: 'Smart Classroom', desc: 'Interactive-display classrooms for blended, outcome-based teaching.', size: 'normal' },
  { title: 'Research Laboratory', desc: 'Shared postgraduate space for M.Tech thesis and faculty research.', size: 'tall' },
  { title: 'Innovation Center', desc: 'Prototyping and incubation space for student ventures and projects.', size: 'wide' },
];

export const CURRICULUM_POINTS = [
  { tag: '01', title: 'Outcome-Based Education', text: 'Every course maps to defined learning outcomes, reviewed each academic year.' },
  { tag: '02', title: 'Live Projects', text: 'Semester projects built around real industry or community problems.' },
  { tag: '03', title: 'Industrial Visits', text: 'Site visits to manufacturing plants, construction sites and IT campuses.' },
  { tag: '04', title: 'Certifications', text: 'Add-on certification tracks in cloud, automation and design tools.' },
  { tag: '05', title: 'Workshops', text: 'Hands-on workshops supplementing core lab hours each semester.' },
  { tag: '06', title: 'Research Exposure', text: 'Undergraduate research opportunities alongside faculty projects.' },
  { tag: '07', title: 'Innovation Culture', text: 'Innovation cell support for prototypes, patents and student startups.' },
  { tag: '08', title: 'M.Tech Research Projects', text: 'Thesis-driven postgraduate research with dedicated lab access.' },
];

export const CAREERS = [
  'Software Engineer', 'Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer',
  'Electronics Engineer', 'Data Analyst', 'AI Engineer', 'Research Engineer',
  'Project Engineer', 'Government Jobs', 'PSU Opportunities', 'Entrepreneurship',
  'Higher Education', 'Ph.D. & Research Careers',
];

export const PLACEMENT_SUPPORT = [
  { title: 'Placement Training', text: 'Structured training runs through the final two semesters.' },
  { title: 'Resume Building', text: 'One-on-one resume and portfolio reviews with mentors.' },
  { title: 'Aptitude Preparation', text: 'Quantitative, logical and technical aptitude practice sessions.' },
  { title: 'Mock Interviews', text: 'Panel-style mock interviews with feedback before real drives.' },
  { title: 'Corporate Mentoring', text: 'Industry mentors guiding students through live projects.' },
  { title: 'Internship Support', text: 'Placement cell coordination for semester and summer internships.' },
  { title: 'Industry Partnerships', text: 'Standing partnerships with regional manufacturing and IT employers.' },
  { title: 'Research Collaborations', text: 'Joint projects with industry R&D teams for postgraduate students.' },
];

export const ADMISSION_STEPS = [
  { title: 'Online Application', text: 'Submit the application form with academic and personal details.' },
  { title: 'Document Verification', text: 'Upload and verify mark sheets, ID proof and category certificates.' },
  { title: 'Counseling', text: 'Attend counseling for branch preference and seat allotment.' },
  { title: 'Admission Confirmation', text: 'Confirm your seat with fee payment and final document submission.' },
];

export const ADMISSION_NOTES = [
  { title: 'Eligibility', text: 'Varies by programme — 10th pass for Diploma, 10+2 with PCM for B.Tech, relevant B.Tech/B.E. for M.Tech.' },
  { title: 'Scholarships', text: 'Merit and need-based scholarships available across all engineering programmes.' },
  { title: 'Lateral Entry', text: 'Diploma holders can join B.Tech directly into the second year.' },
  { title: 'Required Documents', text: 'Mark sheets, transfer certificate, category certificate and ID proof.' },
];

export const FAQS = [
  { q: 'Which engineering branches are available at PLRCT?', a: 'PLRCT offers B.Tech and Diploma programmes in Computer Science, Electrical, Mechanical, Civil and Electronics & Communication Engineering, with B.Tech additionally covering AI & ML, Data Science and Information Technology, plus M.Tech specialisations across the core branches.' },
  { q: 'What is the eligibility for B.Tech admission?', a: 'Candidates need 10+2 with Physics, Chemistry and Mathematics, meeting the minimum aggregate percentage set for the relevant admission cycle, along with a valid entrance score where applicable.' },
  { q: 'What is the eligibility for Diploma Engineering?', a: 'A pass in Class 10 with Science and Mathematics is the standard eligibility for the 3-year Diploma Engineering programmes.' },
  { q: 'What is the eligibility for M.Tech admission?', a: 'Candidates need a B.Tech or B.E. degree in the relevant engineering discipline, typically with a valid GATE score or as per current admission norms.' },
  { q: 'Is PLRCT AICTE approved?', a: 'Yes, Pt. L.R. College of Technology is an AICTE-approved institution offering degree and diploma engineering programmes.' },
  { q: 'Are internships provided during the programme?', a: 'Yes, structured internships are arranged with manufacturing, IT and infrastructure employers across the Delhi NCR region, coordinated through the placement cell.' },
  { q: 'How are placements at PLRCT?', a: 'The placement cell runs year-round training, mock interviews and recruiter drives, with strong participation from regional manufacturing, IT services and infrastructure companies.' },
  { q: 'Can Diploma students join B.Tech?', a: 'Yes, Diploma Engineering graduates are eligible for lateral entry directly into the second year of the relevant B.Tech programme.' },
  { q: 'Are laboratories available for every department?', a: 'Yes, each engineering department has dedicated laboratories — from power systems and manufacturing workshops to AI, IoT and VLSI design labs.' },
  { q: 'Is research available for M.Tech students?', a: 'Yes, M.Tech students work on thesis-driven research projects with faculty guidance, dedicated lab access and industry collaboration opportunities.' },
  { q: 'How can students apply to PLRCT?', a: 'Students can apply through the online application process, followed by document verification, counseling and admission confirmation.' },
  { q: 'Is hostel accommodation available?', a: 'Yes, hostel accommodation is available for outstation students, supporting admissions from across Haryana, Delhi NCR and neighbouring states.' },
];

export const AEO_BLOCKS = [
  { q: 'What courses does PLRCT offer?', a: 'PLRCT offers B.Tech (4 years), Diploma Engineering (3 years) and M.Tech (2 years) across Computer Science, Electrical, Mechanical, Civil, Electronics & Communication, AI & ML, Data Science and IT.' },
  { q: 'Is PLRCT AICTE approved?', a: 'Yes. PLRCT is an AICTE-approved engineering college offering degree and diploma programmes.' },
  { q: 'What is the admission process?', a: 'Admission follows four steps: online application, document verification, counseling, and admission confirmation.' },
  { q: 'Which engineering branches are available?', a: 'CSE, Electrical, Mechanical, Civil, ECE, AI & ML, Data Science and IT are available across B.Tech, Diploma and M.Tech.' },
  { q: 'Does PLRCT offer M.Tech?', a: 'Yes, PLRCT offers 2-year M.Tech programmes in CSE, Electrical, Mechanical, Civil and ECE with research and thesis components.' },
  { q: 'What are the placement opportunities?', a: 'PLRCT runs a dedicated placement cell offering training, internships and recruiter drives with manufacturing, IT and infrastructure companies across Delhi NCR.' },
];