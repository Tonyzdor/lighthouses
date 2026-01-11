'use client'

import { useState, useEffect } from 'react'

interface Goal {
  id: string
  title: string
}

interface QuickTaskInputProps {
  onTaskCreated?: (task: any) => void
  defaultDate?: string
  defaultGoalId?: string
}

export default function QuickTaskInput({
  onTaskCreated,
  defaultDate,
  defaultGoalId,
}: QuickTaskInputProps) {
  const [title, setTitle] = useState('')
  const [goalId, setGoalId] = useState(defaultGoalId || '')
  const [goals, setGoals] = useState<Goal[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals?status=active')
      if (!response.ok) throw new Error('Failed to fetch goals')
      const data = await response.json()
      setGoals(data)
      if (data.length > 0 && !goalId) {
        setGoalId(data[0].id)
      }
    } catch (error) {
      console.error('Error fetching goals:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !goalId) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          goalId,
          dueDate: defaultDate || new Date().toISOString(),
          type: 'task',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create task')
      }

      const task = await response.json()
      onTaskCreated?.(task)

      // Reset form
      setTitle('')
    } catch (error) {
      console.error('Error creating task:', error)
      alert('Ошибка при создании задачи')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (goals.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          Сначала создайте цель, чтобы добавлять задачи.{' '}
          <a href="/goals" className="underline font-medium">
            Создать цель
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Что нужно сделать?"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          disabled={isSubmitting}
          autoFocus
        />
        <select
          value={goalId}
          onChange={(e) => setGoalId(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          disabled={isSubmitting}
        >
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isSubmitting || !title.trim() || !goalId}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? '...' : '+'}
        </button>
      </div>
    </form>
  )
}
