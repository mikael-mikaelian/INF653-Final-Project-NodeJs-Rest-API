# INF653 Final Project — REST API по штатам США / US States REST API

## Описание / Description  
REST API на Node.js с Express и MongoDB, предоставляющее информацию о штатах США: основные данные и интересные факты.  
A Node.js REST API with Express and MongoDB providing information about US states: key data and fun facts.

---

## Структура проекта / Project Structure  
- **config/** — настройки подключения к базе данных и CORS / Database connection and CORS settings  
- **controllers/** — логика обработки запросов / Request handling logic  
- **middleware/** — промежуточные обработчики (логирование, валидация, ошибки) / Middleware (logging, validation, error handling)  
- **model/** — модель данных State и начальные данные / Data model for State and initial data  
- **routes/** — маршруты API и страниц / API and page routes  
- **views/** — статические html-страницы / Static HTML pages  
- **public/** — статические файлы (CSS и пр.) / Static files (CSS etc.)  
- **server.js** — точка входа в приложение / Application entry point

---

## Эндпоинты API / API Endpoints  

| Метод / Method | Путь / Path                 | Описание / Description                         |
|----------------|----------------------------|-----------------------------------------------|
| GET            | /                          | Главная страница / Main page                   |
| GET            | /states                    | Получить все штаты / Get all states            |
| GET            | /states/:state             | Информация по штату / State info               |
| GET            | /states/:code/capital      | Столица штата / State capital                  |
| GET            | /states/:code/nickname     | Прозвище штата / State nickname                 |
| GET            | /states/:code/population   | Население штата / State population              |
| GET            | /states/:code/admission    | Дата вступления в союз / Admission date         |
| GET            | /states/:code/funfact      | Случайный интересный факт / Random fun fact     |
| POST           | /states/:code/funfact      | Добавить интересный факт / Add a fun fact       |
| PATCH          | /states/:code/funfact      | Обновить интересный факт / Update a fun fact    |
| DELETE         | /states/:code/funfact      | Удалить интересный факт / Delete a fun fact     |

---

## Модель данных / Data Model

```js
{
  stateCode: String, // уникальный код штата, обязательный / unique state code, required
  funfacts: [String] // массив интересных фактов / array of fun facts
}
```
---
## Установка и запуск / Installation and Running
	1.	Клонируйте репозиторий / Clone the repository:

git clone <repository-url>


	2.	Установите зависимости / Install dependencies:

npm install


	3.	Настройте подключение к MongoDB в config/dbConn.js / Configure MongoDB connection in config/dbConn.js
	4.	Запустите сервер / Start the server:

npm start


	5.	Сервер доступен по адресу http://localhost:PORT / Server runs at http://localhost:PORT

---

## Особенности / Features
- Открытый API без аутентификации / Open API without authentication
- Управление списком интересных фактов / Fun facts management
- Middleware для логирования, валидации и обработки ошибок / Middleware for logging, validation, and error handling
- Централизованная обработка ошибок и страницы 404 / Centralized error and 404 handling

---

Примеры запросов / Example Requests

GET /states/CA — Получить информацию о Калифорнии / Get California info

POST /states/CA/funfact — Добавить интересный факт (JSON в теле) / Add a fun fact (JSON body)
