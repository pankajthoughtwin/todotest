"use client"

import { useState, useEffect } from "react"
import type { Todo } from "@/lib/types"
import TodoItem from "./TodoItem"
import { Loader2 } from "lucide-react"

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos")
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error("Error fetching todos:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTodoUpdate = (updatedTodo: Todo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
  }

  const handleTodoDelete = (deletedId: string) => {
    setTodos(todos.filter((todo) => todo.id !== deletedId))
  }

  const handleTodoAdd = (newTodo: Todo) => {
    setTodos([newTodo, ...todos])
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {(["all", "active", "completed"] as const).map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              filter === filterType ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
              {filterType === "all"
                ? todos.length
                : filterType === "active"
                  ? todos.filter((t) => !t.completed).length
                  : todos.filter((t) => t.completed).length}
            </span>
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {filter === "all" ? "No todos yet. Add one above!" : `No ${filter} todos.`}
            </p>
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onUpdate={handleTodoUpdate} onDelete={handleTodoDelete} />
          ))
        )}
      </div>
    </div>
  )
}
