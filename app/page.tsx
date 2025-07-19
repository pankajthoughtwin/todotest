import type { Metadata } from "next"
import TodoList from "@/components/TodoList"
import AddTodoForm from "@/components/AddTodoForm"

export const metadata: Metadata = {
  title: "Home",
  description: "Manage your todos efficiently with our modern task management application.",
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Manage Your Tasks</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stay organized and productive with our simple yet powerful todo application. Add, edit, complete, and delete
          tasks with ease.
        </p>
      </div>

      <AddTodoForm />
      <TodoList />
    </div>
  )
}
