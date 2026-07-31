# Task Management Full Stack Application

## Descripción y Objetivo
Esta es una aplicación de gestión de tareas Full Stack (Angular + Node.js + SQLite). Permite a los usuarios crear, leer, actualizar y eliminar tareas, además de cambiar su estado (`pending`, `in_progress`, `done`). El objetivo principal de la aplicación es proporcionar una interfaz intuitiva con funcionalidades reactivas, aplicando buenas prácticas de desarrollo, manejo de errores robusto y una arquitectura escalable.

## Tecnologías Utilizadas
- **Backend:** Node.js v20+, Express v5.2, SQLite3 (better-sqlite3 / sqlite), Zod (para validaciones), Swagger (para documentación).
- **Frontend:** Angular v17+, Tailwind CSS, RxJS, Reactive Forms.
- **Base de Datos:** SQLite (archivo local).

## Instrucciones de Instalación

### Requisitos Previos
- Node.js (v18 o superior)
- npm o pnpm instalados

### Instalación del Backend
1. Navega a la carpeta del backend: `cd backend`
2. Instala las dependencias: `npm install`
3. Se generará un archivo `.env` o puedes crear uno basado en este contenido:
   ```
   PORT=3000
   DB_PATH=./database.sqlite
   ```
4. El backend utiliza SQLite, que se inicializará automáticamente al arrancar.

### Instalación del Frontend
1. Navega a la carpeta del frontend: `cd frontend`
2. Instala las dependencias: `npm install`

## Instrucciones de Ejecución

### Iniciar Backend
- En desarrollo (con Nodemon): `npm run dev`
- El servidor correrá en `http://localhost:3000`
- La documentación Swagger está en `http://localhost:3000/api-docs`

### Iniciar Frontend
- En desarrollo: `npm start` (o `ng serve`)
- La aplicación de Angular correrá en `http://localhost:4200`

## Arquitectura

### Estructura del Backend
- `src/controllers/`: Controladores de rutas Express.
- `src/services/`: Lógica de negocio e interacción con base de datos.
- `src/models/`: Definición de interfaces TypeScript y DTOs.
- `src/routes/`: Definición de endpoints API.
- `src/validations/`: Esquemas de Zod para validación de entrada de datos.

### Estructura del Frontend (Por implementar en siguientes pasos)
- `src/app/core/`: Interceptores HTTP (Loading, Error) y servicios Singleton.
- `src/app/shared/`: Componentes UI reutilizables (Modales, Toasts, Loaders).
- `src/app/features/tasks/`: Componentes y servicios específicos del dominio de tareas (Lista, Formulario).

### Comunicación Backend - Frontend
El frontend se comunica con el backend mediante peticiones HTTP RESTful usando `HttpClient` de Angular. Todas las respuestas exitosas y de error (400, 404, 500) son manejadas adecuadamente tanto por el servidor como por el cliente.

## Decisiones Técnicas Principales
- **SQLite en lugar de Array en memoria:** SQLite proporciona persistencia real, aportando puntos extra a la prueba sin necesidad de levantar servicios externos pesados como PostgreSQL o MongoDB.
- **Zod para validación en Backend:** Aporta tipado seguro y reduce los errores en validación de DTOs.
- **Tailwind CSS en Frontend:** Facilita la creación de interfaces de usuario responsivas y estéticamente agradables de manera rápida.
- **Smart/Dumb Components:** Separación clara entre componentes de presentación y componentes de lógica, favoreciendo el mantenimiento y testing.

## Funcionalidades Implementadas y Puntos Extra
- CRUD completo de tareas con visualización de estado.
- **Puntos extra logrados:**
  - Base de datos relacional (SQLite).
  - UI/UX cuidada (Tailwind CSS, diseño responsivo).
  - Documentación de API (Swagger).
  - Validaciones robustas de Frontend y Backend.
  - Variables de entorno.
  - Mensajes amigables al usuario (Toasts / Modales).

## Posibles Mejoras Futuras
- Autenticación con JWT (JSON Web Tokens).
- Pruebas unitarias y E2E automatizadas (Jest / Cypress).
- Dockerización de toda la aplicación.
- Paginación del lado del servidor para grandes volúmenes de datos.
