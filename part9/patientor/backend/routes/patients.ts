import express, { type Request, type Response, type NextFunction } from "express";
import patientService from "../services/patientService.ts";

import z from "zod";
import {
  EntrySchema,
  NewEntrySchema,
  type NewEntry,
  type NewPatientEntry,
  type NonSensitivePatient,
  type Patient,
} from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const data = patientService.getNonSensitivePatients();
  res.send(data);
});

router.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post("/", newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/:id/entries",
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Patient>, next: NextFunction) => {
    try {
      EntrySchema.parse(req.body);
      const updatedPatient = patientService.addEntry(req.params.id, req.body);
      res.json(updatedPatient);
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.use(errorMiddleware);

export default router;
