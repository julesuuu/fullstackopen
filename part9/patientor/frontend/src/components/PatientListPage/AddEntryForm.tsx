import { SyntheticEvent, useState } from "react";
import { NewEntry, HealthCheckRating } from "../../types";
import { Box, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

interface Props {
  onCancel: () => void;
  onSubmit: (value: NewEntry) => void;
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState("");
  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setEntryType(event.target.value as EntryType);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const codes = diagnosisCodes
      .split(",")
      .map((code) => code.trim())
      .filter((code) => code.length > 0);

    const baseEntry = {
      date,
      description,
      specialist,
      diagnosisCodes: codes.length > 0 ? codes : undefined,
    };

    let entry: NewEntry;

    if (entryType === "HealthCheck") {
      entry = {
        ...baseEntry,
        type: "HealthCheck",
        healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
      };
    } else if (entryType === "OccupationalHealthcare") {
      entry = {
        ...baseEntry,
        type: "OccupationalHealthcare",
        employerName: employerName,
        sickLeave: {
          startDate: sickLeaveStart,
          endDate: sickLeaveEnd,
        },
      };
    } else {
      entry = {
        ...baseEntry,
        type: "Hospital",
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      };
    }

    onSubmit(entry);
  };

  return (
    <Box sx={{ border: "1px dashed #aaa", p: 2, mt: 2 }}>
      <h3>New Entry</h3>
      <form onSubmit={handleSubmit}>
        <InputLabel>Type</InputLabel>
        <Select fullWidth value={entryType} onChange={handleTypeChange}>
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
        <TextField
          label="Date"
          fullWidth
          required
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ mt: 1 }}
        />
        <TextField
          label="Description"
          fullWidth
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ mt: 1 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ mt: 1 }}
        />
        <TextField
          label="Diagnosis Codes"
          fullWidth
          required
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          sx={{ mt: 1 }}
        />
        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              fullWidth
              required
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              sx={{ mt: 1 }}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Discharge Criteria"
              fullWidth
              required
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              sx={{ mt: 1 }}
            />
          </>
        )}
        {entryType === "HealthCheck" && (
          <>
            <TextField
              label="Health Check Rating (0-3)"
              fullWidth
              required
              type="number"
              value={healthCheckRating}
              onChange={({ target }) => setHealthCheckRating(target.value)}
              sx={{ mt: 1 }}
            />
          </>
        )}
        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              required
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              sx={{ mt: 1 }}
            />

            <TextField
              label="Sick Leave Start"
              fullWidth
              required
              type="date"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
              sx={{ mt: 1 }}
            />

            <TextField
              label="Sick Leave End"
              fullWidth
              required
              type="date"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
              sx={{ mt: 1 }}
            />
          </>
        )}
        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Grid size="auto">
            <Button color="secondary" variant="outlined" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button variant="contained" type="submit">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;
