import loginService from "./loginService";

class LoginFacade {
  // Login with username
  static async loginByUsername(username, password) {
    return await loginService.loginByUsername(username, password);
  }

  // Login with email
  static async loginByEmail(email, password) {
    return await loginService.loginByEmail(email, password);
  }
}

export default LoginFacade;