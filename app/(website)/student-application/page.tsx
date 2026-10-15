import StudentApplicationForm from "@/components/student-form/StudentApplicationForm";
import "./StudentApplication.css";

export const metadata = {
  title: "Student I-Card Application | PTLR College",
};

export default function StudentApplicationPage() {
  return (
    <main className="student-application-page">
      <StudentApplicationForm />
    </main>
  );
}
