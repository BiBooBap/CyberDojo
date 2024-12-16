const { connect } = require("../../../database/db");

class TestDAO {
  // Retrieve all tests associated with a course
  static async getTestsByCourse(courseId) {
    const db = await connect();
    const tests = await db
      .collection("tests")
      .find({ course_id: courseId })
      .toArray();

    return tests;
  }

  // Adds a reward to the rewards collection
  static async addReward(reward) {
    const db = await connect();

    const lastReward = await db.collection("rewards")
    .find()
    .sort({ _id: -1 })
    .limit(1)
    .project({ _id: 1 })
    .toArray();

    var lastId = lastReward.length > 0 ? lastReward[0]._id : 0;
    const newId = lastId + 1;
    reward._id = newId;

    const result = await db.collection("rewards").insertOne(reward);
    return result.insertedId;
  }

  // Retrieve the existing reward for a user and a specific course
  static async getRewardByUserAndCourse(username, courseId) {
    const db = await connect();
    return await db.collection("rewards").findOne({
      user_username: username,
      course_id: courseId,
    });
  }

  // Update the existing reward
  static async updateReward(rewardId, updateFields) {
    const db = await connect();
    return await db
      .collection("rewards")
      .updateOne({ _id: rewardId }, { $set: updateFields });
  }

  // Retrieve the test by its id
  static async getTestById(testId) {
    const db = await connect();
    return await db.collection("tests").findOne({ _id: testId });
  }

  // Add points to the user's account
  static async addPoints(username, points) {
    const db = await connect();
    const result = await db.collection("user").updateOne(
      { username: username },
      { $inc: { points : points } }
    );

    return result;
  }

}

module.exports = TestDAO;;
