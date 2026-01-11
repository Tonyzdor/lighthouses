import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Lighthouses</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Планирование годовых целей с декомпозицией на месяцы, недели и дни
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/goals"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-2">Мои цели</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Создавайте и отслеживайте годовые цели
            </p>
          </Link>

          <Link
            href="/today"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-2">Сегодня</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Задачи и планы на сегодня
            </p>
          </Link>

          <Link
            href="/week"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-2">Неделя</h2>
            <p className="text-gray-600 dark:text-gray-400">
              План и обзор текущей недели
            </p>
          </Link>

          <Link
            href="/reviews"
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold mb-2">Обзоры</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Недельные и месячные ретроспективы
            </p>
          </Link>
        </div>
      </div>
    </main>
  )
}
