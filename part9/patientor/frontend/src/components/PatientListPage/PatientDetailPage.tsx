import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

import patientService from "../../services/patients";
import { Patient } from "../../types";

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
      <Typography variant="h4">
        {patient.name} <PersonIcon />
      </Typography>
      <Typography>sss: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>
    </div>
  );
};

export default PatientDetailPage;
