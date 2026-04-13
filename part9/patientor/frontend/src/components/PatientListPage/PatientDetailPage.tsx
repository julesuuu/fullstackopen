import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { Patient } from "../../types";
import PatientData from "./PatientData";
import PatientEntries from "./PatientEntries";

const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      void patientService.getById(id).then(setPatient);
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PatientData patient={patient} />
      <PatientEntries patient={patient} />
    </div>
  );
};

export default PatientDetailPage;
