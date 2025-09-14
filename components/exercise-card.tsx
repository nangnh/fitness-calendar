"use client"

import { useDrag } from "react-dnd"
import type { ExerciseData } from "@/types/fitness"
import { cn } from "@/lib/utils"

interface ExerciseCardProps {
  exercise: ExerciseData
  workoutId: string
  exerciseIndex: number
  onMoveExercise: (exerciseId: string, fromWorkoutId: string, toWorkoutId: string, toIndex: number) => void
}

export function ExerciseCard({ exercise, workoutId }: ExerciseCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "exercise",
    item: { id: exercise.id, fromWorkoutId: workoutId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={cn(
        "bg-white rounded-md border border-gray-200 p-2 cursor-move transition-all",
        isDragging && "opacity-50 rotate-1",
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 mb-1">{exercise.name}</h4>
          <p className="text-xs text-gray-500">{exercise.sets}</p>
        </div>
        <div className="ml-2 flex-shrink-0">
          <span className="text-xs font-medium text-gray-600">{exercise.setCount}x</span>
        </div>
      </div>
    </div>
  )
}
