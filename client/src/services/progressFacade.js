import progressService from "./progressService";

class ProgressFacade {
  // Function to get progress from the server
  static async getProgress() {
    return await progressService.getProgress();
  }
}

export default ProgressFacade;
