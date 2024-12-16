import userService from "./userService";

class UserFacade {
  // Fetches the user points from the backend
  static async fetchUserPoints() {
    return await userService.getUserPoints();
  }
}

export default UserFacade;