## Environment setup

Перед запуском убедитесь, что в папке `backend` есть файл `.env`.

Если файла нет — создайте его из примера:

```bash
cp backend/.env.example backend/.env
```

---

## Run with Docker

Запустите проект из корня репозитория:

```bash
docker compose up --build
```

После запуска приложение будет доступно по адресам:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`
- API docs: `http://localhost:8000/api/docs`

При первом старте backend автоматически выполнит seed и заполнит базу тестовыми данными.

---

## Stop containers

Чтобы остановить проект:

```bash
docker compose down
```

---

## Rebuild without cache

Если нужно полностью пересобрать контейнеры:

```bash
docker compose up --build --force-recreate
```

## Run without Docker

### Backend

Перейдите в папку `backend`:

```bash
cd backend
```

Создайте `.env` файл, если его нет:

```bash
cp .env.example .env
```

Создайте и активируйте виртуальное окружение:

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows (Command Prompt / PowerShell)**

```bash
python -m venv venv
venv\Scripts\activate
```

Если используете PowerShell и команда activation не сработала, выполните:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\venv\Scripts\Activate.ps1
```

Установите зависимости:

```bash
pip install -r requirements.txt
```

Если нужно заполнить базу вручную без Docker, выполните:

```bash
python seed_data.py
```

Запустите backend:

```bash
python run.py
```

Backend будет доступен по адресу:

- `http://localhost:8000`
- API docs: `http://localhost:8000/api/docs`

---

### Frontend

Откройте новый терминал и перейдите в папку `frontend`:

```bash
cd frontend
```

Установите зависимости:

```bash
npm install
```

Запустите dev server:

```bash
npm run dev
```

Frontend будет доступен по адресу:

- `http://localhost:5173`
