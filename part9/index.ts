import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (!height || !weight) {
      return res.status(400).json({ error: 'missing parameters' });
    }

    const heightNum = Number(height);
    const weightNum = Number(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }

    if (heightNum <= 0 || weightNum <= 0) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmi = calculateBmi(heightNum, weightNum);

    return res.json({
      weight: weightNum,
      height: heightNum,
      bmi
    });

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(500).json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (!daily_exercises.every((hour: unknown) => typeof hour === 'number')) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (isNaN(target) || target <= 0) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  if (daily_exercises.some((hour: number) => hour < 0)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const result = calculateExercises(target, daily_exercises);
    return res.json(result);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(500).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});