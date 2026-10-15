import Link from "next/link";
import "./institution.css";

const programmes = [
  {
    number: "01",
    category: "ENGINEERING",
    title: "Diploma in Engineering",
    description:
      "Build a strong technical foundation with practical learning and engineering fundamentals after Class 10.",
    duration: "Typically 3 Years",
    href: "/courses/diploma",
  },
  {
    number: "02",
    category: "ENGINEERING",
    title: "B.Tech",
    description:
      "Explore engineering, technology, software development and innovation through undergraduate study.",
    duration: "Typically 4 Years",
    href: "/courses/btech",
  },
  {
    number: "03",
    category: "MANAGEMENT",
    title: "BBA",
    description:
      "Develop business knowledge, leadership skills and an understanding of modern management.",
    duration: "Typically 3 Years",
    href: "/courses/bba",
  },
  {
    number: "04",
    category: "COMPUTER APPLICATIONS",
    title: "BCA",
    description:
      "Start your journey into programming, web development, databases and computer applications.",
    duration: "Typically 3 Years",
    href: "/courses/bca",
  },
  {
    number: "05",
    category: "ADVANCED ENGINEERING",
    title: "B.Tech Lateral Entry",
    description:
      "An opportunity for eligible diploma holders to pursue engineering through lateral entry.",
    duration: "Typically 3 Years",
    href: "/courses/btech-lateral-entry",
  },
  {
    number: "06",
    category: "POSTGRADUATE",
    title: "M.Tech",
    description:
      "Advance your engineering expertise through specialised technical and professional learning.",
    duration: "Typically 2 Years",
    href: "/courses/mtech",
  },
];

const highlights = [
  {
    number: "01",
    title: "Career-Oriented Learning",
    text: "Academic learning designed to help students develop knowledge and professional skills.",
  },
  {
    number: "02",
    title: "Practical Exposure",
    text: "Opportunities to connect theoretical concepts with practical and application-based learning.",
  },
  {
    number: "03",
    title: "Multiple Study Pathways",
    text: "Explore technical, management and computer application programmes based on your eligibility.",
  },
  {
    number: "04",
    title: "Student Development",
    text: "Encouraging confidence, communication, responsibility and continuous learning.",
  },
];

export const metadata = {
  title: "Institution | PT L.R. Group of Institutions, Faridabad",
  description:
    "Discover PT L.R. Group of Institutions, Faridabad, its academic programmes, educational approach and admission opportunities.",
  alternates: {
    canonical: "/institution",
  },
};

export default function InstitutionPage() {
  return (
    <main className="institution-page">
      {/* HERO */}
      <section className="institution-hero">
        <div className="institution-hero__content">
          <span className="institution-eyebrow institution-eyebrow--light">
            LEARNING TODAY. LEADING TOMORROW.
          </span>

          <h1>
            Building Knowledge.
            <br />
            <span>Shaping Futures.</span>
          </h1>

          <p>
            Welcome to PT L.R. Group of Institutions, Faridabad — a place
            to explore educational opportunities, develop new skills and
            prepare for the next step in your academic journey.
          </p>

          <div className="institution-hero__actions">
            <Link
              href="/admission"
              className="institution-btn institution-btn--gold"
            >
              Explore Admissions <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/courses"
              className="institution-btn institution-btn--outline"
            >
              Explore Courses
            </Link>
          </div>

          <div className="institution-hero__caption">
            <span className="institution-hero__caption-line" />
            <span>PT L.R. GROUP OF INSTITUTIONS · FARIDABAD</span>
          </div>
        </div>

        <div className="institution-hero__seal" aria-hidden="true">
          <span>PT L.R.</span>
          <span className="institution-hero__seal-star">✳</span>
          <span>EDUCATION</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="institution-section institution-intro">
        <div className="institution-intro__left">
          <span className="institution-eyebrow">ABOUT OUR INSTITUTION</span>

          <h2>
            Education with
            <br />
            <span>purpose and direction.</span>
          </h2>
        </div>

        <div className="institution-intro__right">
          <p className="institution-lead">
            Every successful journey begins with the right learning
            environment.
          </p>

          <p>
            PT L.R. Group of Institutions welcomes students who aspire to
            build careers in engineering, technology, management and
            computer applications. Our aim is to help students understand
            their academic options and take informed steps towards their
            future.
          </p>

          <p>
            From choosing a suitable programme to understanding admission
            requirements, students can explore educational pathways aligned
            with their qualifications and career interests.
          </p>

          <Link
            href="/about"
            className="institution-text-link"
          >
            Discover our institution <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* MESSAGE BANNER */}
      <section className="institution-message">
        <div className="institution-message__content">
          <span className="institution-eyebrow institution-eyebrow--light">
            OUR EDUCATIONAL APPROACH
          </span>

          <h2>
            Learn with curiosity.
            <br />
            Grow with confidence.
          </h2>

          <p>
            We believe education is more than earning a qualification. It is
            about developing knowledge, strengthening skills and preparing
            for the opportunities and responsibilities of tomorrow.
          </p>

          <Link href="/about/why-us" className="institution-btn institution-btn--white">
            Why Choose PT L.R.? <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* ACADEMIC PROGRAMMES */}
      <section className="institution-section institution-programmes">
        <div className="institution-section-heading">
          <div>
            <span className="institution-eyebrow">ACADEMIC OPPORTUNITIES</span>
            <h2>
              Find your <span>field.</span>
            </h2>
          </div>

          <p>
            Explore programmes based on your previous qualification,
            interests and long-term career goals.
          </p>
        </div>

        <div className="institution-programme-grid">
          {programmes.map((programme) => (
            <article className="institution-programme-card" key={programme.number}>
              <div className="institution-programme-card__top">
                <span className="institution-programme-card__number">
                  {programme.number}
                </span>
                <span className="institution-programme-card__arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              <span className="institution-programme-card__category">
                {programme.category}
              </span>

              <h3>{programme.title}</h3>

              <p>{programme.description}</p>

              <div className="institution-programme-card__footer">
                <span>{programme.duration}</span>
                <Link href={programme.href} aria-label={`Explore ${programme.title}`}>
                  Explore <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className="institution-note">
          Programme availability, duration and eligibility are subject to
          the applicable curriculum and admission rules for the relevant
          academic session.
        </p>

        <div className="institution-programmes__action">
          <Link href="/courses" className="institution-btn institution-btn--red">
            View All Courses <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* INSTITUTIONAL HIGHLIGHTS */}
      <section className="institution-highlights">
        <div className="institution-section institution-highlights__inner">
          <div className="institution-highlights__heading">
            <span className="institution-eyebrow institution-eyebrow--light">
              THE PT L.R. APPROACH
            </span>

            <h2>
              A foundation for
              <br />
              <span>your next chapter.</span>
            </h2>

            <p>
              Discover the learning priorities that can help shape a
              meaningful academic and professional journey.
            </p>

            <Link href="/admission" className="institution-btn institution-btn--gold">
              Start Your Journey <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="institution-highlights__list">
            {highlights.map((item) => (
              <article className="institution-highlight" key={item.number}>
                <span className="institution-highlight__number">
                  {item.number}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

                <span className="institution-highlight__plus" aria-hidden="true">
                  +
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section className="institution-cta">
        <div className="institution-cta__inner">
          <div>
            <span className="institution-eyebrow">
              YOUR FUTURE STARTS WITH A STEP
            </span>

            <h2>
              Ready to explore
              <br />
              <span>your possibilities?</span>
            </h2>

            <p>
              Find a programme that suits your qualifications and take the
              next step towards your educational goals.
            </p>
          </div>

          <div className="institution-cta__actions">
            <Link
              href="/admission"
              className="institution-btn institution-btn--red"
            >
              Apply for Admission <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/contact"
              className="institution-text-link"
            >
              Contact the institution <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}