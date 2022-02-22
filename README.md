# Proyecto Integrador
DESARROLLO DE UN BACKEND PARA LA INTERACCIÓN DE LOS MIEMBROS DE LA COMUNIDAD DE LA IGLESIA IFGF 

## Documentación 
- [Informe técnico](https://drive.google.com/file/d/1whlgnsVbrQBwRtFdtUCNs8-OdhcEXLeW/view?usp=sharing)
- [Swagger](https://backend-ifgf.herokuapp.com/api-docs)
## Manual de Usuario
[![Alt text](https://img.youtube.com/vi/-ZNg8xB_4zs/0.jpg)](https://www.youtube.com/watch?v=-ZNg8xB_4zs)

## Autor

- [MichaelGuanoluisa](hhttps://github.com/MichaelGuanoluisa)


## Variables de Entorno

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV`

`PORT`

`MONGO_URI=DIRECCION DE MONGODB`

`SECRET_KEY=LLAVE SECRETA`



## Desplegar localmente

Para desplegar de forma local este proyecto se necesita tener las siguientes requerimientos:
- [Base de datos MongoDB](https://www.mongodb.com/try/download)
- Variables de entorno

Se necesita instalar las dependencias, para eso con el siguiente comando:
```bash
  npm install
```
Una vez con las variables de entorno y dependencias, para correr el proyecto de forma local se ingresa el siguieente comando en la terminal:
```bash
  npm run dev
```


## Tests

Para correr los tests se lo hace con el siguiente comando:

```bash
  npm run test
```

