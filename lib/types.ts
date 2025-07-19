export interface Todo {
  id: string
  title: string
  description?: string | null
  completed: boolean
  priority: "LOW" | "MEDIUM" | "HIGH"
  createdAt: Date
  updatedAt: Date
}

export interface CreateTodoData {
  title: string
  description?: string
  priority?: "LOW" | "MEDIUM" | "HIGH"
}

export interface UpdateTodoData {
  title?: string
  description?: string
  completed?: boolean
  priority?: "LOW" | "MEDIUM" | "HIGH"
}
