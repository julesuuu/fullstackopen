interface calculateValues {
  value1: number,
  value2: number
}

const parseArguments = (args: string[]): calculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers')
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / Math.pow(height / 100, 2)

  if (result <= 18.5) {
    return 'underweight'
  } else if (result < 25) {
    return 'normal range'
  } else if (result < 30) {
    return 'overweight range'
  } else {
    return 'obsese range'
  }
}

try {
  const { value1, value2 } = parseArguments(process.argv)
  const bmiCategory = calculateBmi(value1, value2)
  console.log(bmiCategory)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

console.log(calculateBmi(180, 74))