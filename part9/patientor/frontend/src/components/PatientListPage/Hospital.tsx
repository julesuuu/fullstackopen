import { Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";
import { MedicalInformation } from "@mui/icons-material";

const Hospital = ({ entry, diagnoses }: { entry: HospitalEntry; diagnoses: Diagnosis[] }) => {
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
      <Typography>
        Discharged: {entry.discharge.date} {entry.discharge.criteria}
      </Typography>
      <Typography>Diagnosed by {entry.specialist}</Typography>
    </div>
  );
};

export default Hospital;
