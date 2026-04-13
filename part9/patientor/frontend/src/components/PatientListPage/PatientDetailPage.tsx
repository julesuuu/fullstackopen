import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { Diagnosis, Patient } from "../../types";
import PatientData from "./PatientData";
import PatientEntries from "./PatientEntries";
import diagnosesService from "../../services/diagnoses";

const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (id) {
      void patientService.getById(id).then(setPatient);
    }
  }, [id]);

  useEffect(() => {
    void diagnosesService.getAll().then(setDiagnoses);
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PatientData patient={patient} />
      <PatientEntries patient={patient} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientDetailPage;
