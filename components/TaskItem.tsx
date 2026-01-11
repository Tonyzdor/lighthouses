'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  dueDate: string | null
  completionDate: string | null
  effort: number | null
  goal?: {
    id: string
    title: string
    category: string | null
  }
}

interface TaskItemProps {
  task: Task
  onUpdate?: (updatedTask: Task) => void
  onDelete?: (taskId: string) => void
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleToggleStatus = async () => {
    setIsUpdating(true)
    try {
      const newStatus = task.status === 'done' ? 'todo' : 'done'
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update task')
      }

      const updatedTask = await response.json()
      onUpdate?.(updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
      alert('Ошибка при обновлении задачи')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Удалить задачу?')) return

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      onDelete?.(task.id)
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('Ошибка при удалении задачи')
    }
  }

  const isDone = task.status === 'done'

  return (
    <div
      className={clsx(
        'group p-4 bg-white dark:bg-gray-800 rounded-lg border transition-all',
        isDone
          ? 'border-gray-200 dark:border-gray-700 opacity-60'
          : 'border-gray-300 dark:border-gray-600 hover:shadow-md'
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggleStatus}
          disabled={isUpdating}
          className={clsx(
            'flex-shrink-0 w-6 h-6 rounded border-2 transition-all',
            isDone
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-500',
            isUpdating && 'opacity-50 cursor-wait'
          )}
        >
          {isDone && (
            <svg
              className="w-full h-full text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>

        {/* Task content */}
        <div className="flex-1 min-w-0">
          <h3
            className={clsx(
              'text-base font-medium',
              isDone
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {task.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            {task.goal && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                {task.goal.title}
              </span>
            )}
            {task.effort && <span>{task.effort} мин</span>}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Удалить"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
