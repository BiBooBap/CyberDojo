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
              "In questa lezione imparerai a gestire le operazioni asincrone in JavaScript utilizzando callback, promise e async/await.",
          },
          {
            name: "Gestione degli errori e debugging",
            content:
              "Questa lezione copre le tecniche di gestione degli errori e il debugging in JavaScript.",
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
              "In questa lezione imparerai a creare API RESTful utilizzando Node.js e Express.",
          },
          {
            name: "Utilizzo di Express.js per la gestione delle route",
            content:
              "Questa lezione copre l'utilizzo di Express.js per la gestione delle route nelle applicazioni Node.js.",
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
              "Questa lezione introduce i concetti fondamentali di HTML e la struttura di base di una pagina web.",
          },
          {
            name: "Struttura di una pagina HTML",
            content:
              "In questa lezione imparerai a creare la struttura di una pagina HTML utilizzando tag e attributi.",
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
              "Questa lezione copre i selettori CSS e le proprietà per lo styling degli elementi HTML.",
          },
          {
            name: "Layout e design responsivo",
            content:
              "In questa lezione imparerai a creare layout responsivi utilizzando CSS.",
          },
        ],
        course_image: "/img/courses/css.png",
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
        required: ["_id", "user_username", "description", "creation_date"],
        properties: {
          _id: {
            bsonType: "int",
            description: "Unique ID of the ticket",
          },
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
            description:
              "Username of the admin who handled the ticket (optional)",
          },
          creation_date: {
            bsonType: "date",
            description: "Ticket creation date",
          },
          is_open: {
            enum: ["Aperto", "Risolto"],
            description: "Indicates if the ticket is open or resolved"
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
      is_open: "Aperto",
    },
    {
      _id: 2,
      user_username: "mariaB",
      description: "Impossibile caricare l'avatar personalizzato",
      creation_date: new Date(),
      is_open: "Aperto",
    },
    {
      _id: 3,
      user_username: "luigiR99",
      description:
        "Errore durante il pagamento per l'iscrizione al corso premium",
      creation_date: new Date(),
      is_open: "Risolto",
    },
    {
      _id: 4,
      user_username: "elisaf90",
      description: "Problema con il salvataggio dei progressi nel corso base",
      creation_date: new Date(),
      is_open: "Aperto",
    },
    {
      _id: 5,
      user_username: "paoloM",
      description: "Richiesta di supporto per configurazione delle notifiche",
      creation_date: new Date(),
      is_open: "Risolto",
    },
    {
      _id: 6,
      user_username: "giulia123",
      description: "Il sistema segnala punteggi errati nella classifica",
      creation_date: new Date(),
      is_open: "Aperto",
    },
  ]);
  // Creazione della collezione 'rewards' con validatore
  await db.createCollection("rewards", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["user_username", "course_id", "medal", "points", "date"],
        properties: {
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
      user_username: "andre89",
      course_id: 1,
      medal: "Gold", // Assegna il medaglia in base ai punti
      points: 150,
      date: new Date(),
    },
    {
      user_username: "mariaB",
      course_id: 2,
      medal: "Silver",
      points: 100,
      date: new Date(),
    },
    {
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
        required: ["user_username", "items"],
        properties: {
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
        user_username: "giulia123",
        items: [
          {
            name: "Golden Avatar",
            description:
              "A special golden avatar to showcase your achievements.",
            image_path: "CyberDojo/database/img/golden_avatar.png",
            type: "avatar",
          },
          {
            name: "Champion Title",
            description: "Display the 'Champion' title on your profile.",
            image_path: "CyberDojo/database/img/champion_title.png",
            type: "title",
          },
        ],
      },
      {
        user_username: "andre89",
        items: [
          {
            name: "Silver Border",
            description: "Add a stylish silver border to your profile.",
            image_path: "CyberDojo/database/img/silver_border.png",
            type: "border",
          },
        ],
      },
      {
        user_username: "mariaB",
        items: [
          {
            name: "Golden Avatar",
            description:
              "A special golden avatar to showcase your achievements.",
            image_path: "CyberDojo/database/img/golden_avatar.png",
            type: "avatar",
          },
        ],
      },
      {
        user_username: "luigiR99",
        items: [
          {
            name: "Champion Title",
            description: "Display the 'Champion' title on your profile.",
            image_path: "CyberDojo/database/img/champion_title.png",
            type: "title",
          },
        ],
      },
      {
        user_username: "elisaf90",
        items: [
          {
            name: "Champion Title",
            description: "Display the 'Champion' title on your profile.",
            image_path: "CyberDojo/database/img/champion_title.png",
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
            bsonType: "objectId",
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
        _id: new ObjectId(),
        name: "Golden Avatar",
        description: "A special golden avatar to showcase your achievements.",
        price: 500,
        category: "avatar",
        stock: 10,
        image_path: "CyberDojo/database/img/golden_avatar.png",
        featured: true,
      },
      {
        _id: new ObjectId(),
        name: "Silver Border",
        description: "Add a stylish silver border to your profile.",
        price: 200,
        category: "border",
        stock: 25,
        image_path: "CyberDojo/database/img/silver_border.png",
        featured: false,
      },
      {
        _id: new ObjectId(),
        name: "Champion Title",
        description: "Display the 'Champion' title on your profile.",
        price: 300,
        category: "title",
        stock: 15,
        image_path: "CyberDojo/database/img/champion_title.png",
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
        required: ["user_username", "streak", "lastLoginDate"],
        properties: {
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
