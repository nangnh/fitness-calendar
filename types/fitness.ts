export interface ExerciseData {
  id: string
  name: string
  sets: string
  setCount: number
}

export interface WorkoutData {
  id: string
  name: string
  exercises: ExerciseData[]
}
