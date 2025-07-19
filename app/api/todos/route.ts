import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { CreateTodoData } from "@/lib/types"

// GET /api/todos - Get all todos
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(todos)
  } catch (error) {
    console.error("Error fetching todos:", error)
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 })
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body: CreateTodoData = await request.json()

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const todo = await prisma.todo.create({
      data: {
        title: body.title.trim(),
        description: body.description?.trim() || null,
        priority: body.priority || "MEDIUM",
      },
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    console.error("Error creating todo:", error)
    return NextResponse.json({ error: "Failed to create todo" }, { status: 500 })
  }
}
