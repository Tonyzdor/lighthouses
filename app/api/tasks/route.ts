import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { startOfDay, endOfDay } from 'date-fns'

// GET /api/tasks - Get tasks with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') // YYYY-MM-DD
    const status = searchParams.get('status')
    const goalId = searchParams.get('goalId')

    const where: any = {}

    // Filter by status
    if (status) {
      where.status = status
    }

    // Filter by goal
    if (goalId) {
      where.goalId = goalId
    }

    // Filter by date (tasks due on this date)
    if (date) {
      const targetDate = new Date(date)
      where.dueDate = {
        gte: startOfDay(targetDate),
        lte: endOfDay(targetDate),
      }
    }

    const tasks = await prisma.planItem.findMany({
      where,
      include: {
        goal: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
      orderBy: [
        { status: 'asc' }, // todo first
        { dueDate: 'asc' },
      ],
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      type = 'task',
      goalId,
      dueDate,
      period,
      scheduleType = 'one-off',
      recurrenceRule,
      effort,
    } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    if (!goalId) {
      return NextResponse.json(
        { error: 'Goal ID is required' },
        { status: 400 }
      )
    }

    const task = await prisma.planItem.create({
      data: {
        title,
        description,
        type,
        goalId,
        dueDate: dueDate ? new Date(dueDate) : null,
        period,
        scheduleType,
        recurrenceRule,
        effort: effort ? parseInt(effort) : null,
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

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}
