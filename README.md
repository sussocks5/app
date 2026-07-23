# CoLive - Платформа для поиска соседей по аренде

## 📱 Описание

CoLive — это веб-приложение для поиска идеальных соседей по совместной аренде квартиры. Платформа использует алгоритм совместимости для подбора соседей, предоставляет функции чата, управления общими расходами и поиска квартир.

## 🛠️ Технологический стек

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js + Next.js API Routes** - Backend server
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Zod** - Data validation

## 📦 Структура проекта

```
├── components/              # React компоненты
│   ├── Navbar.tsx          # Навигация
│   ├── Sidebar.tsx         # Боковая панель
│   └── RoommateCard.tsx    # Карточка соседа
├── pages/
│   ├── api/                # API Routes
│   │   ├── auth/           # Аутентификация
│   │   ├── users/          # Пользователи
│   │   ├── rooms/          # Квартиры
│   │   ├── matches/        # Матчи
│   │   ├── messages/       # Сообщения
│   │   └── expenses/       # Расходы
│   ├── _app.tsx            # App wrapper
│   └── index.tsx           # Home page
├── lib/
│   ├── db.ts               # Database connection
│   ├── auth.ts             # Auth utilities
│   └── validators.ts       # Data validators
├── scripts/
│   └── init-db.sql         # Database schema
├── public/                 # Static files
├── globals.css             # Global styles
├── package.json            # Dependencies
└── .env.example            # Environment variables
```

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 16+
- PostgreSQL 12+
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/sussocks5/app.git
   cd app
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения**
   ```bash
   cp .env.example .env.local
   ```
   Отредактируйте `.env.local` с вашими данными:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/colive
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Инициализируйте базу данных**
   ```bash
   # Создайте БД
   createdb colive
   
   # Примените миграции
   psql -U postgres -d colive -f scripts/init-db.sql
   ```

5. **Запустите приложение**
   ```bash
   npm run dev
   ```

   Приложение будет доступно на http://localhost:3000

## 📚 API Документация

### Аутентификация

#### Регистрация
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "age": 25,
  "job": "Developer"
}
```

#### Вход
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}
```

### Пользователи

#### Получить профиль
```http
GET /api/users/[id]
```

#### Обновить профиль
```http
PUT /api/users/[id]
Authorization: Bearer [token]
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Looking for roommates",
  "location": "Moscow"
}
```

### Квартиры

#### Получить квартиры
```http
GET /api/rooms?city=Moscow&minPrice=30000&maxPrice=50000&rooms=2
```

#### Создать объявление квартиры
```http
POST /api/rooms
Authorization: Bearer [token]
Content-Type: application/json

{
  "title": "2-комнатная квартира",
  "description": "Комфортная квартира в центре",
  "price": 45000,
  "rooms": 2,
  "address": "Ul. Pushkina 10",
  "city": "Moscow"
}
```

### Матчи

#### Получить матчи
```http
GET /api/matches
Authorization: Bearer [token]
```

#### Создать матч
```http
POST /api/matches
Authorization: Bearer [token]
Content-Type: application/json

{
  "matched_user_id": 2,
  "compatibility_score": 85
}
```

### Сообщения

#### Получить сообщения
```http
GET /api/messages?other_user_id=2
Authorization: Bearer [token]
```

#### Отправить сообщение
```http
POST /api/messages
Authorization: Bearer [token]
Content-Type: application/json

{
  "receiver_id": 2,
  "content": "Привет! Давай посмотрим квартиру?"
}
```

### Расходы

#### Получить расходы группы
```http
GET /api/expenses?group_id=1
Authorization: Bearer [token]
```

#### Добавить расход
```http
POST /api/expenses
Authorization: Bearer [token]
Content-Type: application/json

{
  "group_id": 1,
  "description": "Аренда на сентябрь",
  "amount": 45000,
  "category": "rent"
}
```

## 🗄️ Структура БД

### Таблицы

**users** - Пользователи
- id, name, email, password, age, job, bio, location, avatar_url, profile_completion

**rooms** - Квартиры
- id, title, description, price, rooms, address, city, latitude, longitude, image_url, owner_id

**matches** - Совпадения
- id, user_id_1, user_id_2, compatibility_score, status

**messages** - Сообщения
- id, sender_id, receiver_id, content, read, created_at

**groups** - Группы жилья
- id, name, room_id, created_by

**expenses** - Расходы
- id, group_id, description, amount, paid_by, category

## 🔐 Безопасность

- ✅ Пароли хешируются с bcrypt
- ✅ JWT токены для аутентификации
- ✅ Валидация данных с Zod
- ✅ CORS protection
- ✅ SQL injection protection (параметризованные запросы)

## 📝 TODO и улучшения

- [ ] WebSocket для real-time чата
- [ ] Email уведомления
- [ ] Система рейтинга соседей
- [ ] Фильтры по интересам и стилю жизни
- [ ] Платежная система
- [ ] Admin панель
- [ ] Mobile приложение
- [ ] Миграция на GraphQL

## 🤝 Контрибьютинг

Приветствуются Pull Requests! Для больших изменений сначала откройте Issue.

## 📄 Лицензия

MIT License

## 📞 Контакты

- GitHub: [@sussocks5](https://github.com/sussocks5)
- Email: contact@example.com
