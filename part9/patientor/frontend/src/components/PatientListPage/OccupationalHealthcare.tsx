import { Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry, OccupationalHealthcareEntryWithoutSickLeave } from "../../types";

type Entry = OccupationalHealthcareEntry | OccupationalHealthcareEntryWithoutSickLeave;

const OccupationalHealthcare = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) => {
  return (
    <>
      <Typography>
        {entry.date} {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((dc) => (
          <li key={dc}>
            {dc} {diagnoses.find((d) => d.code === dc)?.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default OccupationalHealthcare;
