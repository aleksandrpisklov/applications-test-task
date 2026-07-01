import type { Application } from "../types/application";

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "TKT-001",
    title: "Сервер не отвечает на запросы после деплоя",
    description:
      "После деплоя версии 2.4.1 сервис периодически возвращает 502. Воспроизводится под нагрузкой > 200 RPS.",
    status: "in_progress",
    priority: "high",
    created_at: "2026-06-25T08:12:00Z",
    updated_at: "2026-06-30T14:45:00Z",
  },
  {
    id: "TKT-002",
    title: "Ошибка валидации email при регистрации",
    description: "Адреса вида user+tag@domain.com не проходят проверку.",
    status: "new",
    priority: "normal",
    created_at: "2026-06-26T11:03:00Z",
    updated_at: "2026-06-26T11:03:00Z",
  },
  {
    id: "TKT-003",
    title: "Добавить экспорт таблицы в CSV",
    description: "Пользователи запрашивают возможность экспорта отчётов в CSV.",
    status: "new",
    priority: "low",
    created_at: "2026-06-27T09:30:00Z",
    updated_at: "2026-06-27T09:30:00Z",
  },
  {
    id: "TKT-004",
    title: "Дашборд медленно загружается на больших датасетах",
    description:
      "При > 50 000 записей дашборд грузится > 12 секунд. Нужна пагинация или виртуализация.",
    status: "in_progress",
    priority: "high",
    created_at: "2026-06-27T13:15:00Z",
    updated_at: "2026-06-29T10:00:00Z",
  },
  {
    id: "TKT-005",
    title: "Устаревшие зависимости в package.json",
    description: "",
    status: "done",
    priority: "low",
    created_at: "2026-06-20T07:00:00Z",
    updated_at: "2026-06-28T16:20:00Z",
  },
  {
    id: "TKT-006",
    title: "2FA не работает для TOTP-приложений",
    description:
      "Коды из Google Authenticator и Authy отклоняются с ошибкой INVALID_TOKEN.",
    status: "new",
    priority: "high",
    created_at: "2026-06-28T15:44:00Z",
    updated_at: "2026-06-28T15:44:00Z",
  },
  {
    id: "TKT-007",
    title: "Уведомления по email не отправляются",
    description:
      "Письма не доходят с 29 июня. SMTP-соединение устанавливается, но письма застревают в очереди.",
    status: "in_progress",
    priority: "high",
    created_at: "2026-06-29T06:55:00Z",
    updated_at: "2026-06-30T09:10:00Z",
  },
  {
    id: "TKT-008",
    title: "Обновить документацию по API v3",
    description: "",
    status: "done",
    priority: "normal",
    created_at: "2026-06-22T10:00:00Z",
    updated_at: "2026-06-25T17:30:00Z",
  },
  {
    id: "TKT-009",
    title: "Кнопка сброса фильтров не работает в Safari",
    description:
      "В Safari 17 клик по кнопке Reset не снимает выбранные фильтры.",
    status: "new",
    priority: "normal",
    created_at: "2026-06-30T08:20:00Z",
    updated_at: "2026-06-30T08:20:00Z",
  },
  {
    id: "TKT-010",
    title: "Логи аудита не пишутся для событий удаления",
    description: "При удалении пользователей запись в audit_log не создаётся.",
    status: "done",
    priority: "normal",
    created_at: "2026-06-18T12:00:00Z",
    updated_at: "2026-06-23T11:00:00Z",
  },
];
