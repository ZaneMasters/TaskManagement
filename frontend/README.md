# Frontend - Task Management SPA

Este es el cliente o interfaz gráfica de la aplicación de Gestión de Tareas. Está desarrollado bajo el framework **Angular (v17+)** y diseñado completamente utilizando **Tailwind CSS**.

## ✨ Features Principales

- **Gestión Visual de Tareas:** Visualización, edición, filtrado y creación rápida de tareas.
- **Diseño Responsivo (Tailwind):** UI limpia, rápida y perfectamente adaptable a ordenadores, tablets y teléfonos móviles.
- **Búsqueda en Tiempo Real:** Filtro reactivo que permite buscar de manera instantánea coincidencias parciales por título o descripción sin peticiones adicionales al backend.
- **Autenticación Transparente:** La app integra un interceptor HTTP que adhiere de forma automática los tokens Bearer necesarios para consumir la API.
- **Feedback Interactivo (SweetAlert2):** Utilización de alertas nativas hermosas, modales de confirmación antes del borrado de tareas destructivas y "toasts" amigables al completar procesos con éxito.
- **Formularios Reactivos:** Validaciones de formularios al vuelo. No es posible guardar si el modelo supera longitudes máximas o faltan datos obligatorios.

## 🏗️ Arquitectura y Flujo

La estructura organizativa aprovecha los **Componentes Standalone** modernos de Angular y el concepto de Smart/Dumb components:

- `src/app/core/`: Alberga archivos esenciales para que el frontend exista, los cuales deben cargarse de forma global. 
  - `/models/`: Tipos estrictos (DTOs) replicando el schema del backend.
  - `/services/`: `task.service.ts` se encarga de usar Angular `HttpClient` para conectar la interfaz con el backend.
  - `/interceptors/`: Aquí reside `auth.interceptor.ts`, un eslabón centralizado donde cada petición que sale de Angular obtiene los headers necesarios para la API.
- `src/app/features/tasks/`: Contiene todo lo relacionado con el área de tareas.
  - `task-list` (Smart Component): Componente orquestador. Gestiona el estado (Cargando, Errores, Data local), llama a servicios, abre modales e inyecta la información hacia componentes hijos.
  - `task-item` (Dumb Component): Componente visual puro que solo se encarga de renderizar 1 tarea de forma atractiva. Dispara eventos (`@Output`) cuando el usuario interactúa para que el Smart component actúe.
  - `task-form-modal`: Formulario desacoplado reactivo invocado al crear/editar.

## 🔗 Conexiones

El frontend está configurado en `src/environments/environment.ts` para comunicarse directamente con `http://localhost:3000/api`. Toda información generada en la UI es enviada allí vía JSON.

## 📊 Diagrama de Flujo del Frontend

```mermaid
graph TD
    User([Usuario]) -->|Hace click en Crear/Editar| Modal(Task Form Modal)
    User -->|Escribe en Búsqueda| List[Task List Component]
    User -->|Cambia Estado / Click Borrar| Item[Task Item Component]

    Modal -->|Envía FormGroup válido| List
    Item -->|@Output Event| List

    List -->|Llama a métodos CRUD| Service(Task Service)
    
    Service -->|Petición HTTP pura| Interceptor{Auth Interceptor}
    Interceptor -->|Inyecta Bearer Token| HttpClient[Angular HttpClient]
    
    HttpClient -->|Red| API[(Backend REST API)]
    
    API -->|JSON Response| HttpClient
    HttpClient -->|Observable| List
    
    List -->|Dispara Feedback| Alert(SweetAlert2 UI)
    List -->|Actualiza Estado Local| State[Tareas UI Renderizadas]
```

## 🛠️ Scripts Útiles
- `npm start`: Levanta el entorno de desarrollo utilizando Angular CLI (`ng serve`). El proyecto estará disponible en el puerto `4200`.
- `npm run build`: Transpila y empaqueta la aplicación de manera minificada en la carpeta `/dist/`, lista para desplegarse estáticamente (S3, Vercel, Nginx, Firebase, etc).
