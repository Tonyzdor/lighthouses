# 🎯 Lighthouses - Годовое планирование с декомпозицией

Веб-приложение для планирования годовых целей с автоматической декомпозицией на месяцы, недели и дни.

## 🚀 Quick Start

```bash
# 1. Установка зависимостей
npm install

# 2. Настройка базы данных
cp .env.example .env
npx prisma db push

# 3. Запуск dev сервера
npm run dev
```

Приложение доступно по адресу: http://localhost:3000

## 📚 Документация

- **[claude.md](./claude.md)** - Критерии качества, TDD, процессы разработки
- **[BACKLOG.md](./BACKLOG.md)** - Беклог задач, приоритеты, прогресс
- **[prd.md](./prd.md)** - Продуктовые требования (PRD)

## 🛠 Команды

### Разработка
```bash
npm run dev          # Запуск dev сервера
npm run build        # Production build
npm run start        # Запуск production сервера
```

### Тестирование (TDD)
```bash
npm test             # Запуск тестов в watch режиме
npm run test:ci      # Запуск тестов в CI (с coverage)
npm run test:coverage # Показать coverage report
npm run type-check   # Проверка TypeScript типов
npm run lint         # Проверка ESLint
```

### Форматирование
```bash
npm run format       # Форматировать код (Prettier)
npm run format:check # Проверить форматирование
```

### База данных
```bash
npm run prisma:generate # Генерация Prisma Client
npm run prisma:migrate  # Создать миграцию
npm run prisma:studio   # Открыть Prisma Studio
```

## 🏗 Архитектура

```
lighthouses/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── goals/        # Goals CRUD endpoints
│   │   └── tasks/        # Tasks CRUD endpoints
│   ├── goals/            # Goals pages
│   ├── today/            # Today view
│   ├── week/             # Week view
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React компоненты
│   ├── CreateGoalForm.tsx
│   ├── QuickTaskInput.tsx
│   └── TaskItem.tsx
├── lib/                   # Утилиты и helpers
│   └── db/
│       └── prisma.ts     # Prisma Client instance
├── prisma/                # Prisma ORM
│   ├── schema.prisma     # Database schema
│   └── migrations/       # DB migrations
├── __tests__/             # Тесты (Jest)
│   ├── api/
│   └── components/
├── claude.md              # Quality standards
├── BACKLOG.md             # Project backlog
└── prd.md                 # Product requirements
```

## 📊 Текущий прогресс

### MVP Features (5/9 completed - 56%)

✅ **Готово:**
- Setup проекта (Next.js, TypeScript, Prisma, SQLite)
- Goals management (создание, редактирование, список)
- Today view (задачи на сегодня)
- Week view (недельный календарь)
- Task actions (Done/Undone/Delete)

🚧 **В разработке:**
- Testing infrastructure
- API tests

📋 **Планируется:**
- Keyboard shortcuts (Cmd+K)
- Goal decomposition UI
- Recurring tasks
- Progress tracking
- Weekly review

Подробнее см. [BACKLOG.md](./BACKLOG.md)

## 🧪 Test-Driven Development (TDD)

Проект следует TDD методологии:

1. **Red**: Пишем тест → тест падает ❌
2. **Green**: Пишем минимальный код → тест проходит ✅
3. **Refactor**: Улучшаем код

```bash
# Запустить тесты
npm test

# Проверить coverage (минимум 80%)
npm run test:coverage
```

### Definition of Done (DoD)

Фича готова когда:
- ✅ Написаны автотесты
- ✅ Все тесты проходят
- ✅ Соответствует PRD
- ✅ TypeScript без ошибок
- ✅ Отформатирован код
- ✅ Обновлен BACKLOG.md

## 🔧 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Database**: SQLite + Prisma ORM
- **Styling**: Tailwind CSS + Material UI
- **Testing**: Jest + React Testing Library
- **Formatting**: Prettier
- **Linting**: ESLint

## 📝 Contribution Guidelines

1. Прочитай [claude.md](./claude.md) - обязательно!
2. Проверь [BACKLOG.md](./BACKLOG.md) для задач
3. Убедись что соответствует [prd.md](./prd.md)
4. **TDD**: пиши тесты ДО кода
5. Проверь что все проходит:
   ```bash
   npm test
   npm run type-check
   npm run lint
   npm run format:check
   ```
6. Создай осмысленный commit
7. Обнови BACKLOG.md

## 🚫 Что делать НЕЛЬЗЯ

1. ❌ Коммитить код без тестов
2. ❌ Пушить с падающими тестами
3. ❌ Игнорировать TypeScript ошибки
4. ❌ Отклоняться от PRD без документирования
5. ❌ Забывать обновлять BACKLOG.md

Подробнее см. [claude.md](./claude.md)

## 📈 Метрики качества

| Метрика | Цель | Текущее |
|---------|------|---------|
| Test Coverage | ≥80% | 0% (⚠️ критично) |
| TypeScript Strict | ✓ | ✓ |
| PRD Compliance | 100% | 100% |
| Build Success | 100% | 100% |

## 🔗 Ссылки

- GitHub: https://github.com/Tonyzdor/lighthouses
- Prisma Docs: https://www.prisma.io/docs
- Next.js Docs: https://nextjs.org/docs
- Jest Docs: https://jestjs.io/

## 📧 Support

Для вопросов и багрепортов используй [GitHub Issues](https://github.com/Tonyzdor/lighthouses/issues)

---

Made with ❤️ using Test-Driven Development
