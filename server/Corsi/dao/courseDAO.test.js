const CourseDAO = require('./courseDAO');
const { connect } = require('../../../database/db');

jest.mock('../../../database/db', () => ({
  connect: jest.fn(),
}));

describe('CourseDAO.enrollCourse', () => {
  let mockDb;

  beforeEach(() => {
    // Mock del database
    mockDb = {
      collection: jest.fn().mockReturnValue({
        updateOne: jest.fn(),
        findOne: jest.fn(),
      }),
    };
    connect.mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('UC_GU_6-OK: should enroll a user in a course successfully', async () => {
    const courseId = '123';
    const username = 'testUser';
    const courseInfo = { lessons: [{ name: 'Introduction' }] };

    jest.spyOn(CourseDAO, 'getCourseInfo').mockResolvedValue(courseInfo);

    mockDb.collection().updateOne.mockResolvedValue({ modifiedCount: 1 });

    const result = await CourseDAO.enrollCourse(courseId, username);

    expect(CourseDAO.getCourseInfo).toHaveBeenCalledWith(courseId);
    expect(mockDb.collection).toHaveBeenCalledWith('user');
    expect(mockDb.collection().updateOne).toHaveBeenCalledWith(
      { username },
      {
        $push: {
          enrolled_courses: {
            course_id: courseId,
            lesson_reached: 'Introduction',
          },
        },
      }
    );
    expect(result).toEqual({ modifiedCount: 1 });
  });

  it('UC_GU_6-FAIL: should throw an error if the database operation fails', async () => {
    const courseId = '789';
    const username = 'testUser';

    jest.spyOn(CourseDAO, 'getCourseInfo').mockResolvedValue({ lessons: [{ name: 'Lesson1' }] });
    mockDb.collection().updateOne.mockRejectedValue(new Error('Database error'));

    await expect(CourseDAO.enrollCourse(courseId, username)).rejects.toThrow('Database error');

    expect(CourseDAO.getCourseInfo).toHaveBeenCalledWith(courseId);
    expect(mockDb.collection().updateOne).toHaveBeenCalled();
  });
});

describe('CourseDAO.getEnrolledCourses', () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnValue({
        findOne: jest.fn(),
      }),
    };
    connect.mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('UC_GU_7-OK: should return enrolled courses for a valid user', async () => {
    const username = 'testUser';
    const enrolledCourses = [
      { course_id: '123', lesson_reached: 'Lesson1' },
      { course_id: '456', lesson_reached: 'Lesson2' },
    ];

    mockDb.collection().findOne.mockResolvedValue({ username, enrolled_courses: enrolledCourses });

    const result = await CourseDAO.getEnrolledCourses(username);

    expect(mockDb.collection).toHaveBeenCalledWith('user');
    expect(mockDb.collection().findOne).toHaveBeenCalledWith({ username });
    expect(result).toEqual(enrolledCourses);
  });

  it('UC_GU_7-FAIL: should handle database operation failure', async () => {
    const username = 'testUser';

    mockDb.collection().findOne.mockRejectedValue(new Error('Database error'));

    await expect(CourseDAO.getEnrolledCourses(username)).rejects.toThrow('Database error');

    expect(mockDb.collection).toHaveBeenCalledWith('user');
    expect(mockDb.collection().findOne).toHaveBeenCalledWith({ username });
  });
});
