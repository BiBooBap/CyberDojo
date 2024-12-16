const { connect } = require('../../../database/db');
const RewardService = require('./testDAO'); // Nome del file contenente il metodo addReward

jest.mock('../../../database/db', () => ({
  connect: jest.fn(),
}));

describe('RewardService.addReward', () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              project: jest.fn().mockReturnValue({
                toArray: jest.fn(),
              }),
            }),
          }),
        }),
        insertOne: jest.fn(),
      }),
    };
    connect.mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('UC_GU_9-OK: should successfully add a reward', async () => {
    const reward = { name: 'Test Reward', points: 100 };

    // Mock database responses
    mockDb.collection().find().sort().limit().project().toArray.mockResolvedValue([{ _id: 1 }]);
    mockDb.collection().insertOne.mockResolvedValue({ insertedId: 2 });

    const result = await RewardService.addReward(reward);

    expect(mockDb.collection).toHaveBeenCalledWith('rewards');
    expect(mockDb.collection().find).toHaveBeenCalled();
    expect(mockDb.collection().insertOne).toHaveBeenCalledWith({ ...reward, _id: 2 });
    expect(result).toEqual(2);
  });

  it('UC_GU_9-FAIL: should throw an error if the database operation fails', async () => {
    const reward = { name: 'Error Reward', points: 10 };

    // Mock database response with an error
    mockDb.collection().find().sort().limit().project().toArray.mockRejectedValue(new Error('Database error'));

    await expect(RewardService.addReward(reward)).rejects.toThrow('Database error');

    expect(mockDb.collection).toHaveBeenCalledWith('rewards');
    expect(mockDb.collection().find).toHaveBeenCalled();
    expect(mockDb.collection().insertOne).not.toHaveBeenCalled();
  });
});
