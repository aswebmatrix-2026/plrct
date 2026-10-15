import "./notice.css";

export const metadata = {
  title: "Notices | Pt. L.R. College of Technology, Faridabad",
  description:
    "Download official notices of Pt. L.R. College of Technology, Faridabad: IQAC, Alumni Meet, FDP, Blood Donation Camp, Industrial Visit and Parent-Teacher Meet (PTM).",
};

// Fill in the `download` path for each file (e.g. "/Notice/Notice-IQAC.pdf")
const data = [
  { id: 1, notice: "Notice IQAC", download: "/iqac-notice/download.pdf" },
  { id: 2, notice: "Alumni Meet", download: "/iqac-notice/download (1).pdf" },
  { id: 3, notice: "FDP", download: "/iqac-notice/download (2).pdf" },
  { id: 4, notice: "List of Participants", download: "/iqac-notice/download (3).pdf" },
  { id: 5, notice: "Blood Donation Camp", download: "/iqac-notice/download (4).pdf" },
  { id: 6, notice: "Industrial Visit", download: "/iqac-notice/download (5).pdf" },
  { id: 7, notice: "Industrial Visit Report", download: "/iqac-notice/download (6).pdf" },
  { id: 8, notice: "PTM 2024", download: "/iqac-notice/download (7).pdf" },
  { id: 9, notice: "PTM 2025", download: "/iqac-notice/download (8).pdf" },
  { id: 10, notice: "PTM Images 2025", download: "/iqac-notice/download (9).pdf" },
];

export default function NoticePage() {
  return (
    <main className="notice-wrapper">
      <div className="notice-container">
        <h1 className="notice-title">Notice</h1>

        <div className="notice-table-wrapper">
          <table className="notice-table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Notice</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.notice}</td>
                  <td>
                    {item.download ? (
                      <a
                        href={item.download}
                        download
                        className="notice-download-btn"
                        aria-label={`Download ${item.notice}`}
                      >
                        Download
                      </a>
                    ) : (
                      <span className="notice-download-btn is-disabled" aria-disabled="true">
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