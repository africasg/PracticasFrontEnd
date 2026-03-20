PASOS PARA EJECUTAR
Para empezar, clonar el repositorio de GitHub con el siguiente comando:
git clone https://github.com/africasg/PracticasFrontEnd.git
Entrar en la carpeta de la práctica:
cd PracticasFrontEnd
cd practica2
Instalar las dependencias:
npm install
Ejecutar:
npm run dev
También se puede abrir buscando http://localhost:3000 en el navegador

---
ESTRUCTURACIÓN DEL CÓDIGO
Comenzaré explicando la estructura del proyecto.
Dentro de la carpeta src se encuentra la carpeta app, que es la estructura principal del proyecto al utilizar Next.js con App Router.
Dentro de app se encuentran varios archivos importantes:
components:
-ProductCard
product.css
page.tsx
-ProductGrid  
page.tsx 
page.css
-ElementosDeLaInterfaz  
page.tsx 
page.css
-DatosAdicionales  
page.tsx 
page.css 
-SectionContainer
page.tsx 
page.css
-Header
page.tsx 
page.css
-ContadorResultados 
page.tsx 
page.css

types
product.ts
index.ts

La ruta dinámica -> product/id
page.tsx 
page.css

lib 
allProducts.ts
axios.ts
productById.ts

Además de archivos propios de Next como:
layout.tsx
page.tsx
globals.css

---
COMPONENTS
Dentro de components he creado varios componentes que estructuran la aplicación:
ProductCard
Este componente se encarga de representar cada producto en forma de tarjeta.
Recibe como parámetros:
product (opcional) -> objeto con la información del producto
id (opcional) -> identificador del producto
Si el producto ya se recibe como prop, el componente lo utiliza directamente.
En caso contrario, se realiza una petición a la API utilizando .get para obtener el producto por su id.
Para ello utilizo useEffect, que se ejecuta cuando cambia el id.
Dentro de este efecto se llama a la API y se guarda el resultado en un estado (useState).

Dentro del componente se muestran:
la imagen
el título
la categoría
el precio

Además, la tarjeta incluye un botón "Ver detalles", que utiliza el router de Next.js para navegar a la página dinámica del producto:
/product/[id]

ProductGrid
Este componente se encarga de mostrar todos los productos.
Recibe un array de productos y utiliza map() para renderizar un ProductCard por cada uno.

RUTA DINÁMICA product/[id]
Dentro de esta ruta se encuentra la página de detalle del producto.
El archivo contiene el componente ProductoDetalle, que es el encargado de mostrar los datos de un producto específico.
Para obtener el id utilizo useParams() de Next.js.
Obtención de datos
Para obtener la información del producto utilizo una función que realiza una petición a la API:
https://dummyjson.com/products
Dentro del componente utilizo useEffect para realizar la llamada cuando cambia el id.

He creado tres estados:
product -> guarda la información del producto
loading -> indica si los datos están cargando
error -> guarda el mensaje de error

Renderizado condicional
Si loading es true, se muestra "Loading..."
Si hay error, se muestra el mensaje correspondiente
Cuando los datos se cargan correctamente, se muestran los datos del producto

ElementosDeLaInterfaz
Este componente se encarga de mostrar las imágenes del producto.
Se utiliza un estado para controlar qué imagen se está mostrando.
Incluye botones para cambiar entre imágenes.

DatosAdicionales
Este componente muestra información adicional del producto como:
descripción
marca
rating
stock
precio
También incluye un botón para volver atrás utilizando router.back().

TYPES
Dentro de la carpeta types se encuentra el tipo Product, que define la estructura de los datos obtenidos desde la API.
Esto permite trabajar con TypeScript de forma segura y evitar errores.

LIB/API
Dentro de lib/api se encuentran las funciones encargadas de hacer las peticiones a la API.
Se utiliza fetch para obtener los productos desde:
https://dummyjson.com/products

PAGE PRINCIPAL
El archivo page.tsx dentro de app corresponde a la página principal.
En esta página se obtienen todos los productos y se recorren utilizando map() para generar un ProductCard por cada uno.

ESTILOS
Se han utilizado archivos CSS separados para cada componente.


PROBLEMAS
Uno de los principales problemas fue estructurar correctamente los componentes y gestionar los datos obtenidos de la API.
También hubo dificultades a la hora de organizar los estilos y conseguir que el diseño fuese como lo quería, más minimalista

Me he basado en el estilo de algunas tiendas online como Sephora.

He utilizado css vistos y utilizados en otros de mis proyectos.