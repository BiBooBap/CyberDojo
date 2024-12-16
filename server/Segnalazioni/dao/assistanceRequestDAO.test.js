const { connect } = require('../../../database/db');
const TicketService = require('./assistanceRequestDAO'); // Nome del file contenente il metodo addMessage

jest.mock('../../../database/db', () => ({
  connect: jest.fn(),
}));

describe('TicketService.addMessage', () => {
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

  it('UC_GA_2-OK: should successfully add a message to a ticket', async () => {
    const ticketId = '1';
    const username = 'adminUser';
    const message = 'des1';
    const role = 'admin';

    // Mock database response
    mockDb.collection().updateOne.mockResolvedValue({ modifiedCount: 1 });

    const result = await TicketService.addMessage(ticketId, username, message, role);

    expect(mockDb.collection).toHaveBeenCalledWith('tickets');
    expect(mockDb.collection().updateOne).toHaveBeenCalledWith(
      { _id: parseInt(ticketId) },
      {
        $push: {
          messages: {
            username,
            message,
            role,
            timestamp: expect.any(Date),
          },
        },
      }
    );
    expect(result.modifiedCount).toEqual(1);
  });

  it('UC_GA_2-FAIL: should throw an error if the database operation fails', async () => {
    const ticketId = '1';
    const username = 'adminUser';
    const message = 'des1';
    const role = 'admin';

    // Mock database response with an error
    mockDb.collection().updateOne.mockRejectedValue(new Error('Database error'));

    await expect(TicketService.addMessage(ticketId, username, message, role)).rejects.toThrow('Database error');

    expect(mockDb.collection).toHaveBeenCalledWith('tickets');
    expect(mockDb.collection().updateOne).toHaveBeenCalledWith(
      { _id: parseInt(ticketId) },
      {
        $push: {
          messages: {
            username,
            message,
            role,
            timestamp: expect.any(Date),
          },
        },
      }
    );
  });
});
