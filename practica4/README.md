PASOS PARA EJECUTAR
Para empezar, clonar el repositorio de GitHub con el siguiente comando:
git clone https://github.com/africasg/PracticasFrontEnd.git
Entrar en la carpeta de la práctica:

cd PracticasFrontEnd
cd practica4

Instalar las dependencias:
npm install
Ejecutar:
npm run dev

También se puede abrir buscando http://localhost:3000 en el navegador

ESTRUCTURACIÓN DEL CÓDIGO
Comenzaré explicando la estructura del proyecto.
Dentro de la carpeta src se encuentra la carpeta app, que es la estructura principal del proyecto al utilizar Next.js con App Router.
Dentro de app se encuentran varios elementos importantes:
components:
BarraNaveg.tsx
Post.tsx
CrearPost.tsx
Comentarios.tsx
sus respectivos CSS
lib:
api.ts
auth.ts
rutas principales:
page.tsx ->  página principal (home)
login/page.tsx -> login y registro
post/[id]/page.tsx ->  detalle del post
profile/[id]/page.tsx ->  perfil de usuario
otros archivos:
layout.tsx -> layout general con barra de navegación
globals.css ->  estilos globales
proxy.ts -> control de autenticación

COMPONENTS
Dentro de components he creado varios componentes que estructuran la aplicación:
BarraNaveg
Este componente se encarga de la navegación principal. Incluye enlaces a Home y Perfil, además de un botón de logout que elimina el token de las cookies y redirige al login

Post
Representa cada publicación. Recibe el post como prop y muestra:
username
contenido
fecha
botones de like y retweet
También permite navegar al detalle del post

CrearPost
Permite crear un nuevo post desde la página principal
Utiliza un formulario con estado y tras publicar recarga los posts

Comentarios
Se encarga de mostrar los comentarios de un post y permitir añadir nuevos
Hace peticiones a la API para obtener y enviar comentarios

PÁGINA PRINCIPAL
El archivo page.tsx corresponde a la home.
En esta página:

se cargan los posts usando la API (/home)
se implementa paginación
se permite crear nuevos posts
cada post tiene botones de like y retweet
al hacer click se accede al detalle
Se utiliza useEffect para cargar los posts cuando cambia la página.

DETALLE DEL POST
Ruta: post/[id]
Esta pagina muestra:
contenido del post
autor
fecha
likes y retweets
comentarios
También permite:
dar like
hacer retweet
comentar
El id se obtiene con useParams().

PERFIL
Ruta: profile/[id]
Esta pagina muestra:
username
bio
lista de posts del usuario
Si el id es "me", se obtiene el usuario con /users/me.
Los posts se obtienen desde /home y se filtran por el id del autor.

LOGIN Y REGISTRO
Ruta: login/page.tsx
Esta página permite:
iniciar sesión
registrarse
Incluye:
formulario (login/register)
cambio de modo sin recargar la pagina comleta
guardado del token en cookies

Al autenticarse correctamente:
se guarda el token
se redirige a la home

LIB/API
Dentro de lib/api se encuentran las funciones para interactuar con la API.
Se incluye:
fetchAPI → función genérica
login
register
getPosts
createPost
likePost
retweetPost
Todas las peticiones incluyen:
header x-nombre (africa)
Authorization con Bearer token
También se controla:
expiración del token -> redirección a login
PROXY
El archivo proxy.ts se encarga de proteger rutas:
si no hay token -> redirige a /login
si hay token y se intenta entrar a /login -> redirige a /
Esto evita accesos no autorizados.

ESTILOS
Se han utilizado archivos CSS separados para cada componente y página.
Se ha seguido un estilo similar a Twitter:
tarjetas con bordes suaves
botones redondeados
colores azules para acciones
diseño centrado
PROBLEMAS
Uno de los principales problemas fue trabajar con la API, ya que algunos endpoints no funcionaban como esperaba, especialmente los relacionados con los usuarios y sus posts.
También hubo errores con:
ids undefined en las rutas
diferencias entre _id y id
estructura de respuestas de la API
Otro problema importante fue el proxy de Next.js, ya que al cambiar de middleware a proxy daba errores de exportación y bloqueaba rutas.
Además:
los botones de like y retweet no funcionaban correctamente al principio
el detalle del post no cargaba bien por rutas mal construidas
el perfil no mostraba posts correctamente

Finalmente también hubo dificultades con el diseño, ya que al principio la interfaz era muy básica y hubo que ajustar bastante el CSS para que fuese más parecido a una red social real.
