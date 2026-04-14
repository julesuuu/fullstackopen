import { Typography } from "@mui/material";
import { Diagnosis, HealthCheckEntry } from "../../types";
import { MedicalInformation } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";

const healthCheckColors: Record<HealthCheckEntry["healthCheckRating"], string> = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "gray",
};

const HealthCheck = ({ entry, diagnoses }: { entry: HealthCheckEntry; diagnoses: Diagnosis[] }) => {
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
      <Favorite style={{ color: healthCheckColors[entry.healthCheckRating] }} />
      <Typography>Diagnosed by {entry.specialist}</Typography>
    </div>
  );
};

export default HealthCheck;
