import userService from "./userService";

class UserFacade {
  static async fetchUserPoints() {
    return await userService.getUserPoints();
  }
}

export default UserFacade;