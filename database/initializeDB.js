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
      password: await bcrypt.hash("password3", 10),
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
      password: await bcrypt.hash("password8", 10),
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
      password: await bcrypt.hash("password4", 10),
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
      password: await bcrypt.hash("password5", 10),
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
      password: await bcrypt.hash("password6", 10),
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
      password: await bcrypt.hash("password7", 10),
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
              "In questa lezione imparerai a gestire le operazioni asincrone in JavaScript utilizzando callback, promise e async/await.",
          },
          {
            name: "Gestione degli errori e debugging",
            content:
              "Questa lezione copre le tecniche di gestione degli errori e il debugging in JavaScript.",
          },
        ],
        course_image: "CyberDojo/database/img/pro.png",
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
              "In questa lezione imparerai a creare API RESTful utilizzando Node.js e Express.",
          },
          {
            name: "Utilizzo di Express.js per la gestione delle route",
            content:
              "Questa lezione copre l'utilizzo di Express.js per la gestione delle route nelle applicazioni Node.js.",
          },
        ],
        course_image: "CyberDojo/database/img/pro.png",
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
              "Questa lezione introduce i concetti fondamentali di HTML e la struttura di base di una pagina web.",
          },
          {
            name: "Struttura di una pagina HTML",
            content:
              "In questa lezione imparerai a creare la struttura di una pagina HTML utilizzando tag e attributi.",
          },
        ],
        course_image: "CyberDojo/database/img/pro.png",
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
              "Questa lezione copre i selettori CSS e le proprietà per lo styling degli elementi HTML.",
          },
          {
            name: "Layout e design responsivo",
            content:
              "In questa lezione imparerai a creare layout responsivi utilizzando CSS.",
          },
        ],
        course_image: "CyberDojo/database/img/pro.png",
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
        required: ["course_id", "questions"],
        properties: {
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
        course_id: 1,
        questions: [
          {
            question: "Qual è la differenza tra let e var in JavaScript?",
            answers: [
              "let è block-scoped, var è function-scoped",
              "Non c'è differenza",
              "let è più lento di var",
            ],
            correct: 0,
          },
          {
            question: "Cos'è una closure in JavaScript?",
            answers: [
              "Una funzione con scope locale",
              "Una funzione che ricorda lo scope in cui è stata definita",
              "Un metodo statico",
            ],
            correct: 1,
          },
        ],
      },
      {
        course_id: 2,
        questions: [
          {
            question: "Qual è la differenza tra == e === in JavaScript?",
            answers: [
              "== confronta solo il valore, === confronta valore e tipo",
              "Non c'è differenza",
              "=== è più lento di ==",
            ],
            correct: 0,
          },
          {
            question: "Come si avvia un server Express?",
            answers: [
              "Con il comando `npm start`",
              "Chiamando `app.listen()`",
              "Con `require('express')`",
            ],
            correct: 1,
          },
        ],
      },
      {
        course_id: 3,
        questions: [
          {
            question: "Qual è lo scopo di una promise in JavaScript?",
            answers: [
              "Gestire operazioni asincrone",
              "Gestire variabili globali",
              "Gestire eventi DOM",
            ],
            correct: 0,
          },
          {
            question: "Cosa rappresenta l'attributo `alt` in un tag `<img>`?",
            answers: [
              "Il percorso dell'immagine",
              "Testo alternativo per descrivere l'immagine",
              "Il tipo MIME dell'immagine",
            ],
            correct: 1,
          },
        ],
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
        required: ["user_username", "description", "creation_date"],
        properties: {
          user_username: {
            bsonType: "string",
            description: "Username of the user who opened the ticket",
          },
          description: {
            bsonType: "string",
            description: "Problem description",
          },
          admin_username: {
            bsonType: "string",
            description: "ID of the admin who handled the ticket (optional)",
          },
          creation_date: {
            bsonType: "date",
            description: "Ticket creation date",
          },
        },
      },
    },
  });
  // Insert real data into the 'tickets' collection
  await db.collection("tickets").insertMany([
    {
      user_username: "andre89",
      description: "Problema con l'accesso al corso avanzato",
      creation_date: new Date(),
    },
    {
      user_username: "mariaB",
      description: "Impossibile caricare l'avatar personalizzato",
      creation_date: new Date(),
    },
    {
      user_username: "luigiR99",
      description:
        "Errore durante il pagamento per l'iscrizione al corso premium",
      creation_date: new Date(),
    },
    {
      user_username: "elisaf90",
      description: "Problema con il salvataggio dei progressi nel corso base",
      creation_date: new Date(),
    },
    {
      user_username: "paoloM",
      description: "Richiesta di supporto per configurazione delle notifiche",
      creation_date: new Date(),
    },
    {
      user_username: "giulia123",
      description: "Il sistema segnala punteggi errati nella classifica",
      creation_date: new Date(),
    },
  ]);
  // Collection: rewards
  await db.createCollection("rewards", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "user_username",
          "course_id",
          "description",
          "points",
          "date",
        ], // QUI DESCRIPTION DOVREBBE ESSERE IL PREMIO ASSEGNATO! - Inoltre senso memorizzare anche "course_name" oltre "course_id" (che serve per corrispondenza Corso - Test) in modo da poter effettuare una cronologia testuale dei corsi completati (area utente).
        properties: {
          user_username: {
            bsonType: "string",
            description: "Username of the user who received the reward",
          },
          course_id: { bsonType: "int", description: "Completed course ID" },
          description: {
            bsonType: "string",
            description: "Reward description",
          },
          points: { bsonType: "int", description: "Points obtained" }, // The badge varies based on the points obtained
          date: { bsonType: "date", description: "Reward date" },
        },
      },
    },
  });

  // Insert real data into the 'rewards' collection
  await db.collection("rewards").insertMany([
    {
      user_username: "andre89",
      course_id: 1,
      description: "Completato con successo", // QUI DOVREBBE ESSERE IL PREMIO ASSEGNATO!
      points: 150,
      date: new Date(),
    },
    {
      user_username: "mariaB",
      course_id: 2,
      description: "Completato con successo",
      points: 100,
      date: new Date(),
    },
    {
      user_username: "giulia123",
      course_id: 3,
      description: "Completato con successo",
      points: 200,
      date: new Date(),
    },
  ]);

  // Collection: inventory
  await db.createCollection("inventory", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["user_username", "items"],
        properties: {
          user_username: {
            bsonType: "string",
            description: "Username of the inventory owner",
          },
          items: {
            bsonType: "array",
            items: {
              bsonType: "object",
              required: ["name", "description"],
              properties: {
                name: { bsonType: "string", description: "Item name" },
                description: {
                  bsonType: "string",
                  description: "Item description",
                },
                image_path: {
                  bsonType: "string",
                  description: "Path to the item's image",
                },
              },
            },
          },
        },
      },
    },
  });
  // Insert real data into the 'inventory' collection
  await db.collection("inventory").insertMany([
    {
      user_username: "andre89",
      items: [
        {
          name: "Oggetto Speciale",
          description: "Descrizione dell'oggetto speciale",
          image_path: "CyberDojo/database/img/standardimage.png",
        },
      ],
    },
    {
      user_username: "mariaB",
      items: [
        {
          name: "Oggetto Speciale",
          description: "Descrizione dell'oggetto speciale",
          image_path: "CyberDojo/database/img/standardimage.png",
        },
      ],
    },
  ]);
  // Collection: streaks
  await db.createCollection("streaks", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["user_username", "streak", "lastLoginDate"],
        properties: {
          user_username: { bsonType: "string", description: "Username" },
          streak: { bsonType: "int", description: "Current streak count" },
          lastLoginDate: { bsonType: "string", description: "Last login date" },
        },
      },
    },
  });

  // Insert real data into the 'streaks' collection
  await db.collection("streaks").insertMany([
    {
      user_username: "andre89",
      streak: 5,
      lastLoginDate: new Date().toISOString().split("T")[0],
    },
    {
      user_username: "mariaB",
      streak: 10,
      lastLoginDate: new Date().toISOString().split("T")[0],
    },
    {
      user_username: "luigiR99",
      streak: 3,
      lastLoginDate: new Date().toISOString().split("T")[0],
    },
  ]);

  console.log("Database initialized");
  process.exit();
}
async function main() {
  await clearDB();
  await initializeDB();
}

main().catch(console.error);
