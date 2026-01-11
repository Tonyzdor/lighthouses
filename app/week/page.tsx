'use client'

import { useState, useEffect } from 'react'
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  subWeeks,
} from 'date-fns'
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

interface DayTasks {
  date: Date
  tasks: Task[]
}

export default function WeekPage() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday
  )
  const [weekTasks, setWeekTasks] = useState<DayTasks[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const weekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
  })

  useEffect(() => {
    fetchWeekTasks()
  }, [currentWeekStart])

  const fetchWeekTasks = async () => {
    setIsLoading(true)
    try {
      // Fetch tasks for each day of the week
      const promises = weekDays.map(async (day) => {
        const dateStr = format(day, 'yyyy-MM-dd')
        const response = await fetch(`/api/tasks?date=${dateStr}`)
        if (!response.ok) throw new Error('Failed to fetch tasks')
        const tasks = await response.json()
        return { date: day, tasks }
      })

      const results = await Promise.all(promises)
      setWeekTasks(results)
    } catch (error) {
      console.error('Error fetching week tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTaskCreated = (newTask: Task) => {
    // Refresh week tasks
    fetchWeekTasks()
    setSelectedDate(null)
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    setWeekTasks(
      weekTasks.map((dayTasks) => ({
        ...dayTasks,
        tasks: dayTasks.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        ),
      }))
    )
  }

  const handleTaskDeleted = (taskId: string) => {
    setWeekTasks(
      weekTasks.map((dayTasks) => ({
        ...dayTasks,
        tasks: dayTasks.tasks.filter((t) => t.id !== taskId),
      }))
    )
  }

  const goToPreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1))
  }

  const goToNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1))
  }

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))
  }

  const totalTasks = weekTasks.reduce(
    (sum, day) => sum + day.tasks.length,
    0
  )
  const completedTasks = weekTasks.reduce(
    (sum, day) => sum + day.tasks.filter((t) => t.status === 'done').length,
    0
  )

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">Загрузка...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">Неделя</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {format(currentWeekStart, 'd MMMM', { locale: ru })} -{' '}
              {format(
                endOfWeek(currentWeekStart, { weekStartsOn: 1 }),
                'd MMMM yyyy',
                { locale: ru }
              )}
            </p>
          </div>

          {/* Week navigation */}
          <div className="flex gap-2">
            <button
              onClick={goToPreviousWeek}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              ← Пред
            </button>
            <button
              onClick={goToCurrentWeek}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Сегодня
            </button>
            <button
              onClick={goToNextWeek}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              След →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 flex gap-4">
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Всего:{' '}
            </span>
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
              {totalTasks}
            </span>
          </div>
          <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Выполнено:{' '}
            </span>
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">
              {completedTasks}
            </span>
          </div>
          {totalTasks > 0 && (
            <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Прогресс:{' '}
              </span>
              <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                {Math.round((completedTasks / totalTasks) * 100)}%
              </span>
            </div>
          )}
        </div>

        {/* Week grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {weekTasks.map((dayData, index) => {
            const isToday = isSameDay(dayData.date, new Date())
            const todoTasks = dayData.tasks.filter((t) => t.status === 'todo')
            const doneTasks = dayData.tasks.filter((t) => t.status === 'done')

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  isToday
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="mb-3">
                  <h3
                    className={`font-semibold ${
                      isToday
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {format(dayData.date, 'EEEE', { locale: ru })}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(dayData.date, 'd MMMM', { locale: ru })}
                  </p>
                </div>

                <div className="mb-3 flex gap-2 text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    {todoTasks.length} задач
                  </span>
                  {doneTasks.length > 0 && (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ {doneTasks.length}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  {dayData.tasks.slice(0, 3).map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onUpdate={handleTaskUpdated}
                      onDelete={handleTaskDeleted}
                    />
                  ))}
                  {dayData.tasks.length > 3 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      +{dayData.tasks.length - 3} еще
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedDate(dayData.date)}
                  className="w-full py-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  + Добавить задачу
                </button>

                {selectedDate && isSameDay(selectedDate, dayData.date) && (
                  <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-md">
                    <QuickTaskInput
                      onTaskCreated={handleTaskCreated}
                      defaultDate={format(dayData.date, 'yyyy-MM-dd')}
                    />
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="mt-2 text-xs text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      Отмена
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
