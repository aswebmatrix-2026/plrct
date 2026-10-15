import "./naac2b.css";

export const metadata = {
  title: "2(b) Institutional Initiatives for Electoral Literacy | Pt. L.R. College of Technology, Faridabad",
  description:
    "Electoral Literacy Club (ELC) at Pt. L.R. College of Technology, Faridabad: how it was set up, who coordinates it, its awareness initiatives and voter registration efforts among students.",
};

const data = [
  {
    title: "Whether Electoral Literacy Club (ELC) has been set up in the College?",
    description:
      "In our institute Electoral Literacy Club (ELC) is established on December, 2022. An Electoral Literacy Club is a platform to engage students through interesting activities like various expert lecture, poster competition and hands-on experience to sensitize them on their electoral rights and familiarize them with the electoral process of registration and voting.",
  },
  {
    title:
      "Whether students’ co-coordinator and co-coordinating faculty members are appointed by the College and whether the ELCs are functional? Whether the ELCs are representative in character?",
    description:
      "Pt. L R College of Technology has the Electoral Literacy Club functional with the applied science department. The ELC consist of a coordinator along with four faculties and four students as member respectively.",
  },
  {
    title: "What innovative programmes and initiatives undertaken by the ELCs?",
    description:
      "The ELC, from its establishment constantly is striving to make students aware about importance of electoral process through various activities. The ELC organizes expert lecture, poster competition to generate interest and awareness among the faculty and students about electoral procedures and related topics. In future, ELC of institute will increase the scope its activities to assisting district election administration and enhancing the participation of under privilege sections of society by emphasizing them the importance of electoral processes. Some of the initiatives taken by the students in electoral processes- voter awareness campaigns, promotion of ethical voting, enhancing participation of the under privileged sections of society especially transgender, disabled persons.",
  },
  {
    title:
      "Any socially relevant projects/initiatives taken by College in electoral related issues especially research projects, surveys, awareness drives, creating content, publications highlighting their contribution to advancing democratic values and participation in electoral processes, etc.",
    description:
      "The Electoral Literacy Club (ELC) in future plans to take socially relevant initiatives related to electoral issues, such as organizing awareness drives and creating content and publications that showcase the ELC’s contribution to promote democratic values and participation in electoral processes.",
  },
  {
    title:
      "Extent of students above 18 years who are yet to be enrolled as voters in the electoral roll and efforts by ELCs as well as efforts by the College to institutionalize mechanisms to register eligible students as voters.",
    description:
      "The Electoral Literacy Club (ELC) conducted survey regarding number of students registered as voter, if not what is the difficulties they are facing in registration process. The ELC encourages newly admitted students for enrollment in voter registration process and getting form filled.",
  },
  {
    title: "Distance education/online education:",
    description:
      "Distance education has not been initiated for the engineering courses offered by the affiliating university and as such the institute has no such provision. The Institute has all the necessary infrastructure and necessary tools to offer online education and this was extremely useful during the Covid-19 pandemic. The institute was highly successful in offering online classes through digital platforms such as Zoom, Google meet etc. The students and faculties at times undergo regular training programmes, webinars, FDPs through online mode.",
  },
];

export default function Naac2bPage() {
  return (
    <main className="nep-status-containers">
      <h1 className="nep-status-headings">2(b) Institutional Initiatives for Electoral Literacy</h1>

      <div className="nep-table-wrappers">
        <table className="nep-tables">
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