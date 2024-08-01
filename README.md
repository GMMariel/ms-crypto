<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">
  Microservicio privado para la gestión de transacciones de criptomonedas, desarrollado con una arquitectura hexagonal.
</p>
<p align="center">
  <a href="https://github.com/GMMariel/ms-crypto" target="_blank"><img src="https://img.shields.io/github/license/GMMariel/ms-crypto" alt="License" /></a>
  <a href="https://github.com/GMMariel/ms-crypto" target="_blank"><img src="https://img.shields.io/github/repo-size/GMMariel/ms-crypto" alt="Repo Size" /></a>
  <a href="https://github.com/GMMariel/ms-crypto" target="_blank"><img src="https://img.shields.io/github/issues/GMMariel/ms-crypto" alt="Issues" /></a>
  <a href="https://github.com/GMMariel/ms-crypto" target="_blank"><img src="https://img.shields.io/github/forks/GMMariel/ms-crypto" alt="Forks" /></a>
  <a href="https://github.com/GMMariel/ms-crypto" target="_blank"><img src="https://img.shields.io/github/stars/GMMariel/ms-crypto" alt="Stars" /></a>
</p>

## Descripción

Este proyecto es un microservicio privado para la gestión de transacciones de criptomonedas. Fue desarrollado en menos de 8 horas, implementando una arquitectura hexagonal que facilita la escalabilidad y mantenibilidad del código. La lógica de negocios está desacoplada de la infraestructura, permitiendo una integración más sencilla con otros sistemas.

## Instalación

Para ejecutar el proyecto con Docker:

``` bash
# Construir los contenedores
$ docker-compose build

# Iniciar los contenedores
$ docker-compose up
```

## Acceso a la API
La documentación de la API está disponible en http://localhost:3000/api.

##  Test
``` bash
# Pruebas unitarias
$ npm run test:unit

# Pruebas de arquitectura
$ npm run test:arch
```
## Detalles del Proyecto

El proyecto está pensado como un microservicio privado, donde las validaciones de autorización y autenticación se manejan en un Backend-for-Frontend (BFF). Además, se ha implementado Swagger para facilitar la documentación y prueba de la API.

## Futuras Mejoras

- **Modelo de Datos:** Mejorar el manejo de números grandes o muy pequeños, optimizando las representaciones de saldo y transacciones.
- **Decoradores Personalizados:** Implementar decoradores personalizados para la validación de campos.
- **Arquitectura y Escalabilidad:** Ampliar la base de datos separando las entidades de usuarios y transacciones de criptomonedas.
- **Lógica de Negocio:** Agregar el intercambio de varias monedas.
- **Test:** Desarrollar test de integración y más tests unitarios para cubrir todo el proyecto y alcanzar una cobertura mayor al 90%.

## Mantente en Contacto
Autor - GMMariel
Repositorio - https://github.com/GMMariel/ms-crypto
