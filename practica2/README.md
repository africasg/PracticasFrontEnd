PASOS PARA EJECUTAR 
Para empezar, clonar el repositorio de GitHub con el siguiente comando:
git clone https://github.com/africasg/PracticasFrontEnd.git
Entrar en la carpeta de la practica:
cd PracticasFrontEnd
cd practica2
Instalar las dependencias dentro de practica1:
npm install
Ejecutar :
npm run dev
(Si ahora presionamos "o", vite abrirá directamente el puerto donde se encuentra el proyecto)
También se puede abrir buscando http://localhost:3000 en el navegador

ESTRUCTURACIÓN DEL CÓDIGO
Comenzaré explicando la estructura del proyecto.
Dentro de la carpeta src se encuentra la carpeta app, que es la estructura principal del proyecto al utilizar Next.js con App Router
Dentro de app se encuentran varios archivos importantes:
components
    countryCard
        country.css
        country.tsx
country/[name]
    page.css
    page.tsx
types
    country.ts
    index.ts
Además de archivos propios de Next como:
layout.tsx
page.tsx
globals.css
favicon.ico

COMPONENTS
Dentro de components he creado el componente que se encarga de representar cada país en forma de tarjeta -> countryCard
Este componente contiene dos archivos:
country.tsx ->  contiene la lógica del componente.
country.css -> contiene los estilos.
El componente CountryByName recibe como parámetros:
name ->  nombre del país.
country (opcional) ->  objeto con la información del país.
Si el país ya se recibe como prop, el componente lo utiliza directamente.
En caso contrario, se realiza una petición a la API utilizando la función getCountryByName.
Para ello utilizo useEffect, que se ejecuta siempre la primera vez y cuando cambia el nombre del país.
Dentro de este efecto se llama a la función que obtiene el país desde la API y posteriormente se guarda en un estado (useState).
De esta forma el componente siempre tendrá disponible la información del país, tanto si se recibe por props como si se obtiene desde la API.
Dentro del componente se muestran algunos datos básicos del país:
la bandera
el nombre
la población
Además, la tarjeta incluye un botón "Ver detalles", que utiliza el router de Next.js para navegar a la página dinámica del país:
/country/[name]
Esto permite acceder a una página con más información sobre ese país.
Los estilos de este componente se encuentran en country.css.

RUTA DINÁMICA country/[name]
Dentro de la carpeta country/[name] se encuentra la página dinámica que muestra la información detallada de cada país.
Esta carpeta contiene:
-page.tsx
-page.css
El archivo page.tsx contiene el componente PaisConcreto, que es el encargado de mostrar los datos de un país específico.
Para obtener el nombre del país utilizo useParams() de Next.js, que permite acceder a los parámetros dinámicos de la URL.
Por ejemplo, si la URL es:
/country/spain -> El parámetro name tendrá el valor "spain".
Obtención de datos
Para obtener la información del país utilizo la función getCountryByName, que se encuentra dentro de:
lib/api/countryByName.ts
Esta función realiza una petición a la API utilizando axios.
Dentro del componente utilizo useEffect, que se ejecuta cuando cambia el nombre del país.
En este efecto se hace la llamada a la API y se guardan los datos del país en un estado (useState).
He creado tres estados:
pais ->  guarda la información del país.
loading ->  indica si los datos están cargando.
miErrorcillo ->  guarda el mensaje de error si ocurre algún problema.
Renderizado condicional
Dependiendo del estado del componente se muestran diferentes elementos en pantalla:
Si loading es true, se muestra el texto:
Loading...
Si ocurre un error, se muestra el mensaje guardado en miErrorcillo.
Cuando los datos se cargan correctamente, se muestran los datos del país.
Información mostrada
Cuando el país está cargado, se muestran varios datos obtenidos de la API:
nombre oficial
bandera
capital
subregión
moneda
idiomas
Para mostrar algunos de estos datos utilizo Object.values(), ya que la API devuelve algunos campos como objetos (currencies y languages)
Botón de volver
Al final de la página se incluye un botón "← Volver".
Este botón utiliza router.back() de Next.js para regresar a la página anterior.

TYPES
Dentro de la carpeta types se encuentran los tipos utilizados en el proyecto.
He creado un tipo llamado Country, que contiene los atributos que devuelve la API de países y que se utilizan dentro del proyecto.
Esto permite tipar correctamente los datos en TypeScript y evitar errores al acceder a propiedades del objeto.
El archivo index.ts simplemente se utiliza para exportar los tipos y poder importarlos de forma más sencilla en el resto del proyecto.

LIB/API
Dentro de lib/api se encuentran las funciones encargadas de hacer las peticiones a la API.
Aquí he creado tres archivos:
-axios.ts
Contiene la configuración de axios, que se utiliza para realizar las peticiones HTTP a la API de países.
-allCountries.ts
Esta función se encarga de obtener todos los países desde la API.
Se utiliza principalmente en la página principal del proyecto para mostrar la lista de países.
-countryByName.ts
Esta función permite obtener la información de un país específico utilizando su nombre.
Se utiliza dentro de la página dinámica country/[name].

PAGE PRINCIPAL
El archivo page.tsx que se encuentra dentro de app corresponde a la página principal del proyecto.
En esta página se obtienen todos los países mediante la función allCountries.
Posteriormente, los países se recorren utilizando un map() para generar un CountryCard por cada país.
Esto permite mostrar todas las tarjetas de países dentro de la página principal.

ESTILOS
country.css para las tarjetas de países.
page.css para la página de detalle del país.
Esto permite mantener una estructura más ordenada y separar la lógica de los estilos.

PROBLEMAS: 
Lo que más problema me dió el como está montada la API, ya que muhcas veces era necesario acceder a un array, (como en capital[0]) así también como el hecho de que languages y currencies eran Object values y no sabía como acceder a ellos. 
Lo discutí con mis compañeros y aunque la forma de arreglarlo quizás no sea la más "bonita", fue la forma que se nos ocurrió 
A la hora de los estilos, me basé en mi trabajo de Cocktails creado en clase