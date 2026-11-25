# Uso de Inteligencia Artificial

Este documento declara cómo se usó inteligencia artificial en el proyecto **Pokédex** (Proyecto final de Programación VI): qué herramienta, con qué prompts, qué partes del código se escribieron con su asistencia y por qué cada una está hecha de esa manera, y cuál fue mi trabajo en cada etapa.

La idea de la app, sus funcionalidades y las decisiones de diseño son mías. La IA fue la herramienta que usé para escribir y entender el código de cada paso, del mismo modo que se usa documentación o un tutor.

## Herramienta utilizada

- **Claude** (Anthropic), en la aplicación web claude.ai, en modo chat.
- La usé como asistente para **ordenar el proyecto en fases** y **construirlo paso a paso**. Por cada paso le pedía el código, la explicación de cómo funciona y el mensaje de commit correspondiente.

## Mi rol en el proyecto

- **Idea y alcance:** propuse el tema y las tres secciones de la app: la Pokédex por generaciones, el armado de equipos editable al estilo de Pokémon Showdown (con exportación y debilidades) y la trivia con ruleta y recompensas shiny.
- **Decisiones de diseño:**
  - que la app fuera bilingüe y preguntara el idioma al iniciar, para no dejar afuera a quien no sabe inglés;
  - que la exportación a Showdown saliera siempre en inglés para que funcione;
  - que el shiny no fuera un botón libre sino un premio;
  - las categorías de la trivia y la regla de las 10 respuestas correctas;
  - qué dejar fuera de la primera versión (habilidades y objetos).
- **Requisitos del profesor:** me ocupé de que el proyecto no tuviera elementos deprecados (migración a `provideIonicAngular` y `@if`/`@for`) y de usar servicios para consumir la API.
- **Organización:** dividí el trabajo en fases y establecí la forma de trabajo: un commit por cada cambio, con mensajes descriptivos, para que el proceso quede registrado en GitHub.
- **Integración y pruebas:** integré cada paso al proyecto y lo compilé y probé en el navegador y en el emulador de Android antes de hacer el commit.
- **Depuración:** encontré y resolví los errores que aparecieron (de compilación, de rutas, de detección de cambios y de la configuración de Android). El detalle está al final de este documento.
- **Android y entrega:** configuré Android Studio, generé la plataforma Android con Capacitor, saqué las capturas en el emulador y publiqué el APK.

## Forma de trabajo

1. Antes de escribir código definí todo el alcance de la app: Pokédex, Equipo y Trivia.
2. Construí el proyecto por fases. En cada paso la IA proponía el código y explicaba qué hacía y por qué. Cuando algo no me quedaba claro, le preguntaba hasta entenderlo.
3. Integré cada paso al proyecto y lo probé con `npm run build` e `ionic serve`. Cuando aparecía un error, lo investigaba (consola, DevTools, mensajes de compilación) y lo resolvía, a veces con ayuda de la IA.
4. Subí cada cambio en un commit propio con mensajes en formato *conventional commits* (`feat:`, `fix:`, `docs:`…). El historial de GitHub muestra el proceso completo.
5. Las decisiones de diseño fueron mías: cuando había varias opciones, la IA me las presentaba y yo elegía.

---

## Prompts principales

Los prompts están copiados tal como los escribí, sin corregir la ortografía. Las confirmaciones cortas ("listo", "continuemos") se omiten.

### Fases 0, 1 y 2: planificación, proyecto base, Pokédex por generaciones y detalle

Fases 0, 1 y 2: planificación, proyecto base y Pokédex
1. Te proporcioné el enunciado del trabajo práctico y el contexto del proyecto. Elegí desarrollar una Pokédex. Ten en cuenta que el profesor exige utilizar servicios de Angular para consumir la API.
2. Antes de comenzar a programar, quiero estructurar el proyecto. Mi idea es incluir una Pokédex organizada por generaciones, un editor de equipos similar a Pokémon Showdown que permita modificar ataques, EVs, IVs y naturalezas, y una trivia con ruleta de preguntas sobre Pokémon. ¿Qué otras funcionalidades podrían complementar estas ideas?
3. Prefiero que la opción shiny no esté disponible libremente, sino que funcione como recompensa por responder correctamente las preguntas de la trivia, dependiendo de la dificultad.
4. Todavía no quiero comenzar con el código. Primero quiero definir el alcance y organizar las etapas del desarrollo. Para la trivia, prefiero que las recompensas se entreguen después de completar las diez preguntas.
5. ¿Es posible guardar varios equipos Pokémon y exportarlos en formato compatible con Showdown? También me gustaría consultar las debilidades y resistencias que resultan de combinar dos tipos diferentes.
6. Recapitulemos el alcance: una Pokédex por generaciones, un sistema de equipos con edición de movimientos y estadísticas, almacenamiento, exportación a Showdown y análisis de debilidades, además de una trivia con ruleta. Por el momento, dejaremos fuera los objetos competitivos y las habilidades.
7. Quiero desarrollar el proyecto siguiendo un orden lógico desde el principio. Me preocupa que los nombres en inglés dificulten el uso de la aplicación para usuarios hispanohablantes. ¿Cómo podríamos resolver la traducción y mantener la compatibilidad con Showdown? Explícame también cómo trabajaremos con el README, las capturas, el archivo IA.md y la compilación final.
8. Quiero registrar cada cambio relevante mediante un commit descriptivo para que el historial de GitHub refleje el proceso de desarrollo. Al finalizar, recopila los prompts reales de cada fase sin inventar solicitudes.
9. Guíame desde cero, indicando qué comandos debo ejecutar, qué archivos debo modificar y dónde realizar cada cambio. Te proporciono el repositorio de GitHub como contexto.
10. ¿Qué archivos de entorno debo conservar y en cuáles debo agregar la configuración de PokéAPI? Al compilar aparece el error TS2339: Property 'pokeApiUrl' does not exist on type '{ production: boolean; }'. Te adjunto el contenido de los archivos de entorno para revisar el problema.
11. Después de realizar los cambios, la aplicación muestra problemas en la distribución de las pestañas y posteriormente una pantalla en blanco. Te adjunto capturas, el contenido de tab1.module.ts y el error NG0201: No provider found for ModalController para identificar la causa.
12. Detecté advertencias sobre módulos deprecados en la consola del navegador. El profesor indicó que no debemos utilizar elementos deprecados. ¿Cómo podemos actualizar la implementación antes de continuar? Te adjunto el contenido de tab1.page.ts para revisar los cambios.
13. ¿Puedes analizar el estado actual de mi repositorio y revisar el avance del proyecto antes de continuar?
Fase 2.5: internacionalización y Fase 3: equipos
14. Continúa el desarrollo teniendo en cuenta el contexto, el resumen del proyecto y el repositorio que te proporcioné.
15. Quiero que la aplicación solicite el idioma al iniciarse y adapte la interfaz a la elección del usuario. Si se selecciona español, el texto destinado a importar equipos en Showdown debe mantenerse en un idioma compatible con esa plataforma.
16. Antes de aplicar los cambios, revisa el script scripts/generar-nombres.mjs que ya existe en mi repositorio. ¿Es adecuada la modificación propuesta? Te adjunto el código para verificarlo.
17. Indícame los cambios en orden y proporciona los comandos de Git correspondientes después de completar cada modificación, utilizando mensajes descriptivos en formato conventional commits.
18. Necesito confirmar dónde importar IonIcon en tab1.module.ts y si debo reemplazar completamente el contenido de pokemon.model.ts con la implementación propuesta.
19. Al compilar aparece el error NG5002: Unexpected closing tag "ion-tab-bar". ¿Cómo puedo corregir la estructura de la plantilla?
20. El modal de detalle permanece demasiado tiempo en estado de carga. Te adjunto capturas de la aplicación y de la pestaña Network de DevTools. Al consultar directamente PokéAPI, obtengo la respuesta de inmediato. ¿Cuál podría ser la causa?
21. Tengo un error en la importación de EditorEquipoPage dentro de editor-equipo-routing.module.ts. Te adjunto una captura del editor para identificar el problema.

Fase 4: trivia y fichas shiny
22. Para la trivia, elijo un sistema de fichas shiny que puedan utilizarse en el editor de Pokémon. Las categorías serán «¿Quién es ese Pokémon?», «Tipos» y «Generación». En todas las dificultades se deberán responder correctamente las diez preguntas para obtener las recompensas.
23. Prefiero completar el archivo IA.md al finalizar todo el desarrollo. Continuemos con la implementación de la trivia y su integración con el editor de equipos.
24. ¿En qué parte de editor-miembro.component.html debo incorporar el toggle shiny y cómo debo importar IonToggle en editor-equipo.module.ts?
Fase 5: Android, APK y documentación
25. Me recomendaron obtener las capturas de la aplicación desde Android Studio. Guíame paso a paso para configurar el entorno y realizar las capturas desde el emulador.
26. Durante la configuración de Android Studio aparecen avisos relacionados con Gradle JVM y la confianza del proyecto. También obtengo el error Your project path contains non-ASCII characters. This will most likely cause the build to fail on Windows. ¿Cómo debo proceder?
27. Prefiero generar primero el APK y dejar la recopilación de los prompts y la documentación para el final.
28. Elabora el archivo IA.md a partir de las conversaciones del proyecto, explicando y justificando las partes del código desarrolladas con asistencia de inteligencia artificial.
---

## Código generado con IA y justificación de cada parte

Salvo que se indique otra cosa, el código de estos archivos se escribió **con asistencia de Claude**, a partir de mis pedidos y de las funcionalidades que definí. Antes de cada commit lo revisé, lo integré, lo compilé y lo probé.

### Configuración y arranque

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `src/environments/environment*.ts` | Guardan las URLs de PokéAPI, de los sprites y de los archivos de nombres (`nombresEsUrl`, `nombresEnUrl`). | La consigna pide la URL de cada fuente de datos en `environments`. Se completaron todos los archivos de entorno, incluido `environment.ci.ts`, para que compile en cualquier configuración. |
| `src/app/app.module.ts` | Arranca la app con `provideIonicAngular()`, `provideHttpClient()` e `IonicRouteStrategy`. | El profesor pidió no usar elementos deprecados, así que se reemplazó `IonicModule` por `provideIonicAngular`. Cada página importa solo los componentes de Ionic que usa. |
| `src/app/app.component.ts` | La primera vez que se abre la app, pregunta el idioma. | El idioma tiene que elegirse antes de mostrar cualquier texto, por eso se pregunta desde el componente raíz. |
| `src/index.html` | Título de la pestaña: "Pokédex". | Reemplaza el "Ionic App" de la plantilla. |
| `capacitor.config.ts` | `appId: com.mateo.pokedex`, `appName: Pokédex`. | Android necesita un identificador único; el de la plantilla (`io.ionic.starter`) no sirve para una app propia. |

### Navegación

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `tabs/tabs.page.*` | Barra con 3 pestañas (Pokédex, Equipo, Trivia), con íconos registrados con `addIcons`. | La consigna pide 3 pestañas renombradas con íconos propios. Las etiquetas usan el pipe `t` para traducirse. |
| `tab2/tab2-routing.module.ts` | Agrega la ruta `equipo/:id` con carga diferida (`loadChildren`). | El editor es una página aparte dentro de la pestaña Equipo; el `:id` indica qué equipo abrir. La carga diferida evita cargar el editor hasta que se usa. |

### Idiomas (i18n)

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `i18n/textos.ts` | Diccionario de textos de la interfaz en español (`es`) e inglés (`en`). | El inglés está tipado como `Record<ClaveTexto, string>`: si falta traducir un texto, `npm run build` falla y avisa qué clave falta. |
| `services/idioma.service.ts` | Guarda el idioma en `localStorage`, traduce con `t()` y muestra la alerta para elegir idioma (`elegir()`). | Centraliza el idioma en un solo servicio. `ApplicationRef.tick()` redibuja la app al cambiar de idioma, porque la app no usa zone.js (ver *Decisiones técnicas*). |
| `pipes/traducir.pipe.ts` | Pipe `t` para traducir en las plantillas: `{{ 'clave' \| t }}`. | Es `pure: false` para que la pantalla se actualice al instante cuando cambia el idioma. Es standalone (el valor por defecto en Angular 22) y se importa en cada módulo. |

### Modelos

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `models/pokemon.model.ts` | Interfaces `PokemonItem`, `StatBase` y `PokemonDetalle`. | Tipan los datos que devuelve PokéAPI ya transformados, para no usar `any` en las páginas. `PokemonDetalle` incluye `ataques` porque el editor solo debe ofrecer los que el Pokémon puede aprender. |
| `models/equipo.model.ts` | `Equipo`, `MiembroEquipo`, `Stats` y los límites (`MAX_EV = 252`, `MAX_EVS_TOTAL = 510`, `MAX_IV = 31`, `MAX_MIEMBROS = 6`). | Los límites son las reglas reales de Pokémon; tenerlos como constantes evita números sueltos en el código. Naturalezas y ataques se guardan con su clave en inglés, que sirve para traducirlos y para exportar a Showdown. |
| `models/trivia.model.ts` | Dificultades, categorías, `Pregunta` y `FIN_GENERACION`. | Cada dificultad define qué Pokémon pueden aparecer, cuántas opciones hay y cuántas fichas se ganan, así cambiar una regla es cambiar un número. `FIN_GENERACION` permite calcular la generación con el número de Pokédex. |

### Servicios

Todos usan `@Injectable({ providedIn: 'root' })` y reciben sus dependencias por constructor, como pide la consigna.

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `services/pokemon.service.ts` | Consume PokéAPI: `getGeneracion()`, `getTodos()` y `getDetalle()`. | Es el servicio principal de la fuente de datos. Transforma las respuestas con `map` y guarda caché en memoria, para no repetir pedidos al cambiar de generación o abrir otra vez un Pokémon. `aItems()` evita repetir el código que arma las listas. |
| `services/nombres.service.ts` | Carga `nombres-es.json` y `nombres-en.json` y traduce tipos, naturalezas y ataques. | Carga los dos idiomas a la vez: cambiar de idioma es instantáneo y la exportación a Showdown siempre tiene el inglés disponible. `shareReplay(1)` evita cargar los archivos más de una vez. |
| `services/tipos.service.ts` | Carga la tabla de tipos de PokéAPI y calcula multiplicadores, efectividades y el resumen de debilidades de un equipo. | `multiplicador()` multiplica el efecto sobre cada tipo del defensor; por eso funciona con Pokémon de dos tipos (por ejemplo, Charizard recibe ×4 de Roca). El detalle, las debilidades del equipo y la trivia usan la misma función. |
| `services/equipo.service.ts` | Crea, lista, guarda y borra equipos en `localStorage`; crea miembros con valores por defecto; devuelve la imagen normal o shiny. | `localStorage` no requiere instalar nada y alcanza para guardar los equipos en el dispositivo. El `try/catch` evita que la app falle si el dato guardado está corrupto. |
| `services/showdown.service.ts` | Genera el texto del equipo en formato Pokémon Showdown, o una versión traducida al español. | Showdown solo importa nombres en inglés, por eso la versión para importar siempre usa `naturalezaShowdown` y `ataqueShowdown`. Como en el formato oficial, omite el nivel 100, los EVs en 0 y los IVs en 31. |
| `services/fichas.service.ts` | Guarda la cantidad de fichas shiny y permite sumarlas, gastarlas y devolverlas. | Separar las fichas en su propio servicio deja que la Trivia (que las da) y el Equipo (que las gasta) compartan el mismo dato sin depender uno del otro. |
| `services/trivia.service.ts` | Genera preguntas a partir de datos de PokéAPI y calcula la recompensa. | Las preguntas se generan con datos reales, así no hace falta escribirlas a mano y salen traducidas solas. `mezclar()` (algoritmo de Fisher-Yates) desordena las opciones. Las preguntas de Generación usan todas las generaciones, porque en Fácil (solo Gen I) la respuesta sería siempre la misma. |

### Componentes (modales)

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `components/detalle-pokemon/` | Modal con imagen, tipos, stats con `ion-progress-bar`, debilidades, resistencias e inmunidades. | Usa `forkJoin` para esperar a la vez el detalle, los tipos y los nombres. Muestra `ion-skeleton-text` mientras carga y un mensaje con Reintentar si falla, como pide la consigna. |
| `components/selector-pokemon/` | Modal con buscador para elegir un Pokémon de cualquier generación. | Devuelve el Pokémon elegido con `modalCtrl.dismiss(pokemon, 'elegido')`. Muestra 40 resultados por vez con `ion-infinite-scroll` para no dibujar más de mil elementos juntos. |
| `components/editor-miembro/` | Modal para editar nivel, naturaleza, shiny, 4 ataques, EVs e IVs, en secciones con `ion-accordion`. | Edita una copia del Pokémon: si se cancela, el original no cambia. Controla las reglas del juego: EVs con tope de 252 por stat y 510 en total, IVs entre 0 y 31, y ataques sin repetir. El toggle shiny solo se habilita si hay fichas o si el Pokémon ya era shiny. |
| `components/exportar-equipo/` | Modal con el texto de Showdown en un `ion-textarea` y botón Copiar. | Copia con `navigator.clipboard` y avisa con un `ion-toast`. El selector Showdown / Español solo se muestra si la app está en español, porque en inglés las dos versiones serían iguales. |

### Páginas

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `tab1/` (Pokédex) | Cuadrícula de Pokémon por generación con `ion-segment`, buscador, scroll infinito y botón de idioma. | Carga los datos en `ngOnInit`, como pide la consigna. Si llega la respuesta de una generación anterior después de cambiar de pestaña, se descarta, para no mostrar datos mezclados. |
| `tab2/` (Equipos) | Lista de equipos con miniaturas, crear con `ion-fab` + `ion-alert` y borrar deslizando (`ion-item-sliding`). | Recarga en `ionViewWillEnter` para mostrar los cambios al volver del editor. Al borrar un equipo devuelve las fichas de sus Pokémon shiny. |
| `tab2/editor-equipo/` | Editor de un equipo: agregar con el selector, editar, quitar, renombrar, ver debilidades (`ion-grid`) y exportar. | `refrescar()` recalcula los lugares libres y las debilidades cada vez que cambia el equipo. La ficha shiny se gasta recién al guardar, y se devuelve al desactivar el shiny o al quitar ese Pokémon. |
| `tab3/` (Trivia) | Inicio con dificultad (`ion-radio-group`), ruleta animada, preguntas y resultado. | Primero se sortea la categoría y después se calcula el giro para que caiga en ella; la animación es CSS (`transition` + `conic-gradient`). La silueta es la imagen con `filter: brightness(0)`. Las fichas solo se ganan con 10/10, la regla que elegí. |

### Script y datos locales

| Archivo | Qué hace | Por qué está hecho así |
|---|---|---|
| `scripts/generar-nombres.mjs` | Script de Node que consulta PokéAPI y genera `nombres-es.json` y `nombres-en.json`. | Traducir cerca de mil ataques con un pedido por ataque desde la app sería muy lento. El script se ejecuta una vez y la app solo lee dos archivos locales. Pide de a 20 con reintentos para no saturar la API. Lo modifiqué con ayuda de la IA para que, de la misma respuesta, guardara también el nombre en inglés. |
| `src/assets/data/nombres-*.json` | Nombres de tipos, naturalezas y ataques en español e inglés. | **No son código escrito por la IA:** los genera el script con los datos oficiales de PokéAPI. |

### Archivos que no generó la IA

- **Proyecto base:** creado con `ionic start` (plantilla `tabs`).
- **Carpeta `android/`:** generada por Capacitor con `npx cap add android`.
- **`nombres-es.json` y `nombres-en.json`:** generados por el script.

### Documentación

- **`README.md`:** estructura y textos propuestos por la IA a partir del proyecto; yo completé los datos personales y agregué las capturas.
- **`IA.md`:** este documento, armado con la IA a partir de la conversación y revisado por mí.

---

## Decisiones técnicas importantes

- **NgModules en vez de standalone:** se mantuvo la estructura de la plantilla `tabs` de la materia. Los NgModules siguen siendo válidos en Angular 22; los componentes de Ionic y el pipe `t` son standalone y se importan dentro de los módulos.
- **Sin elementos deprecados:** `IonicModule` se reemplazó por `provideIonicAngular` con componentes importados uno por uno, y `*ngIf`/`*ngFor` por `@if`/`@for` (también se usa `@switch`).
- **App "zoneless" (sin zone.js):** Angular 22 crea los proyectos sin zone.js, así que no detecta solo los cambios hechos dentro de un `subscribe`, un `setTimeout` o el botón de una alerta. Por eso se llama a `ChangeDetectorRef.markForCheck()` después de cargar datos, y a `ApplicationRef.tick()` al cambiar de idioma. Lo detectamos porque el modal de detalle se quedaba en "cargando" aunque los datos ya habían llegado.
- **Un servicio por fuente de datos:** PokéAPI (`PokemonService`, `TiposService`), archivos de nombres (`NombresService`) y almacenamiento local (`EquipoService`, `FichasService`, `IdiomaService`).
- **Exportación a Showdown siempre en inglés:** es el único idioma que reconoce el importador de Showdown. La versión en español es solo para leer.
- **Fichas shiny en vez de un botón libre:** el shiny es una recompensa de la trivia y no se puede activar sin fichas. La ficha se gasta al guardar (no al tocar el toggle), y se devuelve si se quita el shiny, el Pokémon o el equipo, para que nunca se pierda.

---

## Detalle de mis aportes y correcciones

- **Diseño de la app:** definí el alcance (Pokédex por generaciones, varios equipos estilo Showdown con exportación y debilidades, trivia con ruleta) y lo que quedaba fuera de la primera versión (habilidades y objetos).
- **Idiomas:** decidí que la app pregunte el idioma al iniciar, que toda la interfaz se traduzca y que la exportación a Showdown salga siempre en inglés.
- **Trivia:** elegí las categorías, el sistema de fichas y la regla de que solo se gana con las 10 respuestas correctas en todas las dificultades.
- **Script:** revisé el script de nombres modificado antes de ejecutarlo.
- **Errores que resolví:**
  - El error `NG5002` en `tabs.page.html`: faltaba una etiqueta de cierre.
  - `editor-equipo.page.ts` había quedado vacío y daba error en el import; lo completé.
  - Diagnostiqué con DevTools (pestaña Network) y probando PokéAPI directamente que la lentitud no venía de la API sino de la detección de cambios.
- **Android:**
  - Renombré la carpeta del proyecto (`Tp_programaciónVI` → `Tp_programacionVI`), porque Android Gradle no admite tildes en la ruta.
  - Configuré Android Studio para usar Java 21.
  - Creé el emulador, saqué las capturas y generé el APK de debug.
- **Pruebas:** probé cada paso con `npm run build` e `ionic serve`, y la importación de un equipo exportado en Pokémon Showdown (Teambuilder → Import from text).

---

## Declaración

Usé la IA como herramienta de apoyo y lo declaro de forma completa, como pide la consigna. La idea, el diseño y las decisiones del proyecto son míos. Revisé, integré y probé todo el código escrito con asistencia de la IA antes de cada commit. Entiendo cómo funciona cada parte del proyecto y puedo explicarla si el docente lo solicita.