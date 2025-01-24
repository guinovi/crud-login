# CRUD Login

Este es un proyecto de ejemplo de un sistema de login y CRUD (Create, Read, Update, Delete) utilizando Node.js, bcrypt, JWT, y SQLite. 

## Características

- **Registro de usuarios**: Registro de nuevos usuarios con hashing de contraseñas usando bcrypt.
- **Login de usuarios**: Autenticación de usuarios usando JSON Web Tokens (JWT) y almacenamiento de tokens en cookies.
- **CRUD de usuarios**: Creación, lectura, actualización y eliminación de usuarios.
- **Protección de rutas**: Protección de rutas sensibles mediante la verificación de tokens JWT.

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
    ```

4. Inicia el servidor:
    ```bash
    npm start
    ```


