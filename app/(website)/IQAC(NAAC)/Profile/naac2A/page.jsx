import "./naac2a.css";

export const metadata = {
  title: "2(a) Institutional Preparedness for NEP | Pt. L.R. College of Technology, Faridabad",
  description:
    "How Pt. L.R. College of Technology, Faridabad is preparing for the National Education Policy (NEP): multidisciplinary curriculum, Academic Bank of Credits, skill development, Indian Knowledge System, outcome based education and online education.",
};

const data = [
  {
    title: "Multidisciplinary/interdisciplinary:",
    description:
      "The vision of National Education Policy is to provide quality education on global standards with diversity for all curriculum and pedagogy with technological innovations in teaching-learning process. Since the Institute is an affiliated Institute and depends on affiliating university for any innovative change and incorporate flexible curriculum. The Maharshi Dayanand University has initiated steps in the direction of NEP and offers Professional Elective courses and Open Elective Courses, Environmental Education, Indian Culture etc. as part of choice based credit system.",
  },
  {
    title: "Academic bank of credits(ABC):",
    description:
      "The University has initiated measures towards academic bank of credits; however, it is in initial stages. The institution has not registered under ABC, it is only the University that can register to avail multiple entries and exit. Efforts are in progress for seamless collaboration in terms of research activities with institutes of higher learning.",
  },
  {
    title: "Skill development:",
    description:
      "There is dire need of skill development among the students, apart from regular study of Diploma, UG, PG. The institute has already launched several skill development programme, so that more opportunities are made available from the rural and down trodden to gain employment.",
  },
  {
    title:
      "Appropriate integration of Indian Knowledge system (teaching in Indian Language, culture, using online course):",
    description:
      "Teaching of Indian Knowledge System into the curriculum has been initiated by the affiliating University and is being followed. The students in the Institute are from diverse background. The Institute promotes the Bi-lingual teaching. Indian arts and culture is being encouraged by conducting different festivals and organizing traditional days, integrating system of various regions and states, so as to enable the students to know each other well.",
  },
  {
    title: "Focus on Outcome based education(OBE):",
    description:
      "The affiliating University has developed a good strategy to transform its curriculum towards OBE and the institution is adopting it in totality. The institution has developed some good practices towards OBE by having well defined Program Educational Objectives, Program Specific Outcomes and Course Outcomes for the programs and courses. The four levels of OBE are: Program Outcomes (POs), Course Outcomes (COs), Program Educational Objectives (PEOs) and Program Specific Outcomes (PSOs). Course Outcomes, Program Outcomes and Program Specific Outcomes relate to the knowledge, skills and behavior that the student acquires through the programme.",
  },
  {
    title: "Distance education/online education:",
    description:
      "Distance education has not been initiated for the engineering courses offered by the affiliating university and as such the institute has no such provision. The Institute has all the necessary infrastructure and necessary tools to offer online education and this was extremely useful during the Covid-19 pandemic. The institute was highly successful in offering online classes through digital platforms such as Zoom, Google meet etc. The students and faculties at times undergo regular training programmes, webinars, FDPs through online mode.",
  },
];

export default function Naac2Page() {
  return (
    <main className="nep-status-container">
      <h1 className="nep-status-heading">2(a) Institutional Preparedness For NEP</h1>

      <div className="nep-table-wrapper">
        <table className="nep-table">
          <thead>
            <tr>
              <th scope="col">Sr. No</th>
              <th scope="col">Parameter</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.title}>
                <td>{index + 1}</td>
                <td className="des">{item.title}</td>
                <td className="des">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}