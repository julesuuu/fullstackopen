import { Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";

const Hospital = ({ entry, diagnoses }: { entry: HospitalEntry; diagnoses: Diagnosis[] }) => {
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

export default Hospital;
