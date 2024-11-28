const { connect } = require('./db');

async function initializeDB() {
    const db = await connect();

    // Collezione: Utenti
    await db.createCollection('utenti', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['email', 'username', 'password', 'ruolo'],
            properties: {
                email: { bsonType: 'string', description: 'Email dell\'utente' },
                username: { bsonType: 'string', description: 'Nome utente' },
                password: { bsonType: 'string', description: 'Password cifrata' },
                ruolo: { enum: ['utente', 'admin'], description: 'Ruolo dell\'utente' },
                punti: { bsonType: 'int', default: 0, description: 'Punti dell\'utente' },
                avatar: { bsonType: 'string', description: 'Immagine avatar' }, // URL dell'immagine avatar
                titolo_utente: {
                    bsonType: 'object',
                    description: 'Titolo assegnato all\'utente',
                    required: ['nome', 'colore'],
                    properties: {
                        nome: { bsonType: 'string', description: 'Nome del titolo' },
                        colore: { bsonType: 'string', description: 'Colore associato al titolo' }
                    }
                }
            }
        }
    }
});

    // Collezione: Corsi
    await db.createCollection('corsi', {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['nome', 'descrizione', 'difficoltà', 'lezioni'],
                properties: {
                    nome: { bsonType: 'string', description: 'Nome del corso' },
                    descrizione: { bsonType: 'string', description: 'Descrizione del corso' },
                    difficoltà: { bsonType: 'string', description: 'Difficoltà del corso (Facile, Medio, Difficile)' },
                    lezioni: {
                        bsonType: 'array',
                        items: {
                            bsonType: 'object',
                            required: ['contenuto'],
                            properties: {
                                contenuto: { bsonType: 'string', description: 'Contenuto della lezione' }
                            }
                        }
                    }
                }
            }
        }
    });

    // Collezione: Test
    await db.createCollection('test', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['corso_id', 'utente_id', 'voto', 'domande'],
            properties: {
                corso_id: { bsonType: 'objectId', description: 'ID del corso associato' },
                utente_id: { bsonType: 'objectId', description: 'ID dell\'utente che ha fatto il test' },
                voto: { bsonType: 'int', description: 'Punteggio ottenuto' },
                domande: {
                    bsonType: 'array',
                    items: {
                        bsonType: 'object',
                        required: ['domanda', 'risposte', 'corretta'],
                        properties: {
                            domanda: { bsonType: 'string', description: 'Testo della domanda' },
                            risposte: {
                                bsonType: 'array',
                                items: { bsonType: 'string' },
                                description: 'Lista delle possibili risposte'
                            },
                            corretta: {
                                bsonType: 'int',
                                description: 'Indice della risposta corretta nella lista delle risposte'
                            }
                        }
                    },
                    description: 'Lista di domande con risposte multiple'
                }
            }
        }
    }
});

    // Collezione: Shop
    await db.createCollection('shop', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['nome', 'prezzo'],
            properties: {
                nome: { bsonType: 'string', description: 'Nome dell\'oggetto' },
                prezzo: { bsonType: 'int', description: 'Prezzo dell\'oggetto in punti' }, // Se il prezzo è 0, l'oggetto è un premio/reward
                path_immagine: { bsonType: 'string', description: 'Percorso dell\'immagine dell\'oggetto (opzionale)' }, //In questo path si possono mettere anche i bordi
                titolo_utente: {
                    bsonType: 'object',
                    description: 'Titolo assegnato all\'utente (opzionale)',
                    required: ['nome', 'colore'],
                    properties: {
                        nome: { bsonType: 'string', description: 'Nome del titolo' },
                        colore: { bsonType: 'string', description: 'Colore associato al titolo' }
                    }
                }
            }
        }
    }
});

    // Collezione: Ticket (Richieste di assistenza)
    await db.createCollection('ticket', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['utente_id', 'stato'],
            properties: {
                utente_id: { bsonType: 'objectId', description: 'ID dell\'utente che ha aperto il ticket' },
                descrizione: { bsonType: 'string', description: 'Descrizione del problema' },
                stato: {
                    bsonType: 'string',
                    enum: ['in attesa di risposta', 'in lavorazione', 'risolto'],
                    description: 'Stato del ticket'
                },
                admin_id: { bsonType: 'objectId', description: 'ID dell\'admin che ha gestito il ticket (opzionale)' },
                data_creazione: { bsonType: 'date', description: 'Data di creazione del ticket' }
            }
        }
    }
});

    // Collezione: Gestione Premi
    await db.createCollection('premi', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['utente_id', 'nome_corso', 'descrizione', 'punti', 'data'],
            properties: {
                utente_id: { bsonType: 'objectId', description: 'ID dell\'utente che ha ricevuto il premio' },
                nome_corso: { bsonType: 'string', description: 'Nome del corso completato' },
                descrizione: { bsonType: 'string', description: 'Descrizione del premio' },
                punti: { bsonType: 'int', description: 'Punti ottenuti' }, //La coccarda varia in base ai punti ottenuti
                data: { bsonType: 'date', description: 'Data del conseguimento del premio' }
            }
        }
    }
});

    // Collezione: Inventario Utente
    await db.createCollection('inventario', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['utente_id', 'oggetti'],
            properties: {
                utente_id: { bsonType: 'objectId', description: 'ID dell\'utente proprietario dell\'inventario' },
                oggetti: {
                    bsonType: 'array',
                    items: {
                        bsonType: 'object',
                        required: ['nome', 'descrizione'],
                        properties: {
                            nome: { bsonType: 'string', description: 'Nome dell\'oggetto' },
                            descrizione: { bsonType: 'string', description: 'Descrizione dell\'oggetto' },
                            path_immagine: { bsonType: 'string', description: 'Percorso dell\'immagine dell\'oggetto (opzionale)' },
                            titolo_utente: {
                                bsonType: 'object',
                                description: 'Titolo assegnato all\'utente',
                                required: ['nome', 'colore'],
                                properties: {
                                    nome: { bsonType: 'string', description: 'Nome del titolo' },
                                    colore: { bsonType: 'string', description: 'Colore associato al titolo' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

    console.log('Database initializzato');
    process.exit();
}

initializeDB();