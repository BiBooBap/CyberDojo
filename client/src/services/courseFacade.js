import corsiService from "./courseService";

const courseFacade = {
  getAllCourses: async (token) => {
    return await corsiService.getCourses(token);
  },
};

export default courseFacade;
