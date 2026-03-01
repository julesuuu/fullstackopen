import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
})

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query

    if (!height || !weight) {
      return res.status(400).json({ error: 'missing parameters' })
    }

    const heightNum = Number(height)  
    const weightNum = Number(weight)

    if (isNaN(heightNum) || isNaN(weightNum)) {
      return res.status(400).json({ error: 'malformatted parameters' })
    }

    if (heightNum <= 0 || weightNum <= 0) {
      return res.status(400).json({ error: 'malformatted parameters' })
    }

    const bmi = calculateBmi(heightNum, weightNum)

    return res.json({
      weight: weightNum,
      height: heightNum,
      bmi
    })

  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
      errorMessage += error.message
    }
    return res.status(500).json({ error: errorMessage })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})