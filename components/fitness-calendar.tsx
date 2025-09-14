"use client"

import { useState, useCallback } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { DayColumn } from "./day-column"
import type { WorkoutData, ExerciseData } from "@/types/fitness"

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

// Get current week dates
const getCurrentWeekDates = () => {
  const today = new Date()
  const currentDay = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1))

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    return date.getDate()
  })
}

const getTodayIndex = () => {
  const today = new Date()
  const currentDay = today.getDay()
  return currentDay === 0 ? 6 : currentDay - 1 // Convert Sunday (0) to index 6
}

export function FitnessCalendar() {
  const weekDates = getCurrentWeekDates()
  const todayIndex = getTodayIndex()

  const [workouts, setWorkouts] = useState<Record<number, WorkoutData[]>>({
    1: [
      {
        id: "workout-1",
        name: "CHEST DAY - WITH ARM EXERCISES",
        exercises: [
          {
            id: "exercise-1",
            name: "Bench Press Medium Grip",
            sets: "50 lb x 5, 60 lb x 5, 70 lb x 5",
            setCount: 3,
          },
          {
            id: "exercise-2",
            name: "Exercise B",
            sets: "40 lb x 10",
            setCount: 1,
          },
        ],
      },
    ],
    2: [
      {
        id: "workout-2",
        name: "LEG DAY",
        exercises: [
          {
            id: "exercise-3",
            name: "Exercise C",
            sets: "50 lb x 5",
            setCount: 1,
          },
          {
            id: "exercise-4",
            name: "Exercise D",
            sets: "40 lb x 5",
            setCount: 1,
          },
          {
            id: "exercise-5",
            name: "Exercise E",
            sets: "30 lb x 5",
            setCount: 1,
          },
        ],
      },
      {
        id: "workout-3",
        name: "ARM DAY",
        exercises: [
          {
            id: "exercise-6",
            name: "Exercise F",
            sets: "60 lb x 6",
            setCount: 1,
          },
        ],
      },
    ],
  })

  const moveWorkout = useCallback((workoutId: string, fromDay: number, toDay: number, toIndex: number) => {
    setWorkouts((prev) => {
      const newWorkouts = { ...prev }

      // Find and remove workout from source day
      const sourceWorkouts = newWorkouts[fromDay] || []
      const workoutIndex = sourceWorkouts.findIndex((w) => w.id === workoutId)
      if (workoutIndex === -1) return prev

      const [workout] = sourceWorkouts.splice(workoutIndex, 1)
      newWorkouts[fromDay] = sourceWorkouts

      // Add workout to target day
      if (!newWorkouts[toDay]) newWorkouts[toDay] = []
      newWorkouts[toDay].splice(toIndex, 0, workout)

      return newWorkouts
    })
  }, [])

  const moveExercise = useCallback(
    (exerciseId: string, fromWorkoutId: string, toWorkoutId: string, toIndex: number) => {
      setWorkouts((prev) => {
        const newWorkouts = { ...prev }
        let exercise: ExerciseData | null = null

        // Find and remove exercise from source workout
        for (const dayWorkouts of Object.values(newWorkouts)) {
          const sourceWorkout = dayWorkouts.find((w) => w.id === fromWorkoutId)
          if (sourceWorkout) {
            const exerciseIndex = sourceWorkout.exercises.findIndex((e) => e.id === exerciseId)
            if (exerciseIndex !== -1) {
              exercise = sourceWorkout.exercises.splice(exerciseIndex, 1)[0]
              break
            }
          }
        }

        if (!exercise) return prev

        // Add exercise to target workout
        for (const dayWorkouts of Object.values(newWorkouts)) {
          const targetWorkout = dayWorkouts.find((w) => w.id === toWorkoutId)
          if (targetWorkout) {
            targetWorkout.exercises.splice(toIndex, 0, exercise)
            break
          }
        }

        return newWorkouts
      })
    },
    [],
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        <div className="grid grid-cols-7 gap-4">
          {DAYS.map((day, index) => (
            <DayColumn
              key={day}
              day={day}
              date={weekDates[index]}
              isToday={index === todayIndex}
              workouts={workouts[index] || []}
              dayIndex={index}
              onMoveWorkout={moveWorkout}
              onMoveExercise={moveExercise}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}
