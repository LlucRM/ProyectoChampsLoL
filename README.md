En este proyecto practico cosas de REACT como: Crear componentes, usarlos en distintos contextos, usar React Router, handle de funciones, uso de tailwind...

La app muestra todos los campeones del videojuego League of legends pasados directamente por la API de RIOT, mi aplicación gestiona los JSONS recibidos y los transforma en en imágenes y múltiples páginas con descripciones y otras informaciones.

He añadido un pequeño backend en flask para poder insertar en una base de datos MONGODB los personajes que sean seleccionados como favoritos, además, éstos ítems favoritos son mostrados en un carrusel en la pantalla de inicio, en caso de no tener favoritos, la pagina mostrará dos campeones predefinidos.

He actualizado la app para que también añada ítems, ha sido practicante idéntico a mi trabajo anterior con la excepción de una pequeña paridad: La tabla ITEMS de la API oficial de RIOT no cuenta con Id, cosa de la que no me he percatado al instante y me ha hecho perder bastante tiempo
una vez vista la peculiaridad, la he solventado asignando un id a cada ítem leído. 
