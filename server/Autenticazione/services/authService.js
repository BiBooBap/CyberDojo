const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserDao = require("../dao/userDao");
const CourseService = require("../../Corsi/externalCourseService");

const secretKey = "sigmasigmaonthewall";

class AuthService {

  // Method to generate the token
  static generateToken(user) {
    return jwt.sign(
      { username: user.username, role: user.role },
      secretKey,
      { expiresIn: "30m" }
    );
  }

  // Method to get user's courses
  static async getUserCourses(username) {
    const enrolledCourses = await CourseService.getEnrolledCourses(username);

    if (!enrolledCourses || enrolledCourses.length === 0) {
      throw new Error("L'utente non è iscritto a nessun corso");
    }

    const courses = await Promise.all(
      enrolledCourses.map(async (course) => {
        const courseInfo = await CourseService.getCourseInfo(course.course_id);

        const progress = await CourseService.getProgressOfCourse(username, course.course_id);

        return {
          id: course.course_id,
          title: courseInfo.name,
          icon: courseInfo.course_image,
          progress,
        };
      })
    );
    return courses;
  }

  // method to login by username and password
  static async loginByUsername(username, password) {

    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non valide");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenziali non valide");
    }

    const token = AuthService.generateToken(user);

    return token;
  }

  // Method to login by email and password
  static async loginByEmail(email, password) {
    const user = await UserDao.findUserByEmail(email);
    if (!user) {
      throw new Error("Credenziali non valide");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Credenziali non valide");
    }

    const token = AuthService.generateToken(user);

    return token;
  }

  // Method to check user's current password
  static async verifyCurrentPassword(username, currentPassword) {
    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non trovato");
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Password attuale non valida");
    }

    return true;
  }

  // Method to get user's information
  static async getUserInfo(username) {
    const user = await UserDao.findUserByUsername(username);
    if (!user) {
      throw new Error("Utente non trovato");
    }
    return {
      username: user.username,
      email: user.email,
    };
  }

  // Method to update user's information
  static async updateUserInfo( username, newEmail, newUsername, newPassword) {

    if (!newEmail || !newUsername) {
      throw new Error("Email e username sono obbligatori");
    }

    const existingUserByEmail = await UserDao.findUserByEmail(newEmail);
    if (existingUserByEmail && existingUserByEmail.username !== username) {
      throw new Error("Email già utilizzata da un altro utente");
    }

    const existingUserByUsername = await UserDao.findUserByUsername(newUsername);
    if (existingUserByUsername && existingUserByUsername.username !== username) {
      throw new Error("Nome utente già utilizzato da un altro utente");
    }

    const currentUser = await UserDao.findUserByUsername(username);
    if (!currentUser) {
      throw new Error("Utente non trovato");
    }

    const updateFields = {};
    let isUsernameChanged = false;

    if (newEmail !== currentUser.email) {
      updateFields.email = newEmail;
    }

    if (newUsername !== currentUser.username) {
      updateFields.username = newUsername;
      isUsernameChanged = true;
    }

    if (newPassword) {
      updateFields.password = await bcrypt.hash(newPassword, 10);
    }

    // Check if there are fields to update
    if (Object.keys(updateFields).length > 0) {
      await UserDao.updateUser(username, updateFields); // Update user's information

      const updatedUser = await UserDao.findUserByUsername(newUsername);

      if(isUsernameChanged) {
        // Update User's entry in database
        await UserDao.updateUserInDatabase(currentUser.username, newUsername);
      }

      return {
        message: "Informazioni aggiornate con successo",
        newUsername: isUsernameChanged ? newUsername : null,
        token: isUsernameChanged ? AuthService.generateToken(updatedUser) : null,
      };

    } else {
      return { message: "Informazioni aggiornate con successo", newUsername: null, token: null };
    }
  }
}

module.exports = AuthService;
