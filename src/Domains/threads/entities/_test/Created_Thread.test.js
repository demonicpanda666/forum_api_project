const CreatedThread = require('../Created_Thread');

describe('a Created Thread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'Sample title',
      body: 'Nulla eiusmod esse aliquip do laborum fugiat enim consequat laborum aliquip consequat nulla labore.',
    };

    expect(() => new CreatedThread(payload)).toThrowError('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      title: 'Sint consequat est duis amet consequat in do sit adipisicing quis id magna.',
      owner: true,
    };

    expect(() => new CreatedThread(payload)).toThrowError('CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new thread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-h_123',
      title: 'Culpa irure velit elit ad veniam labore do ut enim.',
      owner: 'user-123',
    };

    // Action
    const createdThread = new CreatedThread(payload);

    // Assert
    expect(createdThread.id).toEqual(payload.id);
    expect(createdThread.title).toEqual(payload.title);
    expect(createdThread.owner).toEqual(payload.owner);
  });
});