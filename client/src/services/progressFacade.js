import progressService from "./progressService";

class ProgressFacade {
  static async getProgress() {
    return await progressService.getProgress();
  }
}

export default ProgressFacade;
