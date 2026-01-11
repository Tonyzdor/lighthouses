'use client'

import { useState } from 'react'

interface CreateGoalFormProps {
  onSuccess?: (goal: any) => void
  onCancel?: () => void
}

export default function CreateGoalForm({
  onSuccess,
  onCancel,
}: CreateGoalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    successMetric: '',
    targetValue: '',
    priority: 3,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to create goal')
      }

      const goal = await response.json()
      onSuccess?.(goal)

      // Reset form
      setFormData({
        title: '',
        successMetric: '',
        targetValue: '',
        priority: 3,
      })
    } catch (error) {
      console.error('Error creating goal:', error)
      alert('Ошибка при создании цели')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Название цели <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="Например: Выучить испанский язык"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          required
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="successMetric"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Метрика успеха (опционально)
          </label>
          <input
            type="text"
            id="successMetric"
            value={formData.successMetric}
            onChange={(e) =>
              setFormData({ ...formData, successMetric: e.target.value })
            }
            placeholder="Например: часов обучения"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="targetValue"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Целевое значение
          </label>
          <input
            type="number"
            id="targetValue"
            value={formData.targetValue}
            onChange={(e) =>
              setFormData({ ...formData, targetValue: e.target.value })
            }
            placeholder="100"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            disabled={!formData.successMetric}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Приоритет (1-5)
        </label>
        <input
          type="range"
          id="priority"
          min="1"
          max="5"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: parseInt(e.target.value) })
          }
          className="w-full"
        />
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          {formData.priority}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !formData.title}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Создание...' : 'Создать цель'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  )
}
