# Полное руководство по деплою React + Vite на GitHub Pages

Деплой современных React приложений, созданных с Vite, на GitHub Pages требует правильной конфигурации и понимания особенностей платформы. В 2025 году наиболее эффективным подходом является использование GitHub Actions с автоматизированным CI/CD процессом, хотя gh-pages пакет остается валидным решением для простых проектов.

## Необходимые изменения в конфигурации Vite

### Базовая настройка vite.config.js

**Критически важная настройка** - корректное указание `base` path в конфигурации Vite:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/repository-name/', // Обязательно для project pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Для production
    minify: 'terser'
  }
})
```

### Различные сценарии настройки

**Для project pages** (https://username.github.io/repo-name/):
```javascript
export default defineConfig({
  base: '/repo-name/', // Точно совпадает с названием репозитория
  plugins: [react()]
})
```

**Для user/organization pages** (https://username.github.io/):
```javascript
export default defineConfig({
  base: '/', // Корневой путь
  plugins: [react()]
})
```

**Адаптивная конфигурация для разных окружений:**
```javascript
export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/repo-name/' : '/',
  build: {
    sourcemap: mode === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  }
}))
```

## Настройка package.json скриптов

### Метод с gh-pages пакетом

```json
{
  "name": "vite-react-app",
  "homepage": "https://username.github.io/repo-name/",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.1.1",
    "vite": "^5.2.0"
  }
}
```

**Ключевые параметры:**
- `homepage` - полный URL будущего сайта
- `predeploy` - автоматически выполняется перед deploy
- `deploy` - публикует содержимое папки dist

### Метод с GitHub Actions

Для автоматизированного деплоя package.json упрощается:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

## Процесс билда и деплоя

### Подход 1: gh-pages пакет (быстрый старт)

**Установка и настройка:**
```bash
npm install gh-pages --save-dev
```

**Пошаговый процесс:**
1. Настроить `vite.config.js` с правильным base path
2. Добавить scripts в `package.json`
3. Локальное тестирование: `npm run build && npm run preview`
4. Деплой: `npm run deploy`
5. В GitHub Settings → Pages выбрать source "gh-pages branch"

### Подход 2: GitHub Actions (рекомендуется для 2025)

**Создать `.github/workflows/deploy.yml`:**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v5
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Настройка репозитория:**
1. Settings → Pages → Source: "GitHub Actions"
2. Settings → Actions → General → Workflow permissions: "Read and write"

## Решение проблемы с роутингом для SPA

### Проблема 404 ошибок

GitHub Pages не поддерживает client-side routing нативно. При прямом обращении к маршруту `/about` сервер ищет файл, не находит его и возвращает 404.

### Решение 1: HashRouter (рекомендуется)

**Самое простое и надежное решение:**

```javascript
// main.jsx
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
```

URL будет выглядеть как: `https://username.github.io/repo/#/about`

### Решение 2: BrowserRouter с basename

```javascript
// main.jsx
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/repo-name/">
    <App />
  </BrowserRouter>
)
```

### Решение 3: SPA fallback через 404.html

**Создать `public/404.html`:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>SPA Router</title>
    <script type="text/javascript">
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + 
        '/?/' + l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') + 
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') + l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

**Добавить в `index.html` перед загрузкой приложения:**

```html
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

## Автоматизация деплоя через GitHub Actions

### Расширенный workflow с кэшированием и оптимизацией

```yaml
name: Optimized Deploy to Pages

on:
  push:
    branches: ['main']
    paths-ignore:
      - 'README.md'
      - 'docs/**'
  pull_request:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: lts/*
          cache: 'npm'
          
      - name: Cache node modules
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          
      - name: Install dependencies
        run: npm ci --prefer-offline --no-audit
        
      - name: Build
        run: npm run build
        env:
          NODE_ENV: production
          VITE_APP_ENV: production
          
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        if: github.ref == 'refs/heads/main'
        with:
          path: './dist'

  deploy:
    if: github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Работа с environment variables

```yaml
# В workflow файле
env:
  VITE_API_URL: ${{ secrets.API_URL }}
  VITE_APP_VERSION: ${{ github.sha }}

steps:
  - name: Create .env file
    run: |
      echo "VITE_API_URL=${{ secrets.API_URL }}" >> .env
      echo "VITE_BUILD_TIME=$(date)" >> .env
```

## Распространенные ошибки и их решения

### Blank Page (белый экран)

**Причина:** Неправильная конфигурация base path

**Решение:**
1. Убедиться, что `base` в `vite.config.js` соответствует названию репозитория
2. Проверить, что `homepage` в `package.json` указан корректно
3. Убедиться, что папка `dist` не игнорируется git

```javascript
// Правильная конфигурация
export default defineConfig({
  base: '/ТОЧНОЕ_НАЗВАНИЕ_РЕПОЗИТОРИЯ/', // С слешами!
  plugins: [react()]
})
```

### 404 ошибки для ассетов

**Симптомы:** CSS и JS файлы не загружаются

**Решение:**
1. Проверить, что в `.gitignore` нет строки `dist/`
2. Убедиться, что используется `npm run build`, не `npm run dev`
3. Проверить пути в `dist/index.html`

### MIME type errors

**Ошибка:** "Expected JavaScript module but got text/jsx"

**Решение:**
- Использовать production сборку (`npm run build`)
- Деплоить папку `dist`, не `src`
- Проверить, что все import'ы правильные

### React Router не работает

**Решение:** 
- Использовать `HashRouter` (самое простое)
- Или настроить `basename` для `BrowserRouter`
- Добавить SPA fallback через 404.html

## Особенности работы с путями и ассетами

### Правильная структура проекта

```
project/
├── public/
│   ├── images/     # Статические изображения
│   └── icons/
└── src/
    └── assets/     # Импортируемые ассеты
```

### Работа с изображениями

```javascript
// Для статических файлов в public/
<img src="/images/logo.png" alt="Logo" />

// Для импортируемых ассетов из src/assets
import logo from './assets/logo.png';
<img src={logo} alt="Logo" />

// С учетом base URL
<img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" />
```

### Environment variables

```javascript
// Доступ к переменным (только с префиксом VITE_)
const apiUrl = import.meta.env.VITE_API_URL;
const isProduction = import.meta.env.PROD;
const basePath = import.meta.env.BASE_URL;
```

## Альтернативные способы деплоя: сравнение подходов

### gh-pages пакет vs GitHub Actions

| Критерий | gh-pages пакет | GitHub Actions |
|----------|---------------|----------------|
| **Простота настройки** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Автоматизация** | ⭐⭐ Ручной | ⭐⭐⭐⭐⭐ Автоматический |
| **CI/CD интеграция** | ⭐ Ограниченная | ⭐⭐⭐⭐⭐ Полная |
| **Отладка** | ⭐⭐ Сложная | ⭐⭐⭐⭐ Логи доступны |
| **Контроль процесса** | ⭐⭐ Ограниченный | ⭐⭐⭐⭐⭐ Полный |

### Когда использовать каждый подход

**gh-pages пакет подходит для:**
- Простых проектов и прототипов
- Команды из 1-2 разработчиков  
- Проектов без сложного CI/CD
- Быстрого деплоя демо-версий

**GitHub Actions рекомендуется для:**
- Корпоративных проектов
- Команд больше 2 человек
- Проектов, требующих автоматического тестирования
- Интеграции с внешними сервисами
- Проектов с environment variables

### Оптимизация производительности

```javascript
// vite.config.js - оптимизированная конфигурация
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui-library': ['@mui/material']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

## Заключение

В 2025 году оптимальной стратегией деплоя React + Vite проектов на GitHub Pages является использование **GitHub Actions с HashRouter** для роутинга. Этот подход обеспечивает надежность, автоматизацию и минимум проблем с конфигурацией. Для простых проектов gh-pages пакет остается валидным решением, но GitHub Actions предоставляет больше возможностей для масштабирования и интеграции в современные workflow разработки.

Ключевые моменты успешного деплоя: правильная настройка base path в vite.config.js, корректная конфигурация роутинга, и тщательное тестирование production сборки перед деплоем.