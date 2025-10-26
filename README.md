# Aplicación de Clima

App web simple para consultar el clima de cualquier ciudad usando la API de OpenWeatherMap.

## Características

- Búsqueda de clima por nombre de ciudad
- Muestra temperatura en °C, humedad y descripción del clima
- Manejo de errores básico
- UI minimalista
- Tests con >= 80% cobertura

## Requisitos

- Node.js 18 o superior
- npm o yarn
- API key de OpenWeatherMap (gratuita en [openweathermap.org](https://openweathermap.org/api))

## Instalación

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Configurar API Key

Necesitas una API key gratuita de OpenWeatherMap. Regístrate en [openweathermap.org](https://openweathermap.org/api) y obtén tu key.

Luego copia el archivo `.env.example`:

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Linux/Mac:**
```bash
cp .env.example .env
```

Edita `.env` y reemplaza `your_api_key_here` con tu API key real. No subas este archivo a Git (ya está en .gitignore).

## Ejecución

### Desarrollo

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

### Producción

```bash
npm run build
npm start
```

### Verificar que funciona

Simplemente busca una ciudad como "Madrid" o "Barcelona" y deberías ver los datos del clima.

## Tests

```bash
npm run test
```

Los tests cubren búsqueda exitosa, manejo de errores y validaciones básicas.

Para modo watch durante desarrollo:

```bash
npm run test:watch
```

Para ver cobertura:

```bash
npm run coverage
```

Objetivo >= 80% cobertura.

## Estructura del Proyecto

```
/src
  /pages
    index.tsx      # Página principal
    _app.tsx       # Configuración de la app
  /components
    SearchForm.tsx      # Formulario de búsqueda
    WeatherCard.tsx     # Tarjeta de resultados
    ErrorBanner.tsx     # Mensaje de error
  /lib
    weatherClient.ts    # Cliente de la API
  /__tests__
    search.integration.test.tsx  # Tests de integración
    weatherClient.unit.test.ts   # Tests unitarios
```

## Scripts npm

- `dev` - Servidor de desarrollo
- `build` - Build de producción
- `start` - Iniciar producción
- `test` - Ejecutar tests
- `test:watch` - Tests en watch mode
- `coverage` - Ver cobertura de tests

## Tech Stack

Next.js, TypeScript, Jest, React Testing Library. Uso fetch para las llamadas a la API (el navegador lo soporta nativamente, no necesitamos axios).

## Problemas Comunes

Si ves "Weather API key is not configured", asegúrate de crear el archivo `.env`.

Si la API key da error, puede tardar unos minutos en activarse después de registrarte en OpenWeatherMap.

Para cualquier otro error, verifica que tengas Node.js 18+ instalado y que las dependencias estén instaladas correctamente con `npm install`. 
