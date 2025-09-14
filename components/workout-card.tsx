"use client"

import { useDrag, useDrop } from "react-dnd"
import { ExerciseCard } from "./exercise-card"
import type { WorkoutData } from "@/types/fitness"
import { cn } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"

interface WorkoutCardProps {
  workout: WorkoutData
  dayIndex: number
  workoutIndex: number
  onMoveWorkout: (workoutId: string, fromDay: number, toDay: number, toIndex: number) => void
  onMoveExercise: (exerciseId: string, fromWorkoutId: string, toWorkoutId: string, toIndex: number) => void
}

export function WorkoutCard({ workout, dayIndex, workoutIndex, onMoveWorkout, onMoveExercise }: WorkoutCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "workout",
    item: { id: workout.id, fromDay: dayIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop({
    accept: "exercise",
    drop: (item: { id: string; fromWorkoutId: string }, monitor) => {
      if (!monitor.didDrop() && item.fromWorkoutId !== workout.id) {
        onMoveExercise(item.id, item.fromWorkoutId, workout.id, workout.exercises.length)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  })

  const truncateWorkoutName = (name: string, maxLength = 25) => {
    return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={cn(
        "bg-gray-50 rounded-lg border border-gray-200 p-3 cursor-move transition-all",
        isDragging && "opacity-50 rotate-2",
        isOver && "bg-purple-50 border-purple-300",
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
          {truncateWorkoutName(workout.name)}
        </h3>
        <button className="text-gray-400 hover:text-gray-600 p-1">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="space-y-2">
        {workout.exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            workoutId={workout.id}
            exerciseIndex={index}
            onMoveExercise={onMoveExercise}
          />
        ))}
      </div>
    </div>
  )
}
