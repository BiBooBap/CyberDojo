const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Modifica con il tuo URI
const dbName = 'CyberDojo';

async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connesso a MongoDB');
        return client.db(dbName);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = { connect };