const TestDAO = require("../dao/testDAO");

class TestService{
    static async getTestExistsForUserAndCourse(username, course_id) {
        return await TestDAO.getTestExistsForUserAndCourse(username, course_id);
    }
}

module.exports = TestService;