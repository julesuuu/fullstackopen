import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import { Diagnosis, Entry, Patient } from "../../types";
import PatientData from "./PatientData";
import PatientEntries from "./PatientEntries";
import diagnosesService from "../../services/diagnoses";
import AddEntryForm from "./AddEntryForm";
import { NewEntry } from "../../types";
import { Button } from "@mui/material";

const PatientDetailPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [showForm, setShowForm] = useState(false);

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

  const handleAddEntry = async (entry: NewEntry) => {
    if (!id) return;

    try {
      const updatedPatient = await patientService.addEntry(id, entry as Entry);
      setPatient(updatedPatient);
      setShowForm(false);
    } catch (error: unknown) {
      console.error("Failed to add entry", error);
    }
  };

  return (
    <div>
      <PatientData patient={patient} />
      <PatientEntries patient={patient} diagnoses={diagnoses} />

      {showForm ? (
        <AddEntryForm onCancel={() => setShowForm(false)} onSubmit={handleAddEntry} diagnoses={diagnoses} />
      ) : (
        <Button variant="contained" onClick={() => setShowForm(true)} sx={{ mt: 2 }}>
          Add New Entry
        </Button>
      )}
    </div>
  );
};

export default PatientDetailPage;
