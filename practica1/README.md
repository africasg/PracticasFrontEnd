PASOS PARA EJECUTAR 
Para empezar, clonar el repositorio de GitHub con el siguiente comando:
git clone https://github.com/africasg/PracticasFrontEnd.git
Entrar en la carpeta de la practica:
cd PracticasFrontEnd
cd practica1
Instalar las dependencias dentro de practica1:
npm install
Ejecutar :
npm run dev
(Si ahora presionamos "o", vite abrirá directamente el puerto donde se encuentra el proyecto)

ESTRUCTURACIÓN DEL CÓDIGO
Comenzaré explicando la estructura del proyecto.
Dentro de la carpeta src incluí dos carpetas: components y types (además de assets que ya viene por defecto al ejecuar el comando para crear el proyecto base, npm create vite@latest "NombreProyecto")
En estas carpetas generé un componente (folder) para cada uno de los elementos que se pedían; characterCard, characterList, error y loader. Dentro de cada folder incluyo un .tsx (lógica) y un .css (estilos), aunque alguno de estos .css no es obligatorio, ya que heredará el estilo de App.css, esto lo hago para mantener la estructura y por si en un futuro me gustaría añadir estilos individuales.
En la carpeta types simplemente añado el type Character para poder tipar en el resto del proyecto. Este tipo fue creado pasando a ChatGpt los elementos que aparecían de un personaje en la API a utilizar (Star Wars). Con el index.ts de esta carpeta, simplemente exporto el type.

characterCard.tsx se encargará de generar la tarjeta general de cada personale, pasando como params el nombre del personaje, que actuará como key, mientras que el otro param es el personaje en sí.
Genero un container que en su interior tendrá el nombre del personaje, el género y el año de nacimiento

Por otro lado, en characterCard.css le añado los estilos. 
Me gustaba la idea de añadir un hover, aunque esto aún no lo hemos visto en la asignatura. Para ello, utilicé la página https://developer.mozilla.org/es/docs/Web/CSS para saber como se hacía e implementarlo en mi proyecto. Le di estilos a cada uno de los componentes de este container para que se ajustase un poco al estilo de la saga.

characterList.tsx es en resumen una forma de conseguir que aparezcan todos los personajes en pantalla.
Este componente recibe un array de personajes desde App.tsx. Ese array viene tipado como Character[].
Dentro del componente utilizo un .map().
El .map() sirve para recorrer el array de personajes uno por uno.
Por cada personaje que encuentra, crea un componente CharacterCard

Su .css no tiene nada ya que no se le deben implementar css a este componente

error y loader son dos carpetas que funciona de forma idéntica. Para no tneer que hacer los headers en el App.tsx, los hago aquí para poder componetizar al máximo el proyecto
Sus .css tampoco añadí nada, pero sí que se podría añadir estilos en un futuro

Por último, en el App.tsx es donde está toda la lógica del proyecto. 
Los imports son los necesarios para que funcione el proyecto. 
He creado 4 estados (página,characters,loading y error) para que sean cambiantes a lo largo del funcionamiento de la página web.
A su vez, he añadido una mejora que no se pedía específicamente en el proyecto, y esta es la de limitePag, que un  vez que se llegue al último personaje, a través de un alert se avisará de que se ha llegado al fin de los personajes.
Por otro lado, he creado un único efecto (useEffect) el cual modificará los leementos cada vez que la página cambie y la primera vez que se corra el código. Estos componentes que se modificarán son el array de personajes, el error y el loading.
A través de el .get de axios, obtendré la url, la cual cambia cada vez que cambie la página. La paginación de este proyecto se ha hecho de una forma simple pero eficaz, cambiando la url a la que se accede con el número de la página.

Por último, he creado un mainContainer(General) con un header donde se mostrará el título, loading y error
y otro div donde se irán mostrando las diferentes cards de los personajes. En último lugar aparecerá el botoón que nos permitirá seguir viendo personajes hasta llegar al límite.
En App.css se encuentra el estilo de la página. He utilizado display:flex, aunque me gustaría en un futuro cambiar esto a un grid, pero aún no hemos aprendido a utilizarlo. Por otro lado, le pedí a ChatGpt que me modificase el estilo del button y que añadiese el color exacto de Star Wars.

PROBLEMAS: 
No sabía como crear un alert, así que busqué en diferentes foros como hacerlo, así también como buscar en diferentes repositorios de GitHub. Mi profesor tenía un ejemplo subido así que es el que utilicé.
Además, no sabía que se debñia para una key de forma obligatoria, entonces trastée un poco con el proyecto que habíamos realizado en clase parecido a la práctica (Rick y Morty, subido en mi GitHub) y vi que aquello que pasaba como key (el id en ese caso) debía ser algo significativo del perosnaje, así que pasé el nombre. 
Por último, a la hora de hacer el límite con las páginas, opté en primera instancia por hacerlo como un estado, pero al final me pareció más sencillo que simplemente fuese una comprobación y que si se llegaba a cumplir no mostrase un error al uso, si no que mostrase esa alerta.
