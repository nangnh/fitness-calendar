"use client"

import { useDrop } from "react-dnd"
import { WorkoutCard } from "./workout-card"
import type { WorkoutData } from "@/types/fitness"
import { cn } from "@/lib/utils"

interface DayColumnProps {
  day: string
  date: number
  isToday: boolean
  workouts: WorkoutData[]
  dayIndex: number
  onMoveWorkout: (workoutId: string, fromDay: number, toDay: number, toIndex: number) => void
  onMoveExercise: (exerciseId: string, fromWorkoutId: string, toWorkoutId: string, toIndex: number) => void
}

export function DayColumn({ day, date, isToday, workouts, dayIndex, onMoveWorkout, onMoveExercise }: DayColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: "workout",
    drop: (item: { id: string; fromDay: number }, monitor) => {
      if (!monitor.didDrop()) {
        onMoveWorkout(item.id, item.fromDay, dayIndex, workouts.length)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  })

  return (
    <div
      ref={drop}
      className={cn(
        "min-h-[600px] bg-white rounded-lg border border-gray-200 p-3",
        isOver && "bg-blue-50 border-blue-300",
      )}
    >
      <div className="text-center mb-4">
        <div className="text-sm font-medium text-gray-600 mb-1">{day}</div>
        <div className={cn("text-lg font-semibold", isToday ? "text-purple-600 font-bold" : "text-gray-800")}>
          {date.toString().padStart(2, "0")}
        </div>
      </div>

      <div className="space-y-3">
        {workouts.map((workout, index) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            dayIndex={dayIndex}
            workoutIndex={index}
            onMoveWorkout={onMoveWorkout}
            onMoveExercise={onMoveExercise}
          />
        ))}
      </div>
    </div>
  )
}
