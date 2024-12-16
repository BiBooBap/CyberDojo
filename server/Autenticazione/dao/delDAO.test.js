const DelDao = require('./delDAO');
const { connect } = require('../../../database/db');
const ExternalRewardsService = require('../../Premi/externalRewardsService');
const ExternalShopService = require('../../Shop/externalShopService');

jest.mock('../../../database/db', () => ({
  connect: jest.fn(),
}));

jest.mock('../../Premi/externalRewardsService', () => ({
  deleteProgress: jest.fn(),
}));

jest.mock('../../Shop/externalShopService', () => ({
  deleteInventory: jest.fn(),
}));

describe('DelDao.deleteUser', () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      collection: jest.fn().mockReturnValue({
        deleteOne: jest.fn(),
        deleteMany: jest.fn(),
      }),
    };
    connect.mockResolvedValue(mockDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('UC_GU_5-OK: should delete a user and related data successfully', async () => {
    const username = 'testUser';

    // Mock database operations
    mockDb.collection().deleteOne.mockResolvedValue({ deletedCount: 1 });
    mockDb.collection().deleteMany.mockResolvedValue({ deletedCount: 5 });

    // Mock external services
    ExternalRewardsService.deleteProgress.mockResolvedValue();
    ExternalShopService.deleteInventory.mockResolvedValue();

    const result = await DelDao.deleteUser(username);

    expect(mockDb.collection).toHaveBeenCalledWith('user');
    expect(mockDb.collection().deleteOne).toHaveBeenCalledWith({ username });
    expect(mockDb.collection).toHaveBeenCalledWith('tickets');
    expect(mockDb.collection().deleteMany).toHaveBeenCalledWith({ user_username: username });
    expect(ExternalRewardsService.deleteProgress).toHaveBeenCalledWith(username);
    expect(ExternalShopService.deleteInventory).toHaveBeenCalledWith(username);
    expect(result).toEqual({ success: true });
  });

  it('UC_GU_5-FAIL: should throw an error if the user is not found', async () => {
    const username = 'nonExistentUser';

    // Mock database operations
    mockDb.collection().deleteOne.mockResolvedValue({ deletedCount: 0 });

    await expect(DelDao.deleteUser(username)).rejects.toThrow('Utente non trovato');

    expect(mockDb.collection().deleteOne).toHaveBeenCalledWith({ username });
    expect(ExternalRewardsService.deleteProgress).not.toHaveBeenCalled();
    expect(ExternalShopService.deleteInventory).not.toHaveBeenCalled();
    expect(mockDb.collection().deleteMany).not.toHaveBeenCalled();
  });
});
