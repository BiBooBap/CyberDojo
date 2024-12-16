const UserDao = require('./userDao');
const { connect } = require('../../../database/db');

jest.mock('../../../database/db', () => ({
  connect: jest.fn(),
}));

describe('UserDao.updateUser', () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnValue({
        updateOne: jest.fn(),
      }),
    };
    connect.mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('UC_GU_4-OK: should update user fields successfully', async () => {
    const username = 'testUser';
    const updateFields = { email: 'newemail@example.com', password: 'hashedPassword' };

    mockDb.collection().updateOne.mockResolvedValue({ modifiedCount: 1 });

    const result = await UserDao.updateUser(username, updateFields);

    expect(mockDb.collection).toHaveBeenCalledWith('user');
    expect(mockDb.collection().updateOne).toHaveBeenCalledWith(
      { username },
      { $set: updateFields }
    );
    expect(result).toEqual({ modifiedCount: 1 });
  });

  it('UC_GU_4-FAIL: should handle no fields being updated', async () => {
    const username = 'testUser';
    const updateFields = {};

    mockDb.collection().updateOne.mockResolvedValue({ modifiedCount: 0 });

    const result = await UserDao.updateUser(username, updateFields);

    expect(mockDb.collection).toHaveBeenCalledWith('user');
    expect(mockDb.collection().updateOne).toHaveBeenCalledWith(
      { username },
      { $set: updateFields }
    );
    expect(result).toEqual({ modifiedCount: 0 });
  });

  it('UC_GU_4-FAIL: should throw an error if the database operation fails', async () => {
    const username = 'testUser';
    const updateFields = { email: 'newemail@example.com' };

    mockDb.collection().updateOne.mockRejectedValue(new Error('Database error'));

    await expect(UserDao.updateUser(username, updateFields)).rejects.toThrow('Database error');

    expect(mockDb.collection).toHaveBeenCalledWith('user');
    expect(mockDb.collection().updateOne).toHaveBeenCalledWith(
      { username },
      { $set: updateFields }
    );
  });
});
