/* =====================================================================
   🎁 CAQUIVIENTO — LOS REGALOS
   ---------------------------------------------------------------------
   Aquí está TODO el contenido del calendario. Puedes editarlo sin tocar
   nada más. Cada regalo es un objeto { ... } dentro de la lista REGALOS.

   CAMPOS COMUNES (todos los tipos):
     dia     → número del 1 al 25 (el día de diciembre en que se abre).
     tipo    → 'vale' | 'invitacion' | 'foto' | 'carta' | 'cancion' | 'video'
     titulo  → título grande del regalo.
     texto   → texto principal. Usa \n\n para separar párrafos.

   CAMPOS SEGÚN EL TIPO (todos opcionales):
     vale        → condiciones: 'letra pequeña del vale'
     invitacion  → fecha: 'Sábado 12 de diciembre', hora: '21:00', lugar: '...'
     foto        → imagen: 'assets/fotos/mi-foto.jpg', pie: 'pie de foto'
     carta       → (solo titulo + texto; el texto puede ser largo)
     cancion     → spotify: 'https://open.spotify.com/track/...'
                   (copia el enlace desde Spotify: Compartir → Copiar enlace)
     video       → video: 'assets/mi-video.mp4'   (vídeo subido al repo)
                   o youtube: 'ID' o la URL completa de YouTube

   COMBINAR: cualquier regalo puede llevar además 'imagen' (+ 'pie'),
   'spotify', 'video' o 'youtube' y se mostrarán debajo. Por ejemplo, una
   carta con una foto, o un vale con una canción.

   IMPORTANTE: respeta las comillas simples '...' y la coma al final de
   cada regalo. Si un texto lleva un apóstrofo, escríbelo así: \'
   ===================================================================== */

const REGALOS = [
  {
    dia: 1,
    tipo: 'vale',
    titulo: 'Vale por una chocolatina',
    texto: 'Escolta, Caquiño: para empezar diciembre con buen pie (y con azúcar). Canjeable al instante, sin colas y sin letra pequeña… bueno, con un poco de letra pequeña.',
    condiciones: 'Tú eliges la chocolatina, yo la pago. Válido durante todo diciembre. No acumulable con los mordiscos que pienso pedirte.'
  },
  {
    dia: 2,
    tipo: 'carta',
    titulo: 'Antes de empezar…',
    texto: 'Querida Caquiñoterrenal:\n\nSi estás leyendo esto es que ya has descubierto que este diciembre viene cargadito. Durante 25 días vas a encontrar aquí un poco de todo: planes, tonterías, recuerdos y alguna que otra sorpresa que me ha costado guardar en secreto (no sabes lo difícil que es para mí).\n\nEscolta! Solo una regla: nada de abrir antes de tiempo. Lo sabré. Siempre lo sé.\n\nTe quiero mucho.'
  },
  {
    dia: 3,
    tipo: 'foto',
    titulo: 'Un recuerdo bonito',
    imagen: 'assets/fotos/ejemplo-1.svg',
    pie: 'Aquí irá una foto nuestra (cámbiala en regalos.js)',
    texto: 'De todas las fotos que tenemos, esta es de mis favoritas. Mírala bien, que tiene historia.'
  },
  {
    dia: 4,
    tipo: 'vale',
    titulo: 'Vale por un masaje de 20 minutos',
    texto: 'Con aceite, música relajante y toda mi dedicación profesional (titulación pendiente).',
    condiciones: 'No incluye quejas si me duermo antes que tú. Ampliable a 30 minutos a cambio de una sonrisa, Al-Caquet.'
  },
  {
    dia: 5,
    tipo: 'cancion',
    titulo: 'Canción del día',
    texto: 'Ponla a todo volumen y baila un poquito, aunque sea en el sofá. Esta me recuerda a ti.',
    spotify: 'https://open.spotify.com/track/0bYg9bo50gSsH3LtXe2SQn'
  },
  {
    dia: 6,
    tipo: 'invitacion',
    titulo: 'Cena a la luz de las velas',
    texto: 'Ponte guapa (más aún, si es posible). Yo me encargo de todo lo demás.',
    fecha: 'Sábado 12 de diciembre',
    hora: '21:00',
    lugar: 'Sorpresa… pero te va a encantar'
  },
  {
    dia: 7,
    tipo: 'vale',
    titulo: 'Vale por elegir la peli',
    texto: 'Tú eliges, yo no protesto. Ni un suspiro, ni un «¿otra vez esta?», ni un «es que la vimos el año pasado». Y si protesto, me dices «tah como ilipollah» y me callo.',
    condiciones: 'Incluye palomitas. No incluye que me mantenga despierto hasta el final.'
  },
  {
    dia: 8,
    tipo: 'foto',
    titulo: 'Mira qué guapos',
    imagen: 'assets/fotos/ejemplo-2.svg',
    pie: 'Nosotros, versión navideña',
    texto: 'Prometo que este año hacemos muchas más fotos así.'
  },
  {
    dia: 9,
    tipo: 'vale',
    titulo: 'Vale por un desayuno en la cama',
    texto: 'Tostadas, zumo, café y lo que te apetezca, Caquet. Servicio de habitaciones a cargo de Diego.',
    condiciones: 'Avisar con un día de antelación para hacer la compra. Las migas en la cama corren de mi cuenta.'
  },
  {
    dia: 10,
    tipo: 'video',
    titulo: 'Un vídeo para hoy',
    texto: 'Dale al play y prepárate para cantar.',
    youtube: 'aAkMkVFwAoo'
  },
  {
    dia: 11,
    tipo: 'invitacion',
    titulo: 'Patinaje sobre hielo',
    texto: 'Yo me caeré, tú te reirás de mí, cagarro, y luego chocolate caliente para recuperarnos.',
    fecha: 'Domingo 13 de diciembre',
    hora: '18:00',
    lugar: 'La pista de hielo de la plaza'
  },
  {
    dia: 12,
    tipo: 'carta',
    titulo: 'A mitad de camino',
    texto: 'Caquiñotérreo mío:\n\nYa vamos por la mitad y quería parar un momento para decirte algo sin bromas (bueno, con pocas): gracias por hacer que los días normales se sientan especiales.\n\nMe encanta tu risa, tu manera de enfadarte cuando tienes hambre y cómo me miras cuando digo una tontería. Este calendario es una excusa para recordarte cada día lo mucho que me importas. Iug, qué empalagoso me ha quedado.\n\nSigue abriendo, que lo mejor está por llegar.'
  },
  {
    dia: 13,
    tipo: 'vale',
    titulo: 'Vale por un abrazo de 5 minutos',
    texto: 'Mínimo cinco minutos. Máximo: los que tú quieras, Caq. Sin mirar el móvil.',
    condiciones: 'Canjeable tantas veces como haga falta. Este vale no caduca nunca. Promete que lo usarás mucho 🤞'
  },
  {
    dia: 14,
    tipo: 'foto',
    titulo: 'Nuestro rincón favorito',
    imagen: 'assets/fotos/ejemplo-3.svg',
    pie: '¿Te acuerdas de este día?',
    texto: 'Hay sitios que se vuelven nuestros sin darnos cuenta.'
  },
  {
    dia: 15,
    tipo: 'invitacion',
    titulo: 'Mercadillo navideño',
    texto: 'Luces, castañas, figuritas para el belén que no necesitamos… y churros con chocolate al final.',
    fecha: 'Viernes 18 de diciembre',
    hora: '19:30',
    lugar: 'Plaza Mayor'
  },
  {
    dia: 16,
    tipo: 'vale',
    titulo: 'Vale por un día sin fregar platos',
    texto: 'Escolta! Hoy los platos son cosa mía. Tú solo tienes que mirar y decirme que lo hago fenomenal.',
    condiciones: 'Incluye recoger la mesa. No incluye que no te pida que me sujetes el móvil mientras friego.'
  },
  {
    dia: 17,
    tipo: 'cancion',
    titulo: 'Otra para la lista',
    texto: 'Un clásico que no puede faltar en diciembre. Prohibido no cantar el estribillo.',
    spotify: 'https://open.spotify.com/track/2FRnf9qhLbvw8fu4IBXx78'
  },
  {
    dia: 18,
    tipo: 'vale',
    titulo: 'Vale por una tarde de manta y peli navideña',
    texto: 'Manta, chocolate caliente y la peli navideña más ñoña que encuentres.',
    condiciones: 'Pijama obligatorio. Calcetines gordos muy recomendados.'
  },
  {
    dia: 19,
    tipo: 'foto',
    titulo: 'Para la nevera',
    imagen: 'assets/fotos/ejemplo-4.svg',
    pie: 'Esta merece imprimirse',
    texto: 'Si quieres, la imprimimos y la ponemos en la nevera con un imán horrible de los que tenemos.'
  },
  {
    dia: 20,
    tipo: 'vale',
    titulo: 'Vale por un «tienes razón»',
    texto: 'Úsalo con sabiduría: en la próxima discusión, sea cual sea el tema, me rendiré con elegancia y diré «tienes razón».',
    condiciones: 'Un solo uso. Diego se reserva el derecho a poner cara de que no está de acuerdo (y a pensar «tah como ilipollah» muy bajito).'
  },
  {
    dia: 21,
    tipo: 'invitacion',
    titulo: 'Escapada sorpresa',
    texto: 'Escolta, Al-Caquet: haz una mochila pequeña. No te puedo contar más. Bueno, sí: va a ser genial.',
    fecha: 'Por confirmar 🤫',
    lugar: 'Secreto de Estado'
  },
  {
    dia: 22,
    tipo: 'vale',
    titulo: 'Vale por tu comida favorita',
    texto: 'Cocino yo tu plato favorito (o lo intento con muchas ganas). Si me sale bien, quiero un «añe-a-se-o!».',
    condiciones: 'Si sale mal, pedimos pizza y hacemos como que no ha pasado nada.',
    spotify: 'https://open.spotify.com/track/0bYg9bo50gSsH3LtXe2SQn'
  },
  {
    dia: 23,
    tipo: 'carta',
    titulo: 'Casi, casi',
    texto: 'Escolta, Caquiño:\n\nYa solo quedan dos días. Espero que este calendario te haya sacado alguna sonrisa cada mañana (o cada noche, si eres de las que lo abren a las 00:00 en punto, que te conozco).\n\nMañana es Nochebuena y pasado… bueno, pasado ya verás.'
  },
  {
    dia: 24,
    tipo: 'carta',
    titulo: 'Feliz Nochebuena',
    texto: 'Esta noche toca cenar mucho, reír más y brindar por todo lo que nos queda por vivir juntos.\n\nMañana a las 00:00 se abre la última casilla. Esa es la más especial de todas.',
    imagen: 'assets/fotos/ejemplo-2.svg',
    pie: 'Nochebuena 2026'
  },
  {
    // 🎄 EL GRAN DÍA — tiene un diseño especial.
    // Sube tu vídeo como assets/video25.mp4 (o usa youtube: 'ID' en su lugar).
    dia: 25,
    tipo: 'video',
    titulo: 'Feliz Navidad, Caqui',
    texto: 'Este es mi regalo más especial: un mensaje solo para ti. Dale al play.',
    video: 'assets/video25.mp4'
  }
];

/* ---------------------------------------------------------------------
   🐣 MOTES de Caqui. Se usan al azar donde ponga {MOTE}
   (en los mensajes de abajo y en el saludo de la pantalla de espera).
   Añade los que quieras.
   --------------------------------------------------------------------- */
const MOTES = [
  'Caqui',
  'Caquiñotérreo',
  'Caquiñoterrenal',
  'Al-Caquet',
  'Caq',
  'Caquet',
  'Caquiño',
  'Cagarro',
  'Anotop'
];

/* ---------------------------------------------------------------------
   💬 Mensajes graciosos al tocar una casilla que aún no toca.
   {N} se sustituye por el número de la casilla y {MOTE} por un mote al azar.
   --------------------------------------------------------------------- */
const MENSAJES_BLOQUEO = [
  'Quieta ahí, {MOTE}. Esto todavía no toca 🙅‍♀️',
  'Escolta! Esta todavía no toca, {MOTE} 🙅‍♀️',
  'Tah como ilipollah, {MOTE}. Que es el día {N} 🙄',
  'Tah como ilipollah si crees que tocándola más se va a abrir 😂',
  '¿Intentando hacer trampa, Al-Caquet? Te estoy viendo 👀',
  'Error 404: regalo todavía sin envolver 🎁',
  'Si la abres antes de tiempo se convierte en un calcetín, cagarro 🧦',
  'Escolta, Caquiñotérreo: los buenos regalos tardan en llegar ✨',
  'Ni con súplicas, Caq. Vuelve el día {N} 😌',
  'Los elfos siguen envolviendo esta. Vuelve el {N} de diciembre, {MOTE} 🧝',
  'Acceso denegado a seres caquiñoterrenales 🔒',
  'Esta casilla está más cerrada que la farmacia un domingo 💊',
  'Papá Noel ha visto eso, Caquet. Te restamos un punto 🎅',
  'Escolta! Que el día {N} llega antes de lo que crees ⏳',
  'Te he dicho que no, Caquiño. Bueno, que todavía no 🤭',
  'Sigue tocando, {MOTE}, que no se va a abrir. Pero me hace gracia 😂',
  'Onichan, que esta todavía no toca 🙅‍♀️',
  'Promete que no la vas a tocar más hasta el día {N} 🤞',
  'Escolta, Anotop: el día {N}. Ni uno antes 😌',
  '¿Quieres abrirla? Añe-a-se-o… pero no 😂'
];

/* ---------------------------------------------------------------------
   ⏳ PANTALLA DEL CONTADOR (antes del 1 de diciembre)
   FRASES_FALTA: la línea bajo el contador, según lo que quede.
     {NOCHES} = noches que faltan, {MOTE} = mote al azar.
   --------------------------------------------------------------------- */
const FRASES_FALTA = {
  variasNoches: 'Quedan {NOCHES} noches, {MOTE} 🌙',
  unaNoche: '¡Mañana empieza, cagarro! Esta noche a las 12 🎁',
  ultimaHora: '¡Ya casi, Caquiño! No te duermas 😴'
};

/* Frases que van rotando cada pocos segundos bajo el contador.
   También pueden llevar {MOTE}. Añade o quita las que quieras. */
const FRASES_ESPERA = [
  'Escolta! Que te quiero mucho, aunque seas una impaciente',
  'Diego está envolviendo cosas a escondidas 🤫',
  'Mirar el contador no hace que vaya más rápido, {MOTE}',
  'Los elfos ya están trabajando para ti 🧝',
  'Hay una cajita con tu nombre esperándote',
  'Tah como ilipollah si crees que te voy a dar pistas 😏',
  'Ve calentando el chocolate, que se acerca diciembre ☕',
  'Escolta, Al-Caquet: 25 sorpresas. Veinticinco.',
  'Vuelve mañana y verás que queda menos 😌',
  'Besos de fresa mientras tanto 🍓',
  'Ni Papá Noel tiene tanta paciencia como tú, {MOTE}',
  'Pon la musiquita y espérate tranquila 🎶',
  'Promete que vendrás cada noche a abrir tu cajita 🤞',
  'Te quiero más que al chocolate caliente… iug 🤭',
  'Onichan, ¿ya has puesto la musiquita? 🎶',
  '¿Has venido a mirar el contador? Añe-a-se-o 👏',
  'Ya queda menos, Anotop ✨'
];

/* ---------------------------------------------------------------------
   🎮 JUEGOS DEL DÍA
   Cada juego sale al entrar SOLO el día de su `fecha` (hora de España),
   se puede jugar las veces que quiera y al ganar se ve el `premio`.
   Tipos: 'atrapa' (atrapar regalos con el saco: objetivo + segundos)
          'memory' (encontrar las 6 parejas: intentos)
   Comodines: {MOTE}, y según el tipo {OBJETIVO} {SEGUNDOS} {PUNTOS}
   {FALTAN} (atrapa) o {INTENTOS} {PAREJAS} (memory).
   En `premio`, una línea en blanco separa párrafos.
   --------------------------------------------------------------------- */
const JUEGOS = [
  {
    fecha: '2026-11-27',
    tipo: 'atrapa',
    objetivo: 20,   // puntos para ganar
    segundos: 30,   // duración de la partida
    titulo: '¡Juego del día! 🎮',
    intro: 'Escolta, {MOTE}: hoy no te libras de jugar. Mueve el saco con el dedo y atrapa {OBJETIVO} regalos en {SEGUNDOS} segundos. Ojo con el carbón, que resta.',
    premioIntro: 'Si ganas, te llevas una pista del día 1 🔑',
    perder: [
      'Tah como ilipollah, {MOTE}. Otra vez 😂',
      'Onichan, casi… ¡otra vez!',
      'Has hecho {PUNTOS}. Te faltan {FALTAN}, no te rindas 💪',
      'Uy, {MOTE}… ¿eso era todo? Venga, otra 😏',
      'Los elfos se están riendo un poco. Demuéstrales quién manda 🧝'
    ],
    ganar: '¡Añe-a-se-o! 🎉 Lo has conseguido, {MOTE}.',
    premioTitulo: 'Tu pista 🔑',
    premio: 'Pista del día 1: vete preparando la espalda y los hombros, que tus contracturas tienen los días contados. Música relajante incluida. Y si te quedas dormida a la mitad, vale: aquí nadie va a ser juzgado 😴💆‍♀️'
  },
  {
    fecha: '2026-11-28',
    tipo: 'memory',
    intentos: 18,   // intentos máximos para encontrar las 6 parejas
    titulo: '¡Juego del día! 🃏',
    intro: 'Escolta, {MOTE}: hoy toca memoria. Encuentra las 6 parejas en {INTENTOS} intentos como mucho.',
    premioIntro: 'Si ganas, te espera una cartita mía 💌',
    perder: [
      'Tah como ilipollah, {MOTE}, ¡si estaba ahí! 😂',
      'Onichan, se te acabaron los intentos… ¡otra vez!',
      'Has encontrado {PAREJAS} de 6. ¡Casi, {MOTE}!',
      'Esa memoria de pez, {MOTE}… venga, otra 🐟',
      'Los elfos dicen que a la próxima sí 🧝'
    ],
    ganar: '¡Añe-a-se-o! 🎉 Qué memoria, {MOTE}.',
    premioTitulo: 'Tu cartita 💌',
    premio: 'Escolta, Andrea.\n\nSi estás leyendo esto, es que tienes mejor memoria que yo. Que no es muy difícil, porque siempre me olvido de todo xd (menos de lo que TÚ CREES).\n\nQuedan solo 3 noches para que empiece esto de verdad y yo estoy más nervioso que tú. Tengo 25 sorpresas para ti. En cada una, algo especial que espero que te guste y demuestre lo mucho que te quiero. Y sí, ha sonado súper cursi, es lo que hay :o\n\nDicho esto, que pases un feliz sábado. Disfruta de las luces en Plasencia y descansa muuuuuucho. Voy a comerme un bombón de Lindor en tu honor. Al rey negro te lo dejo (que sé que te encanta).\n\n¡Hasta la vista, vanguardista!\n— Diego'
  }
];
