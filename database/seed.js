//caricamente istanze DB

const { initializeDB } = require('./initializeDB');

async function seed() {
    await initializeDB();
    console.log('Database seeded');
    process.exit();
}

seed();