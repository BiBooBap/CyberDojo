import loginService from "./loginService";

class LoginFacade {
  static async loginByUsername(username, password) {
    return await loginService.loginByUsername(username, password);
  }

  static async loginByEmail(email, password) {
    return await loginService.loginByEmail(email, password);
  }
}

export default LoginFacade;