"use client"

import { useDrag } from "react-dnd"
import type { ExerciseData } from "@/types/fitness"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface ExerciseCardProps {
  exercise: ExerciseData
  workoutId: string
  exerciseIndex: number
  onMoveExercise: (exerciseId: string, fromWorkoutId: string, toWorkoutId: string, toIndex: number) => void
}

export function ExerciseCard({ exercise, workoutId }: ExerciseCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: "exercise",
    item: { id: exercise.id, fromWorkoutId: workoutId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(ref)

  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-[3px] border border-gray-200 px-2 py-1 cursor-move transition-all",
        isDragging && "opacity-50 rotate-1",
      )}
    >
      <div className="w-full flex flex-col items-start justify-between">
        <div className="w-full flex-1">
          <h4 className="w-full text-[13px] font-semibold text-gray-900 line-clamp-1 text-right">{exercise.name}</h4>
        </div>
        <div className="w-full flex flex-row justify-between">
          <span className="flex-none text-[10px] font-bold text-[#95A6B7]">{exercise.setCount}x</span>
          <p className="flex-1 w-full text-[10px] text-[#95A6B7] line-clamp-1 text-right">{exercise.sets}</p>
        </div>
      </div>
    </div>
  )
}
