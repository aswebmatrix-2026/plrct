import styles from "./page.module.css";

const objectives = [
  {
    title: "Consistent institutional improvement",
    body:
      "Build a system for aware, consistent action that improves the academic and administrative performance of the institution.",
    accent: "red",
  },
  {
    title: "A culture of quality",
    body:
      "Promote institutional functioning toward quality enhancement by internalising a quality culture and institutionalising best practices.",
    accent: "gold",
  },
  {
    title: "Research and participation",
    body:
      "Uplift the standard of training and research, and expand the institution's participation in state and national forums.",
    accent: "green",
  },
];

const strategies = [
  "Timely, efficient and progressive performance of academic, administrative and financial responsibilities",
  "Relevant and quality academic and research programmes",
  "Equitable access to and affordability of academic programmes for all sections of society",
  "Optimisation and combination of new methods of teaching and learning",
  "A credible assessment and evaluation process",
  "Adequate maintenance and provision of support structures and services",
  "Implementation of tools that close gaps and introduce modern technique",
];

const functions = [
  {
    tag: "Planning",
    text:
      "Develop parameters for academic and administrative activities to raise the quality of education.",
  },
  {
    tag: "Feedback",
    text:
      "Collect and analyse feedback from all stakeholders on quality-related processes, and share findings widely.",
  },
  {
    tag: "Events",
    text:
      "Arrange inter- and intra-institutional workshops and seminars on quality themes, and promote quality circles.",
  },
  {
    tag: "Records",
    text:
      "Ensure documentation of every programme and activity that leads to quality improvement.",
  },
  {
    tag: "Database",
    text:
      "Prepare and maintain the institutional database through MIS, updating it from time to time.",
  },
  {
    tag: "Audit",
    text:
      "Ensure periodic Academic and Administrative Audit, and follow up on the required action.",
  },
  {
    tag: "Reporting",
    text:
      "Prepare and submit the Annual Quality Assurance Report (AQAR) per NAAC guidelines and parameters.",
  },
];

export default function Page() {
  return (
    <main className={styles.page}>
      {/* Nav */}
      <header className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>LR</span>
            <div className={styles.brandText}>
              <span className={styles.brandName}>
                Pt. LR College of Technology
              </span>
              <span className={styles.brandSub}>Faridabad</span>
            </div>
          </div>
          <a href="#contact" className={styles.navCta}>
            Contact IQAC
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Internal Quality Assurance Cell</p>
          <h1 className={styles.heroTitle}>
            Quality doesn't happen by chance.
            <br />
            It's planned, guided and monitored.
          </h1>
          <p className={styles.heroLead}>
            IQAC coordinates the efforts of every department at Pt. LR
            College of Technology toward one goal: academic excellence that
            holds up to NAAC and AICTE standards, year after year.
          </p>

          <div className={styles.statRow}>
            <div className={styles.stat}>
              <span className={styles.statNum}>1994</span>
              <span className={styles.statLabel}>
                NAAC established by the UGC
              </span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <span className={styles.statNum}>AQAR</span>
              <span className={styles.statLabel}>
                Filed every year, without fail
              </span>
            </div>
            <div className={styles.statDivider} aria-hidden="true" />
            <div className={styles.stat}>
              <span className={styles.statNum}>7</span>
              <span className={styles.statLabel}>
                Core functions IQAC carries out
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <p className={styles.aboutQuote}>
            "The Internal Quality Assurance Cell is the driving force for
            enhancing quality — working out strategies and techniques that
            remove deficiencies before they take root."
          </p>
          <p className={styles.aboutBody}>
            To maintain standards of technical expertise among faculty, and
            of research, training and personality development, AICTE and
            NAAC identified a clear need for an internal quality mechanism in
            every institution. At Pt. LR College of Technology, that
            mechanism is IQAC — it plans, guides and monitors Quality
            Assurance and Quality Enhancement activities across all
            departments, and keeps institutional data current as technology
            and expectations change.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Objectives</h2>
          <p className={styles.sectionLead}>
            What the cell exists to achieve, in three parts.
          </p>

          <div className={styles.objectiveGrid}>
            {objectives.map((item) => (
              <article
                key={item.title}
                className={styles.objectiveCard}
                data-accent={item.accent}
              >
                <h3 className={styles.objectiveTitle}>{item.title}</h3>
                <p className={styles.objectiveBody}>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section className={`${styles.section} ${styles.sectionGray}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>Strategies</h2>
          <p className={styles.sectionLead}>
            How the objectives get carried out on the ground.
          </p>

          <ul className={styles.strategyList}>
            {strategies.map((item) => (
              <li key={item} className={styles.strategyItem}>
                <svg
                  className={styles.checkIcon}
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="10" fill="var(--green)" />
                  <path
                    d="M5.5 10.2l2.7 2.7 6.3-6.3"
                    stroke="white"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Functions */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionInner}>
          <h2 className={`${styles.sectionTitle} ${styles.onDark}`}>
            Functions
          </h2>
          <p className={`${styles.sectionLead} ${styles.onDarkMuted}`}>
            The recurring work IQAC carries out through the year.
          </p>

          <div className={styles.functionList}>
            {functions.map((item) => (
              <div key={item.tag} className={styles.functionRow}>
                <span className={styles.functionTag}>{item.tag}</span>
                <p className={styles.functionText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={styles.footer}>
        <div className={styles.footerInner}>
          <div>
            <p className={styles.footerName}>
              Internal Quality Assurance Cell
            </p>
            <p className={styles.footerSub}>
              Pt. LR College of Technology, Faridabad
            </p>
          </div>
          <p className={styles.footerNote}>
            Established to plan, guide and monitor Quality Assurance and
            Quality Enhancement across the institution.
          </p>
        </div>
      </footer>
    </main>
  );
}