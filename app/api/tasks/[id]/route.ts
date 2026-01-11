import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

type Params = {
  params: Promise<{
    id: string
  }>
}

// GET /api/tasks/[id] - Get a specific task
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    const task = await prisma.planItem.findUnique({
      where: { id },
      include: {
        goal: true,
        parent: true,
        children: true,
      },
    })

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error fetching task:', error)
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    )
  }
}

// PUT /api/tasks/[id] - Update a task
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const body = await request.json()

    // Handle status change to 'done'
    if (body.status === 'done' && !body.completionDate) {
      body.completionDate = new Date()
    }

    // Handle status change from 'done' to something else
    if (body.status !== 'done' && body.completionDate) {
      body.completionDate = null
    }

    const task = await prisma.planItem.update({
      where: { id },
      data: {
        ...body,
        updatedAt: new Date(),
      },
      include: {
        goal: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params

    await prisma.planItem.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    )
  }
}
