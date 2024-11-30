const { connect } = require("./db");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

async function clearDB() {
  const db = await connect();
  await db.dropDatabase();
  console.log("Database eliminato");
}
async function initializeDB() {
  const db = await connect();

  // Collezione: Utenti
  await db.createCollection("utenti", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["email", "username", "password", "ruolo"],
        properties: {
          email: { bsonType: "string", description: "Email dell'utente" },
          username: { bsonType: "string", description: "Nome utente" },
          password: { bsonType: "string", description: "Password cifrata" },
          ruolo: {
            enum: ["utente", "admin"],
            description: "Ruolo dell'utente",
          },
          punti: {
            bsonType: "int",
            minimum: 0,
            description: "Punti dell'utente",
          },
          avatar: { bsonType: "string", description: "Immagine avatar" }, // URL dell'immagine avatar
          titolo_utente: { bsonType: "string", description: "Immagine titolo" },
          bordo: { bsonType: "string", description: "Immagine bordo" },
        },
      },
    },
  });

  const users = [
    {
      email: "giuliarossi@gmail.com",
      username: "giulia123",
      password: await bcrypt.hash('password3', 10),
      ruolo: "utente",
      punti: 100,
      avatar: "CyberDojo/database/img/base.png",
      titolo_utente: "CyberDojo/database/img/base.png",
      bordo: "CyberDojo/database/img/base.png",
    },
    {
      email: "paolomorandi@gmail.com",
      username: "paoloM",
      password: await bcrypt.hash('password8', 10),
      ruolo: "admin",
      punti: 1000,
      avatar: "CyberDojo/database/img/admin.png",
      titolo_utente: "CyberDojo/database/img/base.png",
      bordo: "CyberDojo/database/img/base.png",
    },
    {
      email: "andrealandi@gmail.com",
      username: "andre89",
      password: await bcrypt.hash('password4', 10),
      ruolo: "utente",
      punti: 200,
      avatar: "CyberDojo/database/img/advanced.png",
      titolo_utente: "CyberDojo/database/img/base.png",
      bordo: "CyberDojo/database/img/base.png",
    },
    {
      email: "mariabianchi@gmail.com",
      username: "mariaB",
      password: await bcrypt.hash('password5', 10),
      ruolo: "utente",
      punti: 20,
      avatar: "CyberDojo/database/img/newbie.png",
      titolo_utente: "CyberDojo/database/img/base.png",
      bordo: "CyberDojo/database/img/base.png",
    },
    {
      email: "luigiricci@gmail.com",
      username: "luigiR99",
      password: await bcrypt.hash('password6', 10),
      ruolo: "utente",
      punti: 350,
      avatar: "CyberDojo/database/img/pro.png",
      titolo_utente: "CyberDojo/database/img/base.png",
      bordo: "CyberDojo/database/img/base.png",
    },
    {
      email: "elisaferrari@gmail.com",
      username: "elisaf90",
      password: await bcrypt.hash('password7', 10),
      ruolo: "utente",
      punti: 500,
      avatar: "CyberDojo/database/img/expert.png",
      titolo_utente: "CyberDojo/database/img/base.png",
      bordo: "CyberDojo/database/img/base.png",
    },
  ];

  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  await db.collection("utenti").insertMany(users);

  // Collezione: Corsi
  await db.createCollection("corsi", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "nome", "descrizione", "difficoltà", "lezioni"],
        properties: {
          _id: { bsonType: "int", description: "ID del corso" },
          nome: { bsonType: "string", description: "Nome del corso" },
          descrizione: {
            bsonType: "string",
            description: "Descrizione del corso",
          },
          difficoltà: {
            bsonType: "string",
            description: "Difficoltà del corso (Facile, Medio, Difficile)",
          },
          lezioni: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["contenuto"],
              properties: {
                contenuto: {
                  bsonType: "string",
                  description: "Contenuto della lezione",
                },
              },
            },
          },immaginecorso: { bsonType: "string", description: "Immagine corso" },
        },
      },
    },
  });
  // Inserisci dati reali nella collezione 'corsi'
  await db.collection("corsi").insertMany([
    {
      _id: 1,
      nome: "Corso Avanzato di JavaScript",
      descrizione: "Approfondisci le tue conoscenze di JavaScript",
      difficoltà: "Difficile",
      lezioni: [
        { contenuto: "Programmazione asincrona in JavaScript" },
        { contenuto: "Gestione degli errori e debugging" },
      ],
      immaginecorso: "CyberDojo/database/img/pro.png",
    },
    {
      _id: 2,
      nome: "Corso Completo di Node.js",
      descrizione: "Diventa un esperto di Node.js",
      difficoltà: "Medio",
      lezioni: [
        { contenuto: "Creazione di API RESTful con Node.js" },
        { contenuto: "Utilizzo di Express.js per la gestione delle route" },
      ],
      immaginecorso: "CyberDojo/database/img/pro.png",
    },
    {
      _id: 3,
      nome: "Corso Base di HTML",
      descrizione: "Impara le basi di HTML",
      difficoltà: "Facile",
      lezioni: [
        { contenuto: "Introduzione a HTML" },
        { contenuto: "Struttura di una pagina HTML" },
      ],
      immaginecorso: "CyberDojo/database/img/pro.png",
    },
    {
      _id: 4,
      nome: "Corso Intermedio di CSS",
      descrizione: "Approfondisci le tue conoscenze di CSS",
      difficoltà: "Medio",
      lezioni: [
        { contenuto: "Selettori e proprietà CSS" },
        { contenuto: "Layout e design responsivo" },
      ],
      immaginecorso: "CyberDojo/database/img/pro.png",
    },
  ]);
  // Collezione: Test
  await db.createCollection("test", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["corso_id", "utente_username", "voto", "domande"],
        properties: {
          corso_id: { bsonType: "int", description: "ID del corso associato" },
          utente_username: {
            bsonType: "string",
            description: "Username dell'utente che ha fatto il test",
          },
          voto: { bsonType: "int", description: "Punteggio ottenuto" },
          domande: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["domanda", "risposte", "corretta"],
              properties: {
                domanda: {
                  bsonType: "string",
                  description: "Testo della domanda",
                },
                risposte: {
                  bsonType: "array",
                  items: { bsonType: "string" },
                  description: "Lista delle possibili risposte",
                },
                corretta: {
                  bsonType: "int",
                  description:
                    "Indice della risposta corretta nella lista delle risposte",
                },
              },
            },
            description: "Lista di domande con risposte multiple",
          },
        },
      },
    },
  });
  // Inserisci dati reali nella collezione 'test'
  await db.collection("test").insertMany([
    {
      corso_id: 1,
      utente_username: "andre89",
      voto: 90,
      domande: [
        {
          domanda: "Qual è la differenza tra let e var in JavaScript?",
          risposte: [
            "let è block-scoped, var è function-scoped",
            "Non c'è differenza",
            "let è più lento di var",
          ],
          corretta: 0,
        },
      ],
    },
    {
      corso_id: 2,
      utente_username: "mariaB",
      voto: 85,
      domande: [
        {
          domanda: "Qual è la differenza tra == e === in JavaScript?",
          risposte: [
            "== confronta solo il valore, === confronta valore e tipo",
            "Non c'è differenza",
            "=== è più lento di ==",
          ],
          corretta: 0,
        },
      ],
    },
    {
      corso_id: 3,
      utente_username: "giulia123",
      voto: 75,
      domande: [
        {
          domanda: "Qual è lo scopo di una promise in JavaScript?",
          risposte: [
            "Gestire operazioni asincrone",
            "Gestire variabili globali",
            "Gestire eventi DOM",
          ],
          corretta: 0,
        },
      ],
    },
  ]);
  // Collezione: Shop
  await db.createCollection("shop", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["nome", "prezzo"],
        properties: {
          nome: { bsonType: "string", description: "Nome dell'oggetto" },
          prezzo: {
            bsonType: "int",
            description: "Prezzo dell'oggetto in punti",
          }, // Se il prezzo è 0, l'oggetto è un premio/reward
          path_immagine: {
            bsonType: "string",
            description: "Percorso dell'immagine dell'oggetto (opzionale)",
          }, //In questo path si possono mettere anche i bordi
        },
      },
    },
  });
  // Inserisci dati reali nella collezione 'shop'
  await db.collection("shop").insertMany([
    {
      nome: "Bordo Premium",
      prezzo: 500,
      path_immagine: "CyberDojo/database/img/base.png",
    },
    {
      nome: "Avatar Standard",
      prezzo: 200,
      path_immagine: "CyberDojo/database/img/standardimage.png",
    },
    {
      nome: "Titolo Standard",
      prezzo: 450,
      path_immagine: "CyberDojo/database/img/standardimage.png",
    },
  ]);

  // Collezione: Ticket (Richieste di assistenza)
  await db.createCollection("ticket", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["utente_username", "descrizione", "data_creazione"],
        properties: {
          utente_username: {
            bsonType: "string",
            description: "Username dell'utente che ha aperto il ticket",
          },
          descrizione: {
            bsonType: "string",
            description: "Descrizione del problema",
          },
          admin_username: {
            bsonType: "string",
            description: "ID dell'admin che ha gestito il ticket (opzionale)",
          },
          data_creazione: {
            bsonType: "date",
            description: "Data di creazione del ticket",
          },
        },
      },
    },
  });
  // Inserisci dati reali nella collezione 'ticket'
  await db.collection("ticket").insertMany([
    {
      utente_username: "andre89",
      descrizione: "Problema con l'accesso al corso avanzato",
      data_creazione: new Date(),
    },
    {
      utente_username: "mariaB",
      descrizione: "Impossibile caricare l'avatar personalizzato",
      data_creazione: new Date(),
    },
    {
      utente_username: "luigiR99",
      descrizione:
        "Errore durante il pagamento per l'iscrizione al corso premium",
      data_creazione: new Date(),
    },
    {
      utente_username: "elisaf90",
      descrizione: "Problema con il salvataggio dei progressi nel corso base",
      data_creazione: new Date(),
    },
    {
      utente_username: "paoloM",
      descrizione: "Richiesta di supporto per configurazione delle notifiche",
      data_creazione: new Date(),
    },
    {
      utente_username: "giulia123",
      descrizione: "Il sistema segnala punteggi errati nella classifica",
      data_creazione: new Date(),
    },
  ]);

  // Collezione: Gestione Premi
  await db.createCollection("premi", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "utente_username",
          "corso_id",
          "descrizione",
          "punti",
          "data",
        ],
        properties: {
          utente_username: {
            bsonType: "string",
            description: "Username dell'utente che ha ricevuto il premio",
          },
          corso_id: { bsonType: "int", description: "ID del corso completato" },
          descrizione: {
            bsonType: "string",
            description: "Descrizione del premio",
          },
          punti: { bsonType: "int", description: "Punti ottenuti" }, //La coccarda varia in base ai punti ottenuti
          data: {
            bsonType: "date",
            description: "Data del conseguimento del premio",
          },
        },
      },
    },
  });
  // Inserisci dati reali nella collezione 'premi'
  await db.collection("premi").insertMany([
    {
      utente_username: "andre89",
      corso_id: 1,
      descrizione: "Completato con successo",
      punti: 150,
      data: new Date(),
    },
    {
      utente_username: "mariaB",
      corso_id: 2,
      descrizione: "Completato con successo",
      punti: 100,
      data: new Date(),
    },
    {
      utente_username: "giulia123",
      corso_id: 3,
      descrizione: "Completato con successo",
      punti: 200,
      data: new Date(),
    },
  ]);
  // Collezione: Inventario Utente
  await db.createCollection("inventario", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["utente_username", "oggetti"],
        properties: {
          utente_username: {
            bsonType: "string",
            description: "Username dell'utente proprietario dell'inventario",
          },
          oggetti: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["nome", "descrizione"],
              properties: {
                nome: { bsonType: "string", description: "Nome dell'oggetto" },
                descrizione: {
                  bsonType: "string",
                  description: "Descrizione dell'oggetto",
                },
                path_immagine: {
                  bsonType: "string",
                  description:
                    "Percorso dell'immagine dell'oggetto (opzionale)",
                },
              },
            },
          },
        },
      },
    },
  });
  // Inserisci dati reali nella collezione 'inventario'
  await db.collection("inventario").insertMany([
    {
      utente_username: "andre89",
      oggetti: [
        {
          nome: "Oggetto Speciale",
          descrizione: "Descrizione dell'oggetto speciale",
          path_immagine: "CyberDojo/database/img/standardimage.png",
        },
      ],
    },
    {
      utente_username: "mariaB",
      oggetti: [
        {
          nome: "Oggetto Speciale",
          descrizione: "Descrizione dell'oggetto speciale",
          path_immagine: "CyberDojo/database/img/standardimage.png",
        },
      ],
    },
  ]);
  console.log("Database initializzato");
  process.exit();
}
async function main() {
  await clearDB();
  await initializeDB();
}

main().catch(console.error);
