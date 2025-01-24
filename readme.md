# CRUD Login

Este es un proyecto de ejemplo de un sistema de login y CRUD (Create, Read, Update, Delete) utilizando Node.js, bcrypt, JWT, y SQLite. Este proyecto incluye un panel de administración para gestionar usuarios.

## Características

- **Registro de usuarios**: Registro de nuevos usuarios con hashing de contraseñas usando bcrypt.
- **Login de usuarios**: Autenticación de usuarios usando JSON Web Tokens (JWT) y almacenamiento de tokens en cookies.
- **CRUD de usuarios**: Creación, lectura, actualización y eliminación de usuarios desde un panel de administración.
- **Protección de rutas**: Protección de rutas sensibles mediante la verificación de tokens JWT.
- **Base de datos en memoria**: Implementación opcional para desarrollo rápido y pruebas.

## Video de demostración

Puedes ver una demostración en video del funcionamiento del sistema en el siguiente enlace:
[Video de demostración](https://youtu.be/-1RvydqA4uQ)

## Requisitos Previos

- Node.js (versión 22.5 o superior)
- npm (Node Package Manager)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/guinovi/crud-login.git
    cd crud-login
    ```

2. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

3. Configura el entorno:
   - Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
    ```env
    PORT=3000
    SECRET_KEY=tuClaveSecreta
    USER=admin
    PASS=admin123
    ROLE=Administrador
    EMAIL=admin@example.com
    ROLBOOL=true
    ```

4. Inicia el servidor:
    ```bash
    npm start
    ```

## Uso

### Login y CRUD de usuarios

1. Accede a la aplicación en tu navegador en `http://localhost:3000`.
2. Inicia sesión con las credenciales definidas en el archivo `.env`.
3. Una vez autenticado, accede al panel de administración para gestionar usuarios:
   - Crear nuevos usuarios.
   - Editar información de usuarios existentes.
   - Eliminar usuarios.

### Protección de rutas

- Las rutas sensibles están protegidas mediante middleware que verifica el token JWT.
- Si el token no es válido o ha expirado, se deniega el acceso.

## Desarrollo

### Base de datos

Este proyecto utiliza SQLite como base de datos por defecto. Para desarrollo rápido, también es posible usar una base de datos en memoria.

- **Base de datos en memoria**:
  Al iniciar el servidor, se crea una base de datos temporal en memoria que incluye un usuario administrador definido en las variables de entorno.

### Scripts disponibles

- **Iniciar el servidor**:
    ```bash
    npm start
    ```
- **Iniciar el servidor en modo desarrollo** (con nodemon):
    ```bash
    npm run dev
    ```

## Tecnologías utilizadas

- **Backend**: Node.js, Express.js
- **Autenticación**: bcrypt, JSON Web Tokens (JWT)
- **Base de datos**: SQLite (opcionalmente en memoria para pruebas)
- **Frontend**: HTML, CSS, JavaScript

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu función o corrección de errores:
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
3. Realiza tus cambios y haz un commit:
    ```bash
    git commit -m "Agrega nueva funcionalidad"
    ```
4. Envía un pull request a la rama principal del repositorio original.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

