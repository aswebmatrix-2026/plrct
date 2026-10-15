import "./report.css";

export const metadata = {
  title: "Activity Report / Form | IQAC | Pt. L.R. College of Technology, Faridabad",
  description:
    "Download IQAC activity reports and feedback forms for alumni, parents and teachers of Pt. L.R. College of Technology, Faridabad.",
};

// Fill in the `download` path for each file (e.g. "/IQAC/feedback-forms-for-alumni.pdf")
const data = [
  { id: 1, title: "Feedback Forms for Alumni", download: "/activity-report/_IQAC_feedback-forms-for-alumni.pdf" },
  { id: 2, title: "Feedback Forms for Parents", download: "/activity-report/_IQAC_feedback-forms-for-parents.pdf" },
  { id: 3, title: "Feedback Forms for Teachers", download: "/activity-report/_IQAC_feedback-forms-for-teachers.pdf" },
];

export default function ReportPage() {
  return (
    <main className="report-wrapper">
      <div className="report-container">
        <h1 className="report-title">Activity Report / Form</h1>

        <div className="report-table-wrapper">
          <table className="report-table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Title</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    {item.download ? (
                      <a
                        href={item.download}
                        download
                        className="report-download-btn"
                        aria-label={`Download ${item.title}`}
                      >
                        Download
                      </a>
                    ) : (
                      <span className="report-download-btn is-disabled" aria-disabled="true">
                        Not available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}