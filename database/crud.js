//operazioni crud per la gestione dei dati

const { connect } = require('./db');

async function createRecord(collection, data) {
    const client = await connect();
    const db = client.db();
    try {
        const result = await db.collection(collection).insertOne(data);
        return result.ops[0];
    } catch (error) {
        console.error('Errore nella creazione del record:', error);
        throw error;
    }   
    
}

async function readRecord(collection, query) {
    const client = await connect();
    const db = client.db();
    try {
        const result = await db.collection(collection).findOne(query);
        return result;
    } catch (error) {
        console.error('Errore nella lettura del record:', error);
        throw error;
    } finally {
        client.close();
    }
}

async function updateRecord(collection, query, data) {
    const client = await connect();
    const db = client.db();
    try {
        const result = await db.collection(collection).updateOne(query, { $set: data });
        return result.modifiedCount > 0;
    } catch (error) {
        console.error('Errore nell\'aggiornamento del record:', error);
        throw error;
    } finally {
        client.close();
    }
}

async function deleteRecord(collection, query) {
    const client = await connect();
    const db = client.db();
    try {
        const result = await db.collection(collection).deleteOne(query);
        return result.deletedCount > 0;
    } catch (error) {
        console.error('Errore nell\'eliminazione del record:', error);
        throw error;
    } finally {
        client.close();
    }
}

module.exports = {
    createRecord,
    readRecord,
    updateRecord,
    deleteRecord
};