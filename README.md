<h1 align="center">Backend Sigma Shop</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Descripción

Este es un proyecto el cual tiene el objetivo poder demostrar, y poner en practica los conocimientos adquiridos.

## Requerimientos

- [Node.js](https://nodejs.org/en)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Docker](https://www.docker.com/)

## Puesta en marcha

1. Clonar el repositorio
   ```bash
   git clone
   ```
2. Instalar las dependencias correspondientes:
   ```bash
   npm install
   ```
3. Renombrar archivo `.env.template` por `.env`
4. Configurar las variables de entorno:
   - PORT
   - HOST_API
   - DB_PASSWORD
   - DB_USERNAME
   - DB_NAME
   - DB_HOST
   - DB_PORT
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - CLOUDINARY_CLOUD_NAME
5. Levantar base de datos:
   ```bash
   docker compose up -d
   ```
6. Ejecutar SEED para llenar base de datos en desarrollo:
   `GET: /api/seed`
7. Correr en modo desarrollo:
   ```bash
   npm run start:dev
   ```
