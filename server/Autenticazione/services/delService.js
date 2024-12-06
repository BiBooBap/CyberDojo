const { connect } = require("../dao/delDAO");

async function deleteUser(username) {
  const db = await connect();
  const result = await db.collection("user").deleteOne({ username });
  return result;
}

module.exports = { deleteUser };