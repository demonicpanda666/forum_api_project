const CreatedThread = require('../../../Domains/threads/entities/Created_Thread');
const CreateThread = require('../../../Domains/threads/entities/Create_Thread');
const ThreadRepository = require('../../../Domains/threads/Thread_Repository');
const CreateThreadUseCase = require('../Create_Thread_UseCase');

describe('Create_Thread_UseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    const useCasepayload = {
      title: 'a thread',
      body: 'Lorem ipsum dolor sit amet',
      owner: 'user-123',
    };

    const expectedCreatedThread = new CreatedThread({
      id: 'thread-h_123',
      title: useCasepayload.title,
      body: useCasepayload.body,
      owner: useCasepayload.owner,
    });

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(new CreatedThread({
        id: 'thread-h_123',
        title: useCasepayload.title,
        body: useCasepayload.body,
        owner: useCasepayload.owner,
      })));

    const getThreadUseCase = new CreateThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const createdThread = await getThreadUseCase.execute(useCasepayload);

    expect(createdThread).toStrictEqual(expectedCreatedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new CreateThread({
      title: useCasepayload.title,
      body: useCasepayload.body,
      owner: useCasepayload.owner,
    }));
  });
});
