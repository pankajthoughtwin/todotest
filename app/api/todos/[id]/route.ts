import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import type { UpdateTodoData } from "@/lib/types"

// GET /api/todos/[id] - Get a specific todo
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id: params.id },
    })

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 })
    }

    return NextResponse.json(todo)
  } catch (error) {
    console.error("Error fetching todo:", error)
    return NextResponse.json({ error: "Failed to fetch todo" }, { status: 500 })
  }
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body: UpdateTodoData = await request.json()

    const todo = await prisma.todo.update({
      where: { id: params.id },
      data: {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.description !== undefined && { description: body.description?.trim() || null }),
        ...(body.completed !== undefined && { completed: body.completed }),
        ...(body.priority !== undefined && { priority: body.priority }),
      },
    })

    return NextResponse.json(todo)
  } catch (error) {
    console.error("Error updating todo:", error)
    return NextResponse.json({ error: "Failed to update todo" }, { status: 500 })
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.todo.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Todo deleted successfully" })
  } catch (error) {
    console.error("Error deleting todo:", error)
    return NextResponse.json({ error: "Failed to delete todo" }, { status: 500 })
  }
}
