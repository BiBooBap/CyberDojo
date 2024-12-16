const { connect } = require("./db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

async function clearDB() {
  const db = await connect();
  await db.dropDatabase();
  console.log("Database cleared");
}
async function initializeDB() {
  const db = await connect();

  // Collection: user
  await db.createCollection("user", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "username", "password", "role"],
        properties: {
          email: { bsonType: "string", description: "User's email" },
          username: { bsonType: "string", description: "Username" },
          password: { bsonType: "string", description: "Encrypted password" },
          role: { enum: ["user", "admin"], description: "User's role" },
          points: { bsonType: "int", minimum: 0, description: "User's points" },
          avatar: { bsonType: "string", description: "Avatar image" },
          user_title: { bsonType: "string", description: "User title image" },
          border: { bsonType: "string", description: "Border image" },
          enrolled_courses: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["course_id", "lesson_reached"],
              properties: {
                course_id: { bsonType: "int", description: "Course ID" },
                lesson_reached: {
                  bsonType: "string",
                  description: "Name of the lesson reached",
                },
              },
            },
            description:
              "List of courses the user is enrolled in and the lesson reached",
          },
        },
      },
    },
  });

  // Insert real data into the 'user' collection
  const users = [
    {
      email: "giuliarossi@gmail.com",
      username: "giulia123",
      password: "password3",
      role: "user",
      points: 100,
      avatar: "CyberDojo/database/img/base.png",
      user_title: "CyberDojo/database/img/base.png",
      border: "CyberDojo/database/img/base.png",
      enrolled_courses: [
        { course_id: 1, lesson_reached: "Gestione degli errori e debugging" },
        {
          course_id: 2,
          lesson_reached: "Creazione di API RESTful con Node.js",
        },
      ],
    },
    {
      email: "paolomorandi@gmail.com",
      username: "paoloM",
      password: "password8",
      role: "admin",
      points: 1000,
      avatar: "CyberDojo/database/img/admin.png",
      user_title: "CyberDojo/database/img/base.png",
      border: "CyberDojo/database/img/base.png",
      enrolled_courses: [],
    },
    {
      email: "andrealandi@gmail.com",
      username: "andre89",
      password: "password4",
      role: "user",
      points: 200,
      avatar: "CyberDojo/database/img/advanced.png",
      user_title: "CyberDojo/database/img/base.png",
      border: "CyberDojo/database/img/base.png",
      enrolled_courses: [
        { course_id: 4, lesson_reached: "Selettori e proprietà CSS" },
      ],
    },
    {
      email: "mariabianchi@gmail.com",
      username: "mariaB",
      password: "password5",
      role: "user",
      points: 20,
      avatar: "CyberDojo/database/img/newbie.png",
      user_title: "CyberDojo/database/img/base.png",
      border: "CyberDojo/database/img/base.png",
      enrolled_courses: [
        {
          course_id: 1,
          lesson_reached: "Programmazione asincrona in JavaScript",
        },
      ],
    },
    {
      email: "luigiricci@gmail.com",
      username: "luigiR99",
      password: "password6",
      role: "user",
      points: 350,
      avatar: "CyberDojo/database/img/pro.png",
      user_title: "CyberDojo/database/img/base.png",
      border: "CyberDojo/database/img/base.png",
      enrolled_courses: [
        {
          course_id: 2,
          lesson_reached: "Utilizzo di Express.js per la gestione delle route",
        },
      ],
    },
    {
      email: "elisaferrari@gmail.com",
      username: "elisaf90",
      password: "password7",
      role: "user",
      points: 500,
      avatar: "CyberDojo/database/img/expert.png",
      user_title: "CyberDojo/database/img/base.png",
      border: "CyberDojo/database/img/base.png",
      enrolled_courses: [
        { course_id: 3, lesson_reached: "Struttura di una pagina HTML" },
      ],
    },
  ];
  // Hash passwords before inserting them into the database
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  try {
    // Insert into user collection
    await db.collection("user").insertMany(users);
    console.log("User inserted successfully");
  } catch (error) {
    console.error("Error inserting user:", error);
  }

  // Collection: courses
  await db.createCollection("courses", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "name", "description", "difficulty", "lessons"],
        properties: {
          _id: { bsonType: "int", description: "Course ID" },
          name: { bsonType: "string", description: "Course name" },
          description: {
            bsonType: "string",
            description: "Course description",
          },
          difficulty: {
            bsonType: "string",
            description: "Course difficulty (Facile, Medio, Difficile)",
          },
          lessons: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "content"],
              properties: {
                name: { bsonType: "string", description: "Lesson name" },
                content: { bsonType: "string", description: "Lesson content" },
              },
            },
            description: "List of course lessons",
          },
          course_image: { bsonType: "string", description: "Course image" },
        },
      },
    },
  });
  try {
    // Insert real data into the 'courses' collection
    await db.collection("courses").insertMany([
      {
        _id: 1,
        name: "Corso Avanzato di JavaScript",
        description: "Approfondisci le tue conoscenze di JavaScript",
        difficulty: "Difficile",
        lessons: [
          {
            name: "Programmazione asincrona in JavaScript",
            content:
              "La programmazione asincrona permette al tuo programma di fare più cose allo stesso tempo senza bloccarsi.",
          },
          {
            name: "Gestione degli errori e debugging",
            content:
              "La gestione degli errori è il modo in cui il programma riconosce e risponde ai problemi che si presentano mentre funziona.",
          },
          {
            name: "Introduzione agli oggetti in JavaScript",
            content:
              "Gli oggetti sono come scatole che contengono informazioni e funzioni correlate tra loro.",
          },
          {
            name: "Manipolazione del DOM",
            content:
              "Il DOM è una rappresentazione della pagina web che puoi modificare usando JavaScript per cambiare come appare e come funziona.",
          },
          {
            name: "Eventi e ascoltatori",
            content:
              "Gli eventi sono azioni come clic o movimenti del mouse, e gli ascoltatori sono funzioni che rispondono a questi eventi.",
          },
          {
            name: "Array e metodi utili",
            content:
              "Gli array sono liste ordinate di elementi, e i metodi sono strumenti speciali per lavorare con queste liste.",
          },
          {
            name: "Funzioni e scope",
            content:
              "Le funzioni sono blocchi di codice che eseguono compiti specifici, e lo scope determina dove queste funzioni possono vedere e usare le variabili.",
          },
          {
            name: "Introduzione a ES6",
            content:
              "ES6 è una versione aggiornata di JavaScript che introduce nuove funzionalità per rendere il codice più facile e potente.",
          },
          {
            name: "Moduli e import/export",
            content:
              "I moduli permettono di suddividere il codice in parti più piccole e riutilizzabili, facilitando l'organizzazione del progetto.",
          },
          {
            name: "Introduzione a TypeScript",
            content:
              "TypeScript è un linguaggio che estende JavaScript aggiungendo tipi di dati, aiutando a scrivere codice più sicuro e senza errori.",
          },
        ],
        course_image: "/img/courses/javascript.png",
      },

      {
        _id: 2,
        name: "Corso Completo di Node.js",
        description: "Diventa un esperto di Node.js",
        difficulty: "Medio",
        lessons: [
          {
      name: "Creazione di API RESTful con Node.js",
      content:
        "Le API RESTful sono come messaggeri che permettono a diverse applicazioni di parlarsi tra loro usando Node.js.",
    },
    {
      name: "Utilizzo di Express.js per la gestione delle route",
      content:
        "Express.js è un framework che aiuta a organizzare le richieste e le risposte nella tua applicazione Node.js, come segnali stradali che indicano dove andare.",
    },
    {
      name: "Gestione dei Middleware in Express.js",
      content:
        "I middleware sono funzioni speciali in Express.js che possono controllare o modificare le richieste e le risposte, come controllori che gestiscono il traffico.",
    },
    {
      name: "Interazione con Database usando MongoDB",
      content:
        "MongoDB è un tipo di database che memorizza le informazioni in modo organizzato, come un grande armadio con tanti cassetti per diverse cose.",
    },
    {
      name: "Autenticazione e Autorizzazione",
      content:
        "L'autenticazione verifica chi sei, e l'autorizzazione decide cosa puoi fare, come avere una chiave per aprire solo alcune porte.",
    },
    {
      name: "Gestione degli Errori in Node.js",
      content:
        "La gestione degli errori ti aiuta a trovare e risolvere i problemi nel tuo programma, proprio come un meccanico ripara le auto.",
    },
    {
      name: "Utilizzo di Socket.io per la Comunicazione in Tempo Reale",
      content:
        "Socket.io permette alle applicazioni di parlare tra loro subito, come se potessero inviare messaggi istantanei.",
    },
    {
      name: "Deploy di Applicazioni Node.js su Server",
      content:
        "Il deploy significa mettere la tua applicazione Node.js su un server in modo che tutti possano usarla, come mettere un negozio in una strada affollata.",
    },
    {
      name: "Testing e Debugging delle Applicazioni Node.js",
      content:
        "Il testing verifica che tutto funzioni correttamente, e il debugging trova e corregge i problemi, come fare controlli prima di una gara.",
    },
    {
      name: "Ottimizzazione delle Prestazioni in Node.js",
      content:
        "Ottimizzare le prestazioni significa rendere la tua applicazione più veloce ed efficiente, come migliorare un'auto per farla andare più veloce.",
    },
        ],
        course_image: "/img/courses/nodejs.png",
      },

      {
        _id: 3,
        name: "Corso Base di HTML",
        description: "Impara le basi di HTML",
        difficulty: "Facile",
        lessons: [
           {
      name: "Introduzione a HTML",
      content:
        "HTML è un linguaggio che serve per creare le pagine web che vedi su Internet, come i mattoncini per costruire una casa.",
    },
    {
      name: "Struttura di una pagina HTML",
      content:
        "La struttura di una pagina HTML è l'ossatura che organizza i contenuti, come una mappa che mostra dove mettere le stanze in una casa.",
    },
    {
      name: "Tag e Attributi di Base",
      content:
        "I tag sono comandi speciali che dicono al browser come mostrare il contenuto, e gli attributi sono come piccole istruzioni aggiuntive per quei tag.",
    },
    {
      name: "Creare Intestazioni e Paragrafi",
      content:
        "Le intestazioni sono titoli che danno un'idea di cosa parla una sezione, mentre i paragrafi sono blocchi di testo che raccontano informazioni.",
    },
    {
      name: "Liste ordinate e non ordinate",
      content:
        "Le liste sono modi per organizzare elementi in ordine o senza ordine, come una lista della spesa o una serie di passi da seguire.",
    },
    {
      name: "Inserire Immagini e Link",
      content:
        "Immagini rendono le pagine più colorate e interessanti, mentre i link collegano una pagina a un'altra, come porte che ti portano in stanze diverse.",
    },
    {
      name: "Tabelle in HTML",
      content:
        "Le tabelle sono strutture organizzate in righe e colonne che aiutano a mostrare dati in modo ordinato, come una griglia di giochi.",
    },
    {
      name: "Formulari e Input",
      content:
        "I formulari permettono agli utenti di inserire informazioni, come compilare un modulo con il proprio nome e indirizzo.",
    },
    {
      name: "Incorporare Video e Audio",
      content:
        "Puoi aggiungere video e audio alle pagine web per renderle più interattive e divertenti, come ascoltare musica o guardare un film.",
    },
    {
      name: "Semantic HTML",
      content:
        "Semantic HTML usa tag che descrivono meglio il contenuto, aiutando il browser e i motori di ricerca a capire di cosa parla la pagina.",
    },
        ],
        course_image: "/img/courses/basic.png",
      },

      {
        _id: 4,
        name: "Corso Intermedio di CSS",
        description: "Approfondisci le tue conoscenze di CSS",
        difficulty: "Medio",
        lessons: [
          {
            name: "Selettori e proprietà CSS",
            content:
              "I selettori CSS sono come etichette che indicano quali parti della pagina vuoi decorare, e le proprietà sono le caratteristiche che puoi cambiare, come il colore o la dimensione.",
          },
          {
            name: "Layout e design responsivo",
            content:
              "Il layout è la disposizione degli elementi sulla pagina, e il design responsivo fa sì che la pagina si adatti bene a diversi schermi, come un vestito che si adatta a diverse taglie.",
          },
          {
            name: "Box Model di CSS",
            content:
              "Il Box Model è il modo in cui CSS tratta ogni elemento come una scatola con margini, bordi, padding e contenuto al suo interno.",
          },
          {
            name: "Flexbox per l'allineamento",
            content:
              "Flexbox è un sistema di layout che aiuta ad allineare e distribuire gli elementi in modo ordinato e flessibile, come organizzare i giocattoli in una scatola.",
          },
          {
            name: "Grid Layout",
            content:
              "Grid Layout è un metodo di CSS che crea una griglia per posizionare gli elementi in righe e colonne, come un foglio di carta quadrettato.",
          },
          {
            name: "Tipografia in CSS",
            content:
              "La tipografia riguarda come il testo appare sulla pagina, inclusi il tipo di carattere, la dimensione e lo stile.",
          },
          {
            name: "Animazioni e Transizioni",
            content:
              "Le animazioni e le transizioni sono effetti che fanno muovere o cambiare gli elementi della pagina in modo fluido, come un gioco che anima i personaggi.",
          },
          {
            name: "Pseudo-classi e Pseudo-elementi",
            content:
              "Le pseudo-classi e i pseudo-elementi sono come condizioni speciali che applicano stili a elementi in stati particolari, come quando premi un pulsante e cambia colore.",
          },
          {
            name: "Responsive Design con Media Queries",
            content:
              "Le media queries sono regole che dicono a CSS come cambiare lo stile della pagina in base alle dimensioni dello schermo, come adattare un disegno a diverse dimensioni di carta.",
          },
          {
            name: "Preprocessori CSS (Sass)",
            content:
              "I preprocessori CSS, come Sass, sono strumenti che aiutano a scrivere CSS in modo più efficiente, aggiungendo funzionalità avanzate come variabili e funzioni.",
          },
        ],
        course_image: "/img/courses/css.png",
      },
      {
      _id: 5,
       name: "Corso sui Social e la Sicurezza",
      description: "Impara come usare i social in modo sicuro",
       difficulty: "Facile",
       lessons: [
    {
      name: "Introduzione ai Social Media",
      content:
        "I social media sono piattaforme online dove puoi condividere foto, messaggi e connetterti con amici e familiari.",
    },
    {
      name: "Privacy e Impostazioni di Sicurezza",
      content:
        "Le impostazioni di privacy ti aiutano a controllare chi può vedere le tue informazioni e i tuoi post sui social media.",
    },
    {
      name: "Protezione delle Informazioni Personali",
      content:
        "Proteggere le tue informazioni personali significa non condividere dati come il tuo indirizzo o numero di telefono con sconosciuti.",
    },
    {
      name: "Riconoscere le Truffe Online",
      content:
        "Le truffe online sono tentativi di ingannarti per ottenere i tuoi dati o soldi. Imparare a riconoscerle ti aiuta a evitare problemi.",
    },
    {
      name: "Gestire le Password in Modo Sicuro",
      content:
        "Creare password forti e diverse per ogni account ti aiuta a mantenere al sicuro le tue informazioni sui social media.",
    },
    {
      name: "Cyberbullismo e Come Affrontarlo",
      content:
        "Il cyberbullismo è quando qualcuno ti manda messaggi cattivi online. È importante sapere come reagire e chiedere aiuto.",
    },
    {
      name: "Sicurezza delle App di Social Media",
      content:
        "Le app di social media possono avere impostazioni di sicurezza per proteggere il tuo account e le tue informazioni.",
    },
    {
      name: "Proteggere il Tuo Dispositivo",
      content:
        "Mantenere il tuo dispositivo sicuro significa usare antivirus e aggiornare regolarmente il software per evitare attacchi.",
    },
    {
      name: "Norme e Etica sui Social Media",
      content:
        "Seguire le norme e comportarsi in modo etico sui social media aiuta a creare un ambiente positivo per tutti.",
    },
    {
      name: "Monitoraggio e Controllo della Sicurezza",
      content:
        "Monitorare la sicurezza del tuo account significa controllare regolarmente le impostazioni e le attività per assicurarti che tutto sia al sicuro.",
    },
  ],
  course_image: "/img/courses/social_security.png",
},
{
  _id: 6,
  name: "Corso di Cybersecurity",
  description: "Impara come proteggere te stesso e i tuoi dati online",
  difficulty: "Medio",
  lessons: [
    {
      name: "Introduzione alla Cybersecurity",
      content:
        "La cybersecurity riguarda la protezione dei computer e delle informazioni importanti da persone cattive che vogliono rubarle o danneggiarle.",
    },
    {
      name: "Cos'è un Virus Informatico",
      content:
        "Un virus informatico è un programma cattivo che può danneggiare il tuo computer o rubare le tue informazioni, proprio come un virus può farti ammalare.",
    },
    {
      name: "Password Sicure",
      content:
        "Le password sicure sono parole o frasi complesse che proteggono i tuoi account online, come una chiave segreta che solo tu conosci.",
    },
    {
      name: "Phishing e Truffe Online",
      content:
        "Il phishing è un modo in cui i truffatori cercano di ingannarti per farti dare le tue informazioni personali, come se cercassero di convincerti a dare la tua chiave.",
    },
    {
      name: "Proteggere i Tuoi Dispositivi",
      content:
        "Proteggere i tuoi dispositivi significa usare antivirus e aggiornare il software per evitare che i virus entrino e causino problemi.",
    },
    {
      name: "Navigazione Sicura su Internet",
      content:
        "Navigare in modo sicuro significa sapere quali siti sono affidabili e come evitare quelli pericolosi, proprio come scegliere sentieri sicuri in un parco.",
    },
    {
      name: "Backup dei Dati",
      content:
        "Fare il backup dei dati significa salvare copie delle tue informazioni importanti, in modo che non le perda se qualcosa va storto.",
    },
    {
      name: "Reti Wi-Fi Sicure",
      content:
        "Una rete Wi-Fi sicura protegge la tua connessione a Internet da chiunque voglia intercettare le tue informazioni, come una rete protetta da una porta chiusa.",
    },
    {
      name: "Privacy sui Social Media",
      content:
        "Mantenere la tua privacy sui social media significa controllare chi può vedere le tue informazioni e i tuoi post, proteggendo la tua vita privata online.",
    },
    {
      name: "Gestione delle Informazioni Personali",
      content:
        "Gestire le tue informazioni personali significa sapere quali dati condividere online e con chi, mantenendo al sicuro la tua identità.",
    },
  ],
  course_image: "/img/courses/cybersecurity.png",
},
{
  _id: 7,
  name: "Corso di Hardware",
  description: "Scopri le parti fisiche dei computer e come funzionano",
  difficulty: "Facile",
  lessons: [
    {
      name: "Introduzione all'Hardware",
      content:
        "L'hardware sono le parti fisiche di un computer che puoi toccare, come il monitor, la tastiera e il mouse.",
    },
    {
      name: "Componenti Principali del Computer",
      content:
        "I componenti principali includono il processore, la memoria e il disco rigido, che lavorano insieme per far funzionare il computer.",
    },
    {
      name: "Il Processore (CPU)",
      content:
        "Il processore è il cervello del computer che esegue i comandi e fa funzionare tutti i programmi.",
    },
    {
      name: "Memoria RAM",
      content:
        "La memoria RAM è come una scrivania dove il computer tiene le informazioni a cui sta lavorando in questo momento.",
    },
    {
      name: "Disco Rigido e SSD",
      content:
        "Il disco rigido e l'SSD sono i posti dove il computer salva tutti i tuoi file e programmi, proprio come un armadio per i tuoi vestiti.",
    },
    {
      name: "Scheda Madre",
      content:
        "La scheda madre è il grande circuito che collega tutti i componenti del computer, permettendo loro di comunicare tra loro.",
    },
    {
      name: "Scheda Video (GPU)",
      content:
        "La scheda video aiuta a creare le immagini che vedi sullo schermo, rendendo i giochi e i video più belli e veloci.",
    },
    {
      name: "Periferiche di Input",
      content:
        "Le periferiche di input sono dispositivi come tastiere e mouse che ti permettono di dare comandi al computer.",
    },
    {
      name: "Periferiche di Output",
      content:
        "Le periferiche di output sono dispositivi come monitor e stampanti che mostrano le informazioni dal computer a te.",
    },
    {
      name: "Assemblare un Computer",
      content:
        "Assemblare un computer significa mettere insieme tutti i suoi componenti fisici per creare una macchina che funziona.",
    },
  ],
  course_image: "/img/courses/hardware.png",
},
{
  _id: 8,
  name: "Corso sull'Importanza della Privacy",
  description: "Scopri perché la privacy è importante e come proteggerla",
  difficulty: "Medio",
  lessons: [
    {
      name: "Cosa è la Privacy",
      content:
        "La privacy è il diritto di tenere alcune informazioni su di te nascoste dagli altri, come il tuo indirizzo o le tue foto.",
    },
    {
      name: "Perché la Privacy è Importante",
      content:
        "La privacy ti aiuta a sentirti sicuro e protetto online, evitando che persone sconosciute vedano o usino le tue informazioni personali.",
    },
    {
      name: "Dati Personali",
      content:
        "I dati personali sono informazioni che ti riguardano direttamente, come il tuo nome, età, indirizzo e numero di telefono.",
    },
    {
      name: "Rischi della Perdita di Privacy",
      content:
        "Perdere la privacy può portare a problemi come il furto di identità, truffe online e molestie da parte di persone sconosciute.",
    },
    {
      name: "Proteggere le Informazioni Online",
      content:
        "Proteggere le tue informazioni online significa non condividerle con chi non conosci e usare strumenti di sicurezza come le password forti.",
    },
    {
      name: "Impostazioni di Privacy sui Social Media",
      content:
        "Le impostazioni di privacy sui social media ti permettono di controllare chi può vedere i tuoi post, foto e informazioni personali.",
    },
    {
      name: "Come Gestire le Password",
      content:
        "Gestire le password in modo sicuro significa crearne di complesse, cambiarle regolarmente e non condividerle con nessuno.",
    },
    {
      name: "Navigazione Sicura",
      content:
        "Navigare in modo sicuro significa usare siti affidabili, evitare di cliccare su link sospetti e proteggere il tuo dispositivo da virus.",
    },
    {
      name: "Consenso e Condivisione delle Informazioni",
      content:
        "Il consenso significa dare il permesso prima di condividere le tue informazioni con qualcuno, assicurandoti che sia una persona di fiducia.",
    },
    {
      name: "Etica e Privacy",
      content:
        "L'etica riguarda il comportamento corretto online, rispettando la privacy degli altri e trattando le informazioni altrui con cura.",
    },
  ],
  course_image: "/img/courses/privacy.png",
},
{
  _id: 9,
  name: "Corso di Connessioni",
  description: "Scopri come funzionano le connessioni nei computer e in rete",
  difficulty: "Medio",
  lessons: [
    {
      name: "Introduzione alle Connessioni",
      content:
        "Le connessioni sono i ponti che permettono ai computer e ai dispositivi di parlare tra loro e condividere informazioni.",
    },
    {
      name: "Tipi di Connessioni",
      content:
        "Esistono diversi tipi di connessioni, come cablate e wireless, che servono a collegare i dispositivi in modi diversi.",
    },
    {
      name: "Ethernet e Cavi di Rete",
      content:
        "Ethernet usa cavi speciali per collegare i computer e altri dispositivi a una rete, come se fossero fili che portano l'elettricità.",
    },
    {
      name: "Wi-Fi e Connessioni Senza Fili",
      content:
        "Il Wi-Fi permette ai dispositivi di connettersi a Internet senza usare cavi, come se potessero volare segnali nell'aria.",
    },
    {
      name: "Router e Switch",
      content:
        "I router e gli switch sono dispositivi che aiutano a dirigere i dati tra i computer e Internet, come semafori che guidano le auto.",
    },
    {
      name: "Indirizzi IP",
      content:
        "Gli indirizzi IP sono come numeri di telefono per i computer, che li aiutano a trovare e comunicare tra loro su una rete.",
    },
    {
      name: "Modem e Connessione a Internet",
      content:
        "Il modem è un dispositivo che collega la tua casa a Internet, permettendoti di navigare e usare applicazioni online.",
    },
    {
      name: "Sicurezza delle Connessioni",
      content:
        "Proteggere le connessioni significa usare password forti e altre misure per impedire che persone non autorizzate accedano alla tua rete.",
    },
    {
      name: "VPN e Connessioni Sicure",
      content:
        "Una VPN (Virtual Private Network) crea un tunnel sicuro per le tue connessioni, proteggendo i tuoi dati mentre navighi su Internet.",
    },
    {
      name: "Monitoraggio e Risoluzione dei Problemi di Rete",
      content:
        "Monitorare la rete significa controllare che tutto funzioni correttamente, e risolvere i problemi significa trovare e sistemare ciò che non va.",
    },
  ],
  course_image: "/img/courses/connections.png",
},
{
  _id: 10,
  name: "Corso di Programmazione Python",
  description: "Scopri come programmare con Python in modo semplice e divertente",
  difficulty: "Facile",
  lessons: [
    {
      name: "Introduzione a Python",
      content:
        "Python è un linguaggio di programmazione facile da imparare che ti permette di creare giochi, siti web e tanto altro.",
    },
    {
      name: "Installazione e Configurazione",
      content:
        "Imparerai come installare Python sul tuo computer e configurare l'ambiente di lavoro per iniziare a programmare.",
    },
    {
      name: "Sintassi di Base",
      content:
        "Scopri le regole fondamentali di Python, come scrivere correttamente il codice e usare gli spazi.",
    },
    {
      name: "Variabili e Tipi di Dati",
      content:
        "Le variabili sono come contenitori che tengono informazioni, e i tipi di dati sono i diversi tipi di informazioni che puoi usare, come numeri e parole.",
    },
    {
      name: "Operatori e Espressioni",
      content:
        "Gli operatori ti permettono di fare calcoli e confronti, come aggiungere numeri o verificare se qualcosa è vero.",
    },
    {
      name: "Strutture di Controllo: If, Else e Elif",
      content:
        "Le strutture di controllo ti aiutano a prendere decisioni nel tuo programma, come scegliere cosa fare in base a certe condizioni.",
    },
    {
      name: "Cicli: For e While",
      content:
        "I cicli ti permettono di ripetere azioni più volte, come contare fino a dieci o eseguire un compito finché non è fatto.",
    },
    {
      name: "Funzioni",
      content:
        "Le funzioni sono blocchi di codice che fanno un lavoro specifico, rendendo il tuo programma più organizzato e facile da capire.",
    },
    {
      name: "Liste e Dizionari",
      content:
        "Le liste sono come raccolte di elementi ordinati, mentre i dizionari tengono insieme coppie di chiavi e valori, come una rubrica telefonica.",
    },
    {
      name: "Importazione di Moduli",
      content:
        "I moduli sono pezzi di codice pre-scritti che puoi usare nel tuo programma per aggiungere funzionalità senza doverle creare da zero.",
    },
  ],
  course_image: "/img/courses/python.png",
},

    ]);
    console.log("Courses inserted successfully");
  } catch (error) {
    console.error("Error inserting courses:", error);
  }

  // Collection: tests
  await db.createCollection("tests", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "course_id", "questions"],
        properties: {
          _id: { bsonType: "int", description: "Unique ID of the test" },
          course_id: { bsonType: "int", description: "Associated course ID" },
          questions: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["question", "answers", "correct"],
              properties: {
                question: {
                  bsonType: "string",
                  description: "Question text",
                },
                answers: {
                  bsonType: "array",
                  items: { bsonType: "string" },
                  description: "List of possible answers",
                },
                correct: {
                  bsonType: "int",
                  description:
                    "Index of the correct answer in the list of answers",
                },
              },
            },
            description: "List of multiple-choice questions",
          },
        },
      },
    },
  });
  try {
    // Insert real data into the 'tests' collection
    await db.collection("tests").insertMany([
      {
        _id: 1,
        course_id: 1,
        questions: [
          {
            question: "Qual è la differenza tra let e var in JavaScript?",
            answers: [
              "let è block-scoped, var è function-scoped",
              "Non c'è differenza",
              "let è più lento di var"
            ],
            correct: 0
          },
          {
            question: "Cos'è una closure in JavaScript?",
            answers: [
              "Una funzione con scope locale",
              "Una funzione che ricorda lo scope in cui è stata definita",
              "Un metodo statico"
            ],
            correct: 1
          },
          {
            question: "Che cosa rappresenta il DOM in JavaScript?",
            answers: [
              "Una libreria per creare animazioni",
              "La struttura ad albero degli elementi di una pagina web",
              "Un tipo di variabile speciale"
            ],
            correct: 1
          },
          {
            question: "Qual è la differenza tra programmazione sincrona e asincrona?",
            answers: [
              "La programmazione sincrona esegue le operazioni una dopo l'altra, mentre quella asincrona può eseguire più operazioni contemporaneamente",
              "La programmazione sincrona è più veloce",
              "Non c'è differenza"
            ],
            correct: 0
          },
          {
            question: "Che cosa è una Promise in JavaScript?",
            answers: [
              "Una funzione che non restituisce mai un valore",
              "Un oggetto che rappresenta il completamento o il fallimento di un'operazione asincrona",
              "Un tipo di loop"
            ],
            correct: 1
          },
          {
            question: "Qual è lo scopo di async/await in JavaScript?",
            answers: [
              "Creare variabili globali",
              "Gestire operazioni asincrone in modo più semplice e leggibile",
              "Definire funzioni senza parametri"
            ],
            correct: 1
          },
          {
            question: "Quale metodo array restituisce un nuovo array con i risultati della chiamata a una funzione per ogni elemento?",
            answers: [
              "forEach",
              "map",
              "filter"
            ],
            correct: 1
          },
          {
            question: "Cosa determina lo scope di una variabile in JavaScript?",
            answers: [
              "Il tipo di dato della variabile",
              "Dove la variabile è dichiarata nel codice",
              "La dimensione della variabile"
            ],
            correct: 1
          },
          {
            question: "Quale delle seguenti è una nuova funzionalità introdotta con ES6?",
            answers: [
              "var",
              "let",
              "function"
            ],
            correct: 1
          },
          {
            question: "Che cosa fa l'istruzione import in JavaScript?",
            answers: [
              "Esporta un modulo",
              "Importa un modulo per usarlo nel tuo codice",
              "Crea una nuova funzione"
            ],
            correct: 1
          }
        ]
      },

      {
  _id: 2,
  course_id: 2,
  questions: [
    {
      question: "Qual è la differenza tra == e === in JavaScript?",
      answers: [
        "== confronta solo il valore, === confronta valore e tipo",
        "Non c'è differenza",
        "=== è più lento di =="
      ],
      correct: 0
    },
    {
      question: "Come si avvia un server Express?",
      answers: [
        "Con il comando `npm start`",
        "Chiamando `app.listen()`",
        "Con `require('express')`"
      ],
      correct: 1
    },
    {
      question: "Cos'è un middleware in Express.js?",
      answers: [
        "Una funzione che gestisce le richieste e le risposte",
        "Un tipo di database",
        "Un metodo per creare server"
      ],
      correct: 0
    },
    {
      question: "Come si connette a un database MongoDB in Node.js?",
      answers: [
        "Usando `require('mongodb')`",
        "Usando `mongoose.connect()`",
        "Con `app.listen()`"
      ],
      correct: 1
    },
    {
      question: "Che cosa fa `app.use()` in Express.js?",
      answers: [
        "Avvia il server",
        "Aggiunge un middleware alla pipeline delle richieste",
        "Definisce una rotta GET"
      ],
      correct: 1
    },
    {
      question: "Quale metodo HTTP viene utilizzato per creare una nuova risorsa?",
      answers: [
        "GET",
        "POST",
        "DELETE"
      ],
      correct: 1
    },
    {
      question: "Cos'è Socket.io in Node.js?",
      answers: [
        "Un framework per creare API RESTful",
        "Una libreria per la comunicazione in tempo reale",
        "Un database NoSQL"
      ],
      correct: 1
    },
    {
      question: "Quale comando si usa per installare pacchetti in Node.js?",
      answers: [
        "npm install",
        "node install",
        "install npm"
      ],
      correct: 0
    },
    {
      question: "Come si gestiscono gli errori in una Promise?",
      answers: [
        "Usando `.catch()`",
        "Usando `try` e `catch`",
        "Entrambe le opzioni sono corrette"
      ],
      correct: 2
    },
    {
      question: "Quale strumento è comunemente usato per il testing delle applicazioni Node.js?",
      answers: [
        "Mocha",
        "React",
        "Vue.js"
      ],
      correct: 0
    }
  ]
},

{
  _id: 3,
  course_id: 3,
  questions: [
    {
      question: "Cos'è HTML?",
      answers: [
        "Un linguaggio di programmazione",
        "Un linguaggio di markup per creare pagine web",
        "Un software di grafica"
      ],
      correct: 1
    },
    {
      question: "Qual è lo scopo del tag `<head>` in una pagina HTML?",
      answers: [
        "Contenere il contenuto visibile della pagina",
        "Contenere metadati e informazioni non visibili direttamente",
        "Creare un elenco puntato"
      ],
      correct: 1
    },
    {
      question: "Come si crea un collegamento ipertestuale in HTML?",
      answers: [
        "`<link>`",
        "`<a href='url'>Testo</a>`",
        "`<href='url'>Testo</href>`"
      ],
      correct: 1
    },
    {
      question: "Quale tag viene utilizzato per inserire un'immagine in una pagina HTML?",
      answers: [
        "`<image>`",
        "`<img>`",
        "`<picture>`"
      ],
      correct: 1
    },
    {
      question: "Che cosa fa il tag `<ul>` in HTML?",
      answers: [
        "Crea una lista ordinata",
        "Crea una lista non ordinata",
        "Crea una tabella"
      ],
      correct: 1
    },
    {
      question: "Quale attributo è usato per specificare il percorso di un'immagine?",
      answers: [
        "src",
        "href",
        "alt"
      ],
      correct: 0
    },
    {
      question: "Come si definisce un paragrafo in HTML?",
      answers: [
        "`<paragraph>`",
        "`<p>`",
        "`<pg>`"
      ],
      correct: 1
    },
    {
      question: "Quale tag viene utilizzato per creare una tabella in HTML?",
      answers: [
        "`<table>`",
        "`<div>`",
        "`<grid>`"
      ],
      correct: 0
    },
    {
      question: "Che cosa fa l'attributo `alt` nell'elemento `<img>`?",
      answers: [
        "Specifica l'URL dell'immagine",
        "Fornisce un testo alternativo per l'immagine",
        "Definisce la dimensione dell'immagine"
      ],
      correct: 1
    },
    {
      question: "Quale tag HTML viene utilizzato per inserire un video?",
      answers: [
        "`<video>`",
        "`<media>`",
        "`<movie>`"
      ],
      correct: 0
    }
  ]
},
{
  _id: 4,
  course_id: 4,
  questions: [
    {
      question: "Qual è la funzione dei selettori CSS?",
      answers: [
        "Definire lo stile delle proprietà HTML",
        "Selezionare gli elementi HTML da stilizzare",
        "Creare nuove proprietà CSS"
      ],
      correct: 1
    },
    {
      question: "Cos'è il Box Model in CSS?",
      answers: [
        "Un metodo per creare layout flessibili",
        "Una rappresentazione delle dimensioni e degli spazi intorno agli elementi",
        "Un tipo di selettore avanzato"
      ],
      correct: 1
    },
    {
      question: "Quale proprietà Flexbox viene utilizzata per allineare gli elementi verticalmente?",
      answers: [
        "justify-content",
        "align-items",
        "flex-direction"
      ],
      correct: 1
    },
    {
      question: "Come si crea una griglia con CSS Grid Layout?",
      answers: [
        "Usando la proprietà `display: flex`",
        "Usando la proprietà `display: grid`",
        "Usando la proprietà `display: block`"
      ],
      correct: 1
    },
    {
      question: "Quale proprietà CSS viene utilizzata per definire il numero di colonne in una griglia?",
      answers: [
        "grid-template-rows",
        "grid-template-columns",
        "grid-gap"
      ],
      correct: 1
    },
    {
      question: "Che cosa fa la proprietà `font-family` in CSS?",
      answers: [
        "Definisce lo stile del testo (es. grassetto, corsivo)",
        "Specifica il tipo di carattere da utilizzare",
        "Imposta la dimensione del testo"
      ],
      correct: 1
    },
    {
      question: "Quale proprietà viene utilizzata per aggiungere animazioni agli elementi?",
      answers: [
        "transition",
        "animation",
        "transform"
      ],
      correct: 1
    },
    {
      question: "Qual è la differenza tra una pseudo-classe e un pseudo-elemento?",
      answers: [
        "Le pseudo-classi selezionano elementi basati sullo stato, mentre i pseudo-elementi selezionano parti specifiche di un elemento",
        "Non c'è differenza",
        "Le pseudo-classi sono obsolete"
      ],
      correct: 0
    },
    {
      question: "Come si applica uno stile diverso a uno schermo con larghezza massima di 600px?",
      answers: [
        "@media (min-width: 600px) { /* Stili */ }",
        "@media (max-width: 600px) { /* Stili */ }",
        "@media only screen and (width: 600px) { /* Stili */ }"
      ],
      correct: 1
    },
    {
      question: "Quale funzionalità offre Sass che non è presente nel CSS standard?",
      answers: [
        "Selettori avanzati",
        "Variabili e nesting",
        "Supporto per immagini"
      ],
      correct: 1
    }
  ]
},
{
  _id: 5,
  course_id: 5,
  questions: [
    {
      question: "Che cosa sono i social media?",
      answers: [
        "Piattaforme online per condividere contenuti e connettersi con altri",
        "Software per creare grafica",
        "Dispositivi hardware per navigare su Internet"
      ],
      correct: 0
    },
    {
      question: "Qual è lo scopo delle impostazioni di privacy sui social media?",
      answers: [
        "Aumentare la visibilità dei tuoi post",
        "Controllare chi può vedere le tue informazioni e i tuoi contenuti",
        "Cambiare il colore del tuo profilo"
      ],
      correct: 1
    },
    {
      question: "Perché è importante proteggere le informazioni personali online?",
      answers: [
        "Per rendere i tuoi post più interessanti",
        "Per evitare che persone sconosciute accedano ai tuoi dati sensibili",
        "Per aumentare il numero di follower"
      ],
      correct: 1
    },
    {
      question: "Cos'è una truffa online (phishing)?",
      answers: [
        "Un gioco da tavolo",
        "Un tentativo di ingannare le persone per ottenere informazioni personali o denaro",
        "Un tipo di post divertente sui social"
      ],
      correct: 1
    },
    {
      question: "Qual è una buona pratica per gestire le password in modo sicuro?",
      answers: [
        "Usare la stessa password per tutti gli account",
        "Creare password complesse e uniche per ogni account",
        "Condividere le password con amici fidati"
      ],
      correct: 1
    },
    {
      question: "Che cosa è il cyberbullismo?",
      answers: [
        "Un tipo di gioco online",
        "Quando qualcuno manda messaggi cattivi o offensivi attraverso Internet",
        "Un modo per fare nuove amicizie"
      ],
      correct: 1
    },
    {
      question: "Come puoi proteggere le tue app di social media?",
      answers: [
        "Installando aggiornamenti di sicurezza e usando password forti",
        "Disinstallando tutte le app",
        "Condividendo il tuo account con più persone"
      ],
      correct: 0
    },
    {
      question: "Perché è importante proteggere il tuo dispositivo?",
      answers: [
        "Perché rende il dispositivo più veloce",
        "Per impedire che virus e persone non autorizzate accedano ai tuoi dati",
        "Per risparmiare spazio di archiviazione"
      ],
      correct: 1
    },
    {
      question: "Cosa significa seguire le norme e l'etica sui social media?",
      answers: [
        "Postare solo contenuti divertenti",
        "Comportarsi in modo rispettoso e rispettare la privacy degli altri",
        "Usare solo emoji nei post"
      ],
      correct: 1
    },
    {
      question: "Che cosa implica il monitoraggio e il controllo della sicurezza del tuo account?",
      answers: [
        "Ignorare le notifiche di sicurezza",
        "Controllare regolarmente le impostazioni di sicurezza e le attività sospette",
        "Cambiare colore del profilo frequentemente"
      ],
      correct: 1
    }
  ]
},
{
  _id: 6,
  course_id: 6,
  questions: [
    {
      question: "Cos'è la cybersecurity?",
      answers: [
        "La protezione dei computer e delle reti da attacchi malintenzionati",
        "La creazione di siti web",
        "Il design di applicazioni mobili"
      ],
      correct: 0
    },
    {
      question: "Che cos'è un virus informatico?",
      answers: [
        "Un programma che protegge il computer",
        "Un programma malintenzionato che può danneggiare il computer o rubare dati",
        "Un tipo di hardware"
      ],
      correct: 1
    },
    {
      question: "Qual è lo scopo di un firewall?",
      answers: [
        "Aumentare la velocità del computer",
        "Bloccare accessi non autorizzati alla rete",
        "Aggiornare il sistema operativo"
      ],
      correct: 1
    },
    {
      question: "Che cosa significa phishing?",
      answers: [
        "Una tecnica di programmazione",
        "Un tentativo di ingannare le persone per ottenere informazioni personali o denaro",
        "Un tipo di firewall"
      ],
      correct: 1
    },
    {
      question: "Perché è importante usare password forti?",
      answers: [
        "Per rendere più facile ricordarle",
        "Per proteggere gli account da accessi non autorizzati",
        "Per velocizzare il login"
      ],
      correct: 1
    },
    {
      question: "Cos'è una VPN (Virtual Private Network)?",
      answers: [
        "Un tipo di virus",
        "Una rete che crea una connessione sicura e criptata su Internet",
        "Un software per creare grafica"
      ],
      correct: 1
    },
    {
      question: "Quale delle seguenti è una buona pratica per proteggere i dati?",
      answers: [
        "Condividere le password con amici fidati",
        "Effettuare regolarmente il backup dei dati",
        "Ignorare gli aggiornamenti di sicurezza"
      ],
      correct: 1
    },
    {
      question: "Che cosa è il malware?",
      answers: [
        "Un software utile per il computer",
        "Qualsiasi programma dannoso creato per danneggiare o sfruttare un computer",
        "Un tipo di hardware di rete"
      ],
      correct: 1
    },
    {
      question: "Come si può prevenire il cyberbullismo?",
      answers: [
        "Ignorando i messaggi offensivi",
        "Segnalando comportamenti inappropriati e cercando supporto",
        "Condividendo informazioni personali"
      ],
      correct: 1
    },
    {
      question: "Cos'è l'autenticazione a due fattori (2FA)?",
      answers: [
        "Un metodo per creare password più semplici",
        "Un sistema di sicurezza che richiede due forme di identificazione per accedere a un account",
        "Un tipo di antivirus"
      ],
      correct: 1
    }
  ]
},
{
  _id: 7,
  course_id: 7,
  questions: [
    {
      question: "Cos'è l'hardware di un computer?",
      answers: [
        "Il software che esegue programmi",
        "Le parti fisiche del computer che puoi toccare",
        "I dati memorizzati sul computer"
      ],
      correct: 1
    },
    {
      question: "Qual è la funzione del processore (CPU) in un computer?",
      answers: [
        "Memorizzare i dati",
        "Eseguire i comandi e elaborare le informazioni",
        "Mostrare le immagini sullo schermo"
      ],
      correct: 1
    },
    {
      question: "Che cosa fa la memoria RAM?",
      answers: [
        "Salva permanentemente i file",
        "Memorizza temporaneamente le informazioni a cui il computer sta lavorando",
        "Gestisce le connessioni di rete"
      ],
      correct: 1
    },
    {
      question: "Qual è la differenza tra un disco rigido (HDD) e un'unità a stato solido (SSD)?",
      answers: [
        "L'HDD è più veloce dell'SSD",
        "L'SSD utilizza memoria flash e è più veloce dell'HDD",
        "Non c'è differenza"
      ],
      correct: 1
    },
    {
      question: "Che cosa è una scheda madre?",
      answers: [
        "Un componente che produce suoni",
        "Il circuito principale che collega tutti i componenti del computer",
        "Una periferica di input"
      ],
      correct: 1
    },
    {
      question: "Qual è la funzione della scheda video (GPU)?",
      answers: [
        "Gestisce la connessione a Internet",
        "Elabora e crea le immagini che vedi sullo schermo",
        "Memorizza i dati a lungo termine"
      ],
      correct: 1
    },
    {
      question: "Che cosa sono le periferiche di input?",
      answers: [
        "Dispositivi che mostrano le informazioni dal computer",
        "Dispositivi che permettono di dare comandi al computer, come tastiere e mouse",
        "Componenti interni del computer"
      ],
      correct: 1
    },
    {
      question: "Che cosa fanno le periferiche di output?",
      answers: [
        "Permettono di inserire dati nel computer",
        "Mostrano le informazioni elaborate dal computer, come monitor e stampanti",
        "Eliminano i virus dal computer"
      ],
      correct: 1
    },
    {
      question: "Cos'è un alimentatore (PSU) in un computer?",
      answers: [
        "Un componente che fornisce energia elettrica a tutti gli altri componenti",
        "Un dispositivo di archiviazione",
        "Un tipo di scheda di rete"
      ],
      correct: 0
    },
    {
      question: "Che cosa significa assemblare un computer?",
      answers: [
        "Installare il sistema operativo",
        "Montare insieme tutti i componenti hardware per creare un computer funzionante",
        "Aggiornare il software del computer"
      ],
      correct: 1
    }
  ]
},
{
  _id: 8,
  course_id: 8,
  questions: [
    {
      question: "Che cosa è la privacy?",
      answers: [
        "Il diritto di condividere tutte le informazioni con chiunque",
        "Il diritto di tenere alcune informazioni su di te nascoste dagli altri",
        "Un tipo di software per proteggere i computer"
      ],
      correct: 1
    },
    {
      question: "Perché la privacy è importante?",
      answers: [
        "Per rendere più facile trovare amici online",
        "Per proteggere le tue informazioni personali da persone sconosciute",
        "Per aumentare il numero di follower sui social media"
      ],
      correct: 1
    },
    {
      question: "Quali sono esempi di dati personali?",
      answers: [
        "Il tuo nome, indirizzo e numero di telefono",
        "Il colore del tuo zaino",
        "Il tuo cibo preferito"
      ],
      correct: 0
    },
    {
      question: "Cosa può succedere se non proteggi la tua privacy online?",
      answers: [
        "Non succede nulla",
        "Alcune persone potrebbero rubare le tue informazioni personali o molestarti",
        "Il tuo computer diventa più veloce"
      ],
      correct: 1
    },
    {
      question: "Come puoi proteggere le tue informazioni online?",
      answers: [
        "Condividendo tutte le tue informazioni con amici e sconosciuti",
        "Usando password forti e non condividendole",
        "Ignorando le impostazioni di privacy"
      ],
      correct: 1
    },
    {
      question: "Qual è lo scopo delle impostazioni di privacy sui social media?",
      answers: [
        "Aumentare la visibilità dei tuoi post",
        "Controllare chi può vedere le tue informazioni e i tuoi contenuti",
        "Cambiare il colore del tuo profilo"
      ],
      correct: 1
    },
    {
      question: "Cos'è il phishing?",
      answers: [
        "Un gioco online",
        "Un tentativo di ingannare le persone per ottenere informazioni personali o denaro",
        "Un tipo di password"
      ],
      correct: 1
    },
    {
      question: "Che cosa è il cyberbullismo?",
      answers: [
        "Un tipo di gioco online",
        "Quando qualcuno manda messaggi cattivi o offensivi attraverso Internet",
        "Un modo per fare nuove amicizie"
      ],
      correct: 1
    },
    {
      question: "Perché è importante gestire le password in modo sicuro?",
      answers: [
        "Per rendere più facile ricordarle",
        "Per proteggere i tuoi account da accessi non autorizzati",
        "Per velocizzare il login"
      ],
      correct: 1
    },
    {
      question: "Cosa significa il consenso quando si condividono informazioni?",
      answers: [
        "Dare il permesso prima di condividere le tue informazioni con qualcuno",
        "Condividere le tue informazioni con tutti",
        "Ignorare chi ti chiede informazioni"
      ],
      correct: 0
    }
  ]
},
{
  _id: 9,
  course_id: 9,
  questions: [
    {
      question: "Che cosa sono le connessioni in un computer?",
      answers: [
        "I programmi che si eseguono sul computer",
        "I ponti che permettono ai dispositivi di comunicare e condividere informazioni",
        "Le applicazioni installate sul computer"
      ],
      correct: 1
    },
    {
      question: "Quali sono i principali tipi di connessioni?",
      answers: [
        "Cablata e wireless",
        "Solo cablata",
        "Solo wireless"
      ],
      correct: 0
    },
    {
      question: "Cos'è un cavo Ethernet?",
      answers: [
        "Un cavo utilizzato per collegare dispositivi a una rete cablata",
        "Un cavo per alimentare il computer",
        "Un tipo di cavo per ascoltare musica"
      ],
      correct: 0
    },
    {
      question: "Come funziona il Wi-Fi?",
      answers: [
        "Utilizza cavi per trasmettere dati",
        "Trasmette segnali radio per connettere dispositivi a Internet senza fili",
        "Richiede una connessione via satellite"
      ],
      correct: 1
    },
    {
      question: "Qual è la funzione di un router?",
      answers: [
        "Stampa documenti",
        "Dirige il traffico dati tra la rete locale e Internet",
        "Memorizza i file del computer"
      ],
      correct: 1
    },
    {
      question: "Che cosa è un indirizzo IP?",
      answers: [
        "Un numero che identifica un dispositivo su una rete",
        "Un tipo di cavo di rete",
        "Un software antivirus"
      ],
      correct: 0
    },
    {
      question: "Qual è la funzione di un modem?",
      answers: [
        "Connettere il computer a una stampante",
        "Tradurre i segnali digitali del computer in segnali analogici per la connessione a Internet",
        "Gestire la memoria del computer"
      ],
      correct: 1
    },
    {
      question: "Perché è importante la sicurezza delle connessioni?",
      answers: [
        "Per migliorare la velocità della connessione",
        "Per proteggere i dati da accessi non autorizzati e attacchi",
        "Per ridurre il consumo energetico"
      ],
      correct: 1
    },
    {
      question: "Cos'è una VPN (Virtual Private Network)?",
      answers: [
        "Un tipo di cavo di rete",
        "Una rete che crea una connessione sicura e criptata su Internet",
        "Un software per creare grafica"
      ],
      correct: 1
    },
    {
      question: "Che cosa significa monitorare una rete?",
      answers: [
        "Controllare regolarmente le impostazioni e le attività per assicurarsi che tutto funzioni correttamente",
        "Aggiungere nuovi dispositivi alla rete",
        "Cambiare il colore dei cavi di rete"
      ],
      correct: 0
    }
  ]
},
{
  _id: 10,
  course_id: 10,
  questions: [
    {
      question: "Cos'è Python?",
      answers: [
        "Un linguaggio di programmazione ad alto livello",
        "Un sistema operativo",
        "Un tipo di database"
      ],
      correct: 0
    },
    {
      question: "Come si stampa 'Ciao, Mondo!' in Python?",
      answers: [
        "print('Ciao, Mondo!')",
        "echo 'Ciao, Mondo!'",
        "console.log('Ciao, Mondo!')"
      ],
      correct: 0
    },
    {
      question: "Qual è il simbolo utilizzato per i commenti in Python?",
      answers: [
        "//",
        "#",
        "/* */"
      ],
      correct: 1
    },
    {
      question: "Come si dichiara una variabile in Python?",
      answers: [
        "var x = 5",
        "let x = 5",
        "x = 5"
      ],
      correct: 2
    },
    {
      question: "Quale tipo di dato viene utilizzato per memorizzare una sequenza di caratteri?",
      answers: [
        "int",
        "float",
        "str"
      ],
      correct: 2
    },
    {
      question: "Quale struttura di controllo viene utilizzata per eseguire un blocco di codice ripetutamente?",
      answers: [
        "if",
        "for",
        "def"
      ],
      correct: 1
    },
    {
      question: "Come si definisce una funzione in Python?",
      answers: [
        "function miaFunzione():",
        "def miaFunzione():",
        "fun miaFunzione() {}"
      ],
      correct: 1
    },
    {
      question: "Quale metodo viene utilizzato per aggiungere un elemento a una lista in Python?",
      answers: [
        "add()",
        "append()",
        "insert()"
      ],
      correct: 1
    },
    {
      question: "Come si importa un modulo in Python?",
      answers: [
        "include modulo",
        "import modulo",
        "using modulo"
      ],
      correct: 1
    },
    {
      question: "Quale keyword viene utilizzata per gestire le eccezioni in Python?",
      answers: [
        "handle",
        "catch",
        "try"
      ],
      correct: 2
    }
  ]
},

    ]);
    console.log("Tests inserted successfully");
  } catch (error) {
    console.error("Error inserting tests:", error);
  }

  // Collection: Tickets(support)
  await db.createCollection("tickets", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "user_username", "description", "creation_date"],
        properties: {
          _id: { bsonType: "int", description: "Unique ID of the ticket" },
          user_username: {
            bsonType: "string",
            description: "Username of the user who opened the ticket",
          },
          description: {
            bsonType: "string",
            description: "Problem description",
          },
          creation_date: {
            bsonType: "date",
            description: "Ticket creation date",
          },
          messages: {
            bsonType: "array",
            description: "Conversation between user and admin",
            items: {
              bsonType: "object",
              required: ["username", "message", "role", "timestamp"],
              properties: {
                username: {
                  bsonType: "string",
                  description: "Username of the message sender",
                },
                message: {
                  bsonType: "string",
                  description: "Content of the message",
                },
                role: {
                  enum: ["user", "admin"],
                  description: "Role of the message sender",
                },
                timestamp: {
                  bsonType: "date",
                  description: "Timestamp of the message",
                },
              },
            },
          },
          is_open: {
            enum: ["Aperto", "Risolto"],
            description: "Indicates if the ticket is open or resolved",
          },
        },
      },
    },
  });
  // Insert real data into the 'tickets' collection
  await db.collection("tickets").insertMany([
    {
      _id: 1,
      user_username: "andre89",
      description: "Problema con l'accesso al corso avanzato",
      creation_date: new Date(),
      messages: [
        {
          username: "andre89",
          message: "Non riesco ad accedere al corso avanzato.",
          role: "user",
          timestamp: new Date(),
        },
        {
          username: "paoloM",
          message:
            "Ciao, prova a ricaricare la pagina e a fare il logout e login.",
          role: "admin",
          timestamp: new Date(),
        },
      ],
      is_open: "Aperto",
    },
    {
      _id: 2,
      user_username: "mariaB",
      description: "Impossibile caricare l'avatar personalizzato",
      creation_date: new Date(),
      messages: [
        {
          username: "mariaB",
          message: "Non riesco a caricare il mio avatar.",
          role: "user",
          timestamp: new Date(),
        },
        {
          username: "paoloM",
          message:
            "Ciao, prova a ricaricare la pagina e a fare il logout e login.",
          role: "admin",
          timestamp: new Date(),
        },
      ],
      is_open: "Aperto",
    },
    {
      _id: 3,
      user_username: "luigiR99",
      description: "Errore l'acquisto del bordo nello shop",
      creation_date: new Date(),
      messages: [
        {
          username: "luigiR99",
          message: "L' acquisto non va a buon fine.",
          role: "user",
          timestamp: new Date(),
        },
        {
          username: "paoloM",
          message: "Verifica se hai abbastanza punti per acquistare il bordo.",
          role: "admin",
          timestamp: new Date(),
        },
      ],
      is_open: "Risolto",
    },
  ]);
  // Creazione della collezione 'rewards' con validatore
  await db.createCollection("rewards", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "user_username",
          "course_id",
          "medal",
          "points",
          "date",
        ],
        properties: {
          _id: { bsonType: "int", description: "Unique ID of the reward" },
          user_username: {
            bsonType: "string",
            description: "Username of the user who received the reward",
          },
          course_id: { bsonType: "int", description: "Completed course ID" },
          medal: {
            bsonType: "string",
            enum: ["Bronze", "Silver", "Gold"],
            description: "Type of medal obtained (Bronze, Silver, Gold)",
          },
          points: { bsonType: "int", description: "Points obtained" },
          date: { bsonType: "date", description: "Reward date" },
        },
      },
    },
  });

  // Inserimento dati reali nella collezione 'rewards'
  await db.collection("rewards").insertMany([
    {
      _id: 1,
      user_username: "andre89",
      course_id: 1,
      medal: "Gold", // Assegna il medaglia in base ai punti
      points: 150,
      date: new Date(),
    },
    {
      _id: 2,
      user_username: "mariaB",
      course_id: 2,
      medal: "Silver",
      points: 100,
      date: new Date(),
    },
    {
      _id: 3,
      user_username: "giulia123",
      course_id: 3,
      medal: "Gold",
      points: 200,
      date: new Date(),
    },
  ]);
  // Collection: Inventory
  await db.createCollection("inventory", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "user_username", "items"],
        properties: {
          _id: { bsonType: "int", description: "Unique ID of the inventory" },
          user_username: {
            bsonType: "string",
            description: "Owner's username",
          },
          items: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "description", "image_path"],
              properties: {
                name: { bsonType: "string", description: "Item name" },
                description: {
                  bsonType: "string",
                  description: "Item description",
                },
                image_path: {
                  bsonType: "string",
                  description: "Path to item image",
                },
                type: {
                  bsonType: "string",
                  enum: ["avatar", "border", "title"],
                  description: "Type of item (avatar, border, or title)",
                },
              },
            },
            description: "List of items owned by the user",
          },
        },
      },
    },
  });
  try {
    // Insert real data into the 'inventory' collection
    await db.collection("inventory").insertMany([
      {
        _id: 1,
        user_username: "giulia123",
        items: [
          {
            name: "Volpe a nove code",
            description:
              "Sei un demonio",
            image_path: "/img/shop/sigillo.png",
            type: "avatar",
          },
          {
            name: "Cappello parlante",
            description: "Scopri il tuo futuro",
            image_path: "/img/shop/cappello.png",
            type: "title",
          },
        ],
      },
      {
        _id: 2,
        user_username: "andre89",
        items: [
          {
            name: "Anello luminoso",
            description: "Un anello per ghermirli, un anello per domarli e nel buio incatenarli.",
            image_path: "/img/shop/anello.png",
            type: "border",
          },
        ],
      },
      {
        _id: 3,
        user_username: "mariaB",
        items: [
          {
            name: "Avatar donna",
            description:
              "Un avatar per lei",
            image_path: "/img/shop/avatardonna.png",
            type: "avatar",
          },
        ],
      },
      {
        _id: 4,
        user_username: "luigiR99",
        items: [
          {
            name: "Dracarys",
            description: "Bruciali tutti",
            image_path: "/img/shop/drago.png",
            type: "avatar",
          },
        ],
      },
      {
        _id: 5,
        user_username: "elisaf90",
        items: [
          {
            name: "Thug style",
            description: "Fatti rispettare",
            image_path: "/img/shop/occhiali.png",
            type: "title",
          },
        ],
      },
    ]);
    console.log("Inventory inserted successfully");
  } catch (error) {
    console.error("Error inserting inventory:", error);
  }

  // Collection: ShopItems
  await db.createCollection("shop_items", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "name",
          "description",
          "price",
          "category",
          "image_path",
        ],
        properties: {
          _id: {
            bsonType: "int",
            description: "Unique ID of the shop item",
          },
          name: { bsonType: "string", description: "Name of the item" },
          description: {
            bsonType: "string",
            description: "Description of the item",
          },
          price: {
            bsonType: "int",
            minimum: 0,
            description: "Price of the item in points",
          },
          category: {
            bsonType: "string",
            enum: ["avatar", "border", "title"],
            description: "Category of the item (e.g., avatar, border, title)",
          },
          image_path: {
            bsonType: "string",
            description: "Path to the item's image",
          },
          featured: {
            bsonType: "bool",
            description: "Whether the item is featured in the shop",
          },
        },
      },
    },
  });

  // Insert initial data into the 'shop_items' collection
  try {
    await db.collection("shop_items").insertMany([
      {
        _id: 1,
        name: "Anello luminoso",
        description:
          "Un anello per ghermirli, un anello per domarli e nel buio incatenarli.",
        price: 500,
        category: "border",
        stock: 10,
        image_path: "/img/shop/anello.png",
        featured: true,
      },
      {
        _id: 2,
        name: "Avatar donna",
        description: "Un avatar per lei",
        price: 200,
        category: "avatar",
        stock: 25,
        image_path: "/img/shop/avatardonna.png",
        featured: false,
      },
      {
        _id: 3,
        name: "Avatar uomo",
        description: "Un avatar per lui",
        price: 300,
        category: "avatar",
        stock: 15,
        image_path: "/img/shop/avataruomo.png",
        featured: true,
      },
      {
        _id: 4,
        name: "Cappello parlante",
        description: "Scopri il tuo futuro",
        price: 300,
        category: "title",
        stock: 15,
        image_path: "/img/shop/cappello.png",
        featured: true,
      },
      {
        _id: 5,
        name: "Dracarys",
        description: "Bruciali tutti",
        price: 300,
        category: "avatar",
        stock: 15,
        image_path: "/img/shop/drago.png",
        featured: true,
      },
      {
        _id: 6,
        name: "Shenron",
        description: "Raccogli tutte le sfere del drago",
        price: 300,
        category: "avatar",
        stock: 15,
        image_path: "/img/shop/dragone.png",
        featured: true,
      },
      {
        _id: 7,
        name: "Nuvola Speedy",
        description: "Vola veloce fra i corsi",
        price: 300,
        category: "avatar",
        stock: 15,
        image_path: "/img/shop/nuvola.png",
        featured: true,
      },
      {
        _id: 8,
        name: "Thug style",
        description: "Fatti rispettare",
        price: 300,
        category: "title",
        stock: 15,
        image_path: "/img/shop/occhiali.png",
        featured: true,
      },
      {
        _id: 9,
        name: "Alla ricerca del tesoro",
        description: "Le avventure di un pirata",
        price: 300,
        category: "title",
        stock: 15,
        image_path: "/img/shop/onepiece.png",
        featured: true,
      },
      {
        _id: 10,
        name: "Reverse",
        description: "Trolla i tuoi amici",
        price: 300,
        category: "avatar",
        stock: 15,
        image_path: "/img/shop/reverse.png",
        featured: true,
      },
      {
        _id: 11,
        name: "Volpe a 9 code",
        description: "Sei un demonio",
        price: 300,
        category: "border",
        stock: 15,
        image_path: "/img/shop/sigillo.png",
        featured: true,
      },
      {
        _id: 12,
        name: "The Rock",
        description: "Fai delle comparsate ad Hollywood",
        price: 300,
        category: "avatar",
        stock: 15,
        image_path: "/img/shop/therock.png",
        featured: true,
      },
      {
        _id: 13,
        name: "Z",
        description: "La serie migliore di sempre",
        price: 300,
        category: "avatar",
        stock: 15,
        image_path: "/img/shop/z.png",
        featured: true,
      },
    ]);
    console.log("ShopItems inserted successfully");
  } catch (error) {
    console.error("Error inserting shop items:", error);
  }

  // Collection: Streaks
  await db.createCollection("streaks", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "user_username", "streak", "lastLoginDate"],
        properties: {
          _id: { bsonType: "int", description: "Unique ID of the streak" },
          user_username: { bsonType: "string", description: "Username" },
          streak: { bsonType: "int", description: "Current streak count" },
          lastLoginDate: { bsonType: "string", description: "Last login date" },
        },
      },
    },
  });

  try {
    // Insert real data into the 'streaks' collection
    await db.collection("streaks").insertMany([
      {
        _id: 1,
        user_username: "andre89",
        streak: 5,
        lastLoginDate: new Date().toISOString().split("T")[0],
      },
      {
        _id: 2,
        user_username: "mariaB",
        streak: 10,
        lastLoginDate: new Date().toISOString().split("T")[0],
      },
      {
        _id: 3,
        user_username: "luigiR99",
        streak: 3,
        lastLoginDate: new Date().toISOString().split("T")[0],
      },
    ]);
    console.log("Streaks inserted successfully");
  } catch (error) {
    console.error("Error inserting streaks:", error);
  }

  console.log("Database initialized");
  process.exit();
}
async function main() {
  await clearDB();
  await initializeDB();
}

main().catch(console.error);
