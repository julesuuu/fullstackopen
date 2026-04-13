import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Patient } from "../../types";

const PatientData = ({ patient }: { patient: Patient }) => {
  return (
    <>
      <Typography variant="h4">
        {patient.name} <PersonIcon />
      </Typography>
      <Typography>sss: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Typography>date of birth: {patient.dateOfBirth}</Typography>
    </>
  );
};

export default PatientData;
