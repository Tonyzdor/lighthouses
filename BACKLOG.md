# Lighthouses - Product Backlog

> Последнее обновление: 2026-01-11

## 🎯 Легенда приоритетов

- **P0** - Критично, блокирует работу (must have)
- **P1** - Высокий приоритет (should have)
- **P2** - Средний приоритет (nice to have)
- **P3** - Низкий приоритет (future)

## 🚀 В работе (In Progress)

### P0: Настройка тестирования
- [ ] Setup Jest + React Testing Library
- [ ] Написать тесты для Goals API
- [ ] Написать тесты для Tasks API
- [ ] Написать тесты для компонентов (CreateGoalForm, TaskItem, QuickTaskInput)
- [ ] Добавить npm scripts для тестов
- [ ] Настроить pre-commit hooks

**Статус**: Started
**Обоснование**: Без тестов дальнейшая разработка рискованна

---

## 📝 Очередь (To Do)

### P0: MVP Features - критичные для запуска

#### Feature 2: Keyboard shortcuts (Cmd+K)
- [ ] Реализовать глобальный Cmd+K хендлер
- [ ] Создать модальное окно для quick input
- [ ] Парсинг быстрого ввода (#goal, tomorrow, every Mon, ! priority)
- [ ] Автокомплит для целей
- [ ] Тесты для парсера команд

**Ссылка на PRD**: Раздел 5.4
**Story Points**: 8

#### Feature 3: Goal Decomposition UI (год → месяц → неделя → день)
- [ ] Создать страницу детальной цели `/goals/[id]`
- [ ] Tabs для Year/Months/Weeks/Days
- [ ] Timeline визуализация (мини-Gantt)
- [ ] Drag-and-drop для переноса задач
- [ ] Создание вех и подзадач
- [ ] Тесты для decomposition logic

**Ссылка на PRD**: Раздел 5.2
**Story Points**: 13

#### Feature 6: Recurring Tasks
- [ ] Расширить схему БД для RRULE
- [ ] Реализовать генерацию повторяющихся задач
- [ ] UI для настройки повторений (daily, weekly, custom)
- [ ] Поддержка "Skip" для одного экземпляра
- [ ] Тесты для recurrence engine

**Ссылка на PRD**: Раздел 5.2, 5.5
**Story Points**: 13

### P1: MVP Features - важные, но не блокирующие

#### Feature 8: Goal Progress Tracking
- [ ] Обновление currentValue при выполнении задач
- [ ] Визуализация прогресса (progress bar)
- [ ] Калькуляция % выполнения по задачам
- [ ] Индикатор "в риске" (behind schedule)
- [ ] Тесты для progress calculations

**Ссылка на PRD**: Раздел 5.3
**Story Points**: 5

#### Feature 9: Weekly Review
- [ ] Создать страницу `/reviews`
- [ ] Шаблон weekly review (что сделано/просрочено/фокус)
- [ ] Автогенерация review по воскресеньям
- [ ] Перенос просроченных задач
- [ ] История reviews
- [ ] Тесты для review logic

**Ссылка на PRD**: Раздел 5.6
**Story Points**: 8

#### Goal Detail Page
- [ ] Создать `/goals/[id]` с полной информацией
- [ ] Редактирование цели inline
- [ ] Список всех задач цели
- [ ] Статистика по цели
- [ ] История изменений (опционально)

**Story Points**: 5

### P2: Quality & Polish

#### Testing Infrastructure
- [ ] Unit tests для utils
- [ ] Component tests для всех компонентов
- [ ] API integration tests
- [ ] Настроить test coverage reporting
- [ ] CI/CD с автоматическими тестами

**Story Points**: 13

#### UI/UX Improvements
- [ ] Анимации для transitions
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Loading states для всех async операций
- [ ] Error boundaries
- [ ] Toast notifications для feedback
- [ ] Mobile responsive design улучшения

**Story Points**: 8

#### Performance
- [ ] Оптимизация запросов к БД (indexes)
- [ ] React memo для тяжелых компонентов
- [ ] Lazy loading для routes
- [ ] Image optimization
- [ ] Bundle size analysis

**Story Points**: 5

---

## ✅ Выполнено (Done)

### Sprint 1 (2026-01-11)

#### ✅ Initial Setup
- [x] Initialize Next.js 14+ with TypeScript
- [x] Setup Tailwind CSS + Material UI
- [x] Configure Prisma ORM with SQLite
- [x] Create database schema
- [x] Apply initial migration

**Commits**: `906dad4`

#### ✅ MVP Feature 1: Create Goal
- [x] Goals API endpoints (GET/POST/PUT/DELETE)
- [x] CreateGoalForm component
- [x] Goals list page
- [x] Progress indicators

**Commits**: `906dad4`
**PRD**: Раздел 5.1 ✓

#### ✅ MVP Feature 4: Today View
- [x] Tasks API endpoints
- [x] Today page with daily tasks
- [x] QuickTaskInput component
- [x] TaskItem component with actions
- [x] Stats display

**Commits**: `783bf4b`
**PRD**: Раздел 4.1 ✓

#### ✅ MVP Feature 5: Week View
- [x] Week page with 7-day grid
- [x] Week navigation (prev/current/next)
- [x] Weekly statistics
- [x] Quick task input per day

**Commits**: `4526598`
**PRD**: Раздел 4.1 ✓

#### ✅ MVP Feature 7: Task Actions
- [x] Done/Undone toggle
- [x] Delete task
- [x] Auto-track completion date

**Commits**: `783bf4b`
**PRD**: Раздел 5.5 ✓

#### ✅ Bug Fix: Prisma Client import
- [x] Fix Prisma Client path from custom to standard
- [x] Update schema generator config
- [x] Regenerate Prisma Client

**Commits**: (pending)

---

## 🔮 Будущие планы (Future / P3)

### Templates System
- [ ] Шаблоны целей (спорт, обучение, проекты)
- [ ] Библиотека шаблонов
- [ ] Импорт/экспорт шаблонов
- [ ] Community templates (если будет публичный запуск)

### Advanced Features
- [ ] Collaboration (share goals with team)
- [ ] Notifications (browser/email)
- [ ] Интеграции (Google Calendar, Notion)
- [ ] Mobile app (React Native)
- [ ] AI-powered goal suggestions
- [ ] Analytics dashboard

### Infrastructure
- [ ] Migration to PostgreSQL для production
- [ ] Authentication (NextAuth.js)
- [ ] Multi-tenancy
- [ ] Backup & restore
- [ ] Monitoring (Sentry)

---

## 📊 Метрики

### Текущий статус MVP (на 2026-01-11)

| Метрика | Значение |
|---------|----------|
| MVP Features Done | 5 / 9 (56%) |
| Test Coverage | 0% (⚠️ критично!) |
| PRD Compliance | 100% для готовых фич |
| Open P0 Issues | 1 (тестирование) |
| Total Commits | 3 |

### Velocity

- Sprint 1: 31 story points completed
- Average: TBD (нужно больше спринтов)

---

## 🎯 Критерии готовности MVP

MVP считается готовым к запуску когда:

- [x] ~~Feature 1: Create Goal~~
- [ ] Feature 2: Keyboard shortcuts (Cmd+K)
- [ ] Feature 3: Goal Decomposition
- [x] ~~Feature 4: Today view~~
- [x] ~~Feature 5: Week view~~
- [ ] Feature 6: Recurring tasks
- [x] ~~Feature 7: Task actions~~
- [ ] Feature 8: Progress tracking
- [ ] Feature 9: Weekly review
- [ ] **Test coverage > 80%**
- [ ] All P0 bugs fixed
- [ ] Manual testing passed

**Current Progress**: 5/12 критериев (42%)

---

## 📝 Notes

### Технический долг
1. ⚠️ Нет тестов - критический технический долг
2. Prisma Client configuration fixed, но нужен CI для проверки
3. Error handling минимальный, нужно улучшить

### Решения и отклонения от PRD
- Используем SQLite вместо PostgreSQL для MVP (упрощение setup)
- Material UI добавлен, но почти не используется (можем удалить для уменьшения bundle)

---

**Следующий шаг**: Настройка тестирования (P0)
