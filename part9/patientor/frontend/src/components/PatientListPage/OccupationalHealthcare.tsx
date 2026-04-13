import { Typography } from "@mui/material";
import { OccupationalHealthcareEntry, OccupationalHealthcareEntryWithoutSickLeave } from "../../types";

type Entry = OccupationalHealthcareEntry | OccupationalHealthcareEntryWithoutSickLeave;

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  return (
    <>
      <Typography>
        {entry.date} {entry.description}
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((dc) => (
          <li key={dc}>{dc}</li>
        ))}
      </ul>
    </>
  );
};

export default OccupationalHealthcare;
