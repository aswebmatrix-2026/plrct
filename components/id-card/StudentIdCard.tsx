import "./StudentIdCard.css";
import Image from "next/image";

export interface StudentIdCardProps {
  studentName: string;
  fatherName: string;
  course: string;
  discipline: string;
  rollNumber?: string | null;
  session: string;
  admissionYear: string;
  mobile: string;
  address: string;
  photo?: string | null;
  principalSignature?: string | null;
  applicationId?: string;
}

export default function StudentIdCard({
  studentName,
  fatherName,
  course,
  discipline,
  rollNumber,
  session,
  admissionYear,
  mobile,
  address,
  photo,
  principalSignature,
  applicationId,
}: StudentIdCardProps) {
  return (
    <div className="id-card">
      {/* College Header */}
      <div className="id-card__header">
        <Image
          className="id-card__logo"
          src="/images/Pandit-L.R.-College-Logo.png"
          alt="Pt. L. R. College of Technology Logo"
          width={70}
          height={70}
          priority
        />

        <div className="id-card__college-name">
          Pt. L. R. College of Technology
        </div>
      </div>

      <div className="id-card__yellow-band" />

      {/* Student Photo */}
      <div className="id-card__photo-section">
        <div className="id-card__photo-frame">
          {photo ? (
            <img
              className="id-card__photo"
              src={photo}
              alt={studentName || "Student"}
            />
          ) : (
            <div className="id-card__photo id-card__photo--placeholder">
              Photo
            </div>
          )}
        </div>
      </div>

      {/* Student Name */}
      <div className="id-card__name">
        {studentName || "STUDENT NAME"}
      </div>

      {/* Student Information */}
      <div className="id-card__info">
        <div className="id-card__info-row">
          <span className="id-card__label">Father&apos;s Name:</span>
          <span className="id-card__value">
            {fatherName || "—"}
          </span>
        </div>

        <div className="id-card__info-row">
          <span className="id-card__label">Course:</span>
          <span className="id-card__value">
            {course || "—"}
            {discipline ? ` (${discipline})` : ""}
          </span>
        </div>

        <div className="id-card__info-row">
          <span className="id-card__label">Roll No.:</span>
          <span className="id-card__value id-card__value--roll">
            {rollNumber || "Will be assigned by Admin"}
          </span>
        </div>

        <div className="id-card__info-row">
          <span className="id-card__label">Session:</span>
          <span className="id-card__value">
            {session || "—"}
          </span>
        </div>

        <div className="id-card__info-row">
          <span className="id-card__label">Mobile:</span>
          <span className="id-card__value">
            {mobile || "—"}
          </span>
        </div>

        <div className="id-card__info-row id-card__info-row--address">
          <span className="id-card__label">Address:</span>
          <span className="id-card__value">
            {address || "—"}
          </span>
        </div>
      </div>

      {/* Principal Signature & Application ID */}
      <div className="id-card__lower-section">
        <div className="id-card__signature">
          {principalSignature ? (
            <img
              className="id-card__signature-img"
              src={principalSignature}
              alt="Principal Signature"
            />
          ) : (
            <div className="id-card__signature-line" />
          )}

          <div className="id-card__signature-label">
            Principal
          </div>
        </div>

        {applicationId ? (
          <div className="id-card__app-id">
            {applicationId}
          </div>
        ) : null}
      </div>

      <div className="id-card__yellow-separator" />

      {/* Footer */}
      <div className="id-card__footer">
        Kaboolpur Banger, Sohna-Samaypur Road, Near Sector 56,
        Ballabgarh, Faridabad, Haryana Mobile: +91 9540028828,
        +91 9540028827 E-mail:- ptlrct@gmail.com |
        Website: www.plrct.com
      </div>
    </div>
  );
}
