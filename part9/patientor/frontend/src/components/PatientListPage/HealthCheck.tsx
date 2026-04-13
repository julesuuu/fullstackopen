import { Typography } from "@mui/material";
import { Diagnosis, HealthCheckEntry } from "../../types";

const HealthCheck = ({ entry, diagnoses }: { entry: HealthCheckEntry; diagnoses: Diagnosis[] }) => {
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

export default HealthCheck;
