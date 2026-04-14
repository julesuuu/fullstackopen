import { Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import { MedicalInformation } from "@mui/icons-material";

type OccEntry = Extract<Entry, { type: "OccupationalHealthcare" }>;

const OccupationalHealthcare = ({ entry, diagnoses }: { entry: OccEntry; diagnoses: Diagnosis[] }) => {
  return (
    <div style={{ border: "1px solid black", padding: "8px", borderRadius: "6px" }}>
      <Typography>
        {entry.date} <MedicalInformation />
      </Typography>
      <Typography>{entry.description}</Typography>
      <ul>
        {entry.diagnosisCodes?.map((dc) => (
          <li key={dc}>
            {dc} {diagnoses.find((d) => d.code === dc)?.name}
          </li>
        ))}
      </ul>
      {"sickLeave" in entry && entry.sickLeave && (
        <Typography>
          Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography>Employer: {entry.employerName}</Typography>
      <Typography>Diagnosed by {entry.specialist}</Typography>
    </div>
  );
};

export default OccupationalHealthcare;
