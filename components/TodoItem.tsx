"use client"

import { useState } from "react"
import type { Todo, UpdateTodoData } from "@/lib/types"
import { Check, Edit2, Trash2, X, Save } from "lucide-react"

interface TodoItemProps {
  todo: Todo
  onUpdate: (todo: Todo) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || "")
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [loading, setLoading] = useState(false)

  const handleToggleComplete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      })

      if (response.ok) {
        const updatedTodo = await response.json()
        onUpdate(updatedTodo)
      }
    } catch (error) {
      console.error("Error updating todo:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return

    setLoading(true)
    try {
      const updateData: UpdateTodoData = {
        title: editTitle.trim(),
        description: editDescription.trim() as any || null,
        priority: editPriority,
      }

      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        const updatedTodo = await response.json()
        onUpdate(updatedTodo)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Error updating todo:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this todo?")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        onDelete(todo.id)
      }
    } catch (error) {
      console.error("Error deleting todo:", error)
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`bg-white rounded-lg border p-4 shadow-sm ${todo.completed ? "opacity-75" : ""}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Todo title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description (optional)"
            rows={2}
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="HIGH">High Priority</option>
          </select>
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              disabled={loading || !editTitle.trim()}
              className="btn-primary flex items-center space-x-1"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setEditTitle(todo.title)
                setEditDescription(todo.description || "")
                setEditPriority(todo.priority)
              }}
              className="btn-secondary flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-3">
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={`mt-1 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              todo.completed ? "bg-green-500 border-green-500 text-white" : "border-gray-300 hover:border-green-500"
            }`}
          >
            {todo.completed && <Check className="h-3 w-3" />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`font-medium ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                {todo.title}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(todo.priority)}`}>
                {todo.priority}
              </span>
            </div>
            {todo.description && (
              <p className={`text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
                {todo.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">Created {new Date(todo.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
