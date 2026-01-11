'use client'

import { useState, useEffect } from 'react'
import CreateGoalForm from '@/components/CreateGoalForm'

type Goal = {
  id: string
  title: string
  description: string | null
  category: string | null
  status: string
  priority: number
  targetValue: number | null
  currentValue: number | null
  successMetric: string | null
  planItems?: any[]
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)

  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals?status=active')
      if (!response.ok) throw new Error('Failed to fetch goals')
      const data = await response.json()
      setGoals(data)
    } catch (error) {
      console.error('Error fetching goals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  const handleGoalCreated = (newGoal: Goal) => {
    setGoals([...goals, newGoal])
    setShowCreateForm(false)
  }

  const getProgressPercentage = (goal: Goal) => {
    if (goal.targetValue && goal.currentValue) {
      return Math.round((goal.currentValue / goal.targetValue) * 100)
    }
    return 0
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">Загрузка...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Мои цели</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {goals.length} {goals.length === 1 ? 'цель' : 'целей'}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            + Новая цель
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Создать новую цель</h2>
            <CreateGoalForm
              onSuccess={handleGoalCreated}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        )}

        {goals.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              У вас пока нет целей
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Создать первую цель
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold flex-1">
                    {goal.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      goal.priority <= 2
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : goal.priority === 3
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}
                  >
                    P{goal.priority}
                  </span>
                </div>

                {goal.successMetric && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>{goal.successMetric}</span>
                      <span>
                        {goal.currentValue || 0} / {goal.targetValue || 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${getProgressPercentage(goal)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {goal.planItems && goal.planItems.length > 0 ? (
                    <p>{goal.planItems.length} задач в плане</p>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500">
                      Нет задач
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href={`/goals/${goal.id}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Открыть →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
