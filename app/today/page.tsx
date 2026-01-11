'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import QuickTaskInput from '@/components/QuickTaskInput'
import TaskItem from '@/components/TaskItem'

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

export default function TodayPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const today = format(new Date(), 'yyyy-MM-dd')

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks?date=${today}`)
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [today])

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask])
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)))
  }

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  const todoTasks = tasks.filter((t) => t.status === 'todo')
  const doneTasks = tasks.filter((t) => t.status === 'done')

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">Загрузка...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Сегодня</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {format(new Date(), 'EEEE, d MMMM yyyy', { locale: ru })}
          </p>
        </div>

        {/* Quick input */}
        <div className="mb-8">
          <QuickTaskInput
            onTaskCreated={handleTaskCreated}
            defaultDate={today}
          />
        </div>

        {/* Stats */}
        <div className="mb-6 flex gap-4">
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Осталось:{' '}
            </span>
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {todoTasks.length}
            </span>
          </div>
          <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Выполнено:{' '}
            </span>
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">
              {doneTasks.length}
            </span>
          </div>
        </div>

        {/* Tasks list */}
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              На сегодня задач нет
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Добавьте первую задачу выше или{' '}
              <a href="/goals" className="text-blue-600 hover:underline">
                создайте цель
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Todo tasks */}
            {todoTasks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  К выполнению
                </h2>
                <div className="space-y-2">
                  {todoTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdate={handleTaskUpdated}
                      onDelete={handleTaskDeleted}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Done tasks */}
            {doneTasks.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  Выполнено
                </h2>
                <div className="space-y-2">
                  {doneTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdate={handleTaskUpdated}
                      onDelete={handleTaskDeleted}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
