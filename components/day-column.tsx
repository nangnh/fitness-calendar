"use client"

import { useDrop } from "react-dnd"
import { WorkoutCard } from "./workout-card"
import type { WorkoutData } from "@/types/fitness"
import { cn } from "@/lib/utils"
import { useRef } from "react"
import PlusIcon from "./icons/plus-icon"

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
  const ref = useRef<HTMLDivElement>(null)
  const showPlusIcon = ["TUE", "THU"].includes(day)

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

  drop(ref)

  return (
    <div
      ref={ref}
      className={cn("w-fit h-full")}
    >
      <div className="text-left mb-2">
        <div className="text-[10px] font-semibold text-[#6A7988] mb-1">{day}</div>
      </div>
      <div className={cn("space-y-[5px] min-h-[760px] w-[180px] p-[10px] bg-[#F3F5F8] rounded-[6px]", isOver ? "bg-purple-50" : "")}>
        <div className="flex items-center justify-between">
          <div className={cn("text-[11px]", isToday ? "text-[#5A57CB] font-bold" : "text-[#728096] font-semibold")}>
            {date.toString().padStart(2, "0")}
          </div>
          {showPlusIcon && <PlusIcon className="cursor-pointer"/>}
        </div>
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
