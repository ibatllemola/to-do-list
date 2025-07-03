# LISTA DE TAREAS 

## Descripción

Esta aplicación es una lista de tareas que permite crear, listar, actualizar y eliminar tareas. Está dividida en dos partes:

- **Back-End:** API REST construida en Python, que expone los endpoints para gestionar las tareas.
- **Front-End:** Interfaz de usuario hecha con React.js que consume la API y permite interactuar con la lista de tareas.


## Tecnologías usadas

- **Back-End:** Python (con Flask para la API REST). También se ha usado Postman para comprobar si los endpoints funcionaban correctamente.
- **Front-End:** React.js
- **Estilos:** CSS (archivo `index.css`)


## Estructura básica del código
    - Los endpoionts del Back-End están en el archivo app.py, y son los pedidos en el enunciado del ejercicio:

| Método | Ruta         | Descripción                       |
|--------|--------------|-----------------------------------|
| POST   | `/tasks`     | Crear una nueva tarea             |
| GET    | `/tasks`     | Listar todas las tareas           |
| GET    | `/tasks/:id` | Obtener una tarea por su ID       |
| PUT    | `/tasks/:id` | Actualizar una tarea existente    |
| DELETE | `/tasks/:id` | Eliminar una tarea                |

 - En el archivo todolist.jsx está la parte de Front-End, hecha con React.js, y también la conexión entre el Front y los endpoints. 
 - En index.css están todos los estilos usados en el componente de React.js. 


## Cómo ejecutar el proyecto

Primero, asegúrate de estar en la raíz del proyecto cuando se ejecuten los comandos. 

1. Clonar el repositorio

    - git clone https://github.com/ibatllemola/to-do-list/
   

    Para asegurarnos que trabajamos en la carpeta adecuada ejecutamos:

    - cd to-do-list


3. Crear y activar entorno virtual para aislar las dependencias

    `Windows`: 

    - python -m venv venv
   
    - .\venv\Scripts\Activate.ps1


    `macOS y Linux`:

    - python3 -m venv venv

    - source venv/bin/activate


5. Instalar dependencias de Python

    - pip install -r src/requirements.txt


6. Ejecutar el servidor del Back-End

    - python src/app.py


    Asegurarse que flask y CORS están instalados, sino ejecutar:

    - pip install flask

    - pip install flask-cors


    El servidor estará en el puerto http://127.0.0.1:3245 por defecto


7. En otro terminal ejecutar el Front-End, asegurándonos que estamos en la carpeta adecuada antes

    npm install

    npm run dev

    En el navegador abre la URL que se indique en la consola, seguramente será http://localhost:3000 o http://localhost:5173 
