import express, { type Response } from "express";
import patientsService from "../services/patientsService.ts";
import type { NonSensitivePatients } from "../types.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
  const data = patientsService.getNonSensitivePatients();
  res.send(data);
});

export default router;
