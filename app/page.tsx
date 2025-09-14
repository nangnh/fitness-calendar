"use client"
import { FitnessCalendar } from "@/components/fitness-calendar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <FitnessCalendar />
      </div>
    </div>
  )
}
