const AuthFacade = require("../authFacade");

class UserCourseService {
    // Method to get the courses followed by a user
    static async getUserCourses(username) {
        return await AuthFacade.getUserCourses(username);
  }
}

module.exports = UserCourseService;