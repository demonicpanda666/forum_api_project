const CommentRepository = require('../../../Domains/comments/Comment_Repository');
const ThreadRepository = require('../../../Domains/threads/Thread_Repository');
const DetailThreadUseCase = require('../Detail_Thread_UseCase');

describe('Detail Thread Use Case', () => {
  it('should get return detail thread correctly', async () => {
    const useCasePayload = {
      thread: 'thread-h_123',
    };

    const expectedThread = {
      id: 'thread-h_123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08 14.00',
      username: 'dicoding',
    };

    const expectedComment = [
      {
        id: 'comment-_pby2_tmXV6bcvcdev8xk',
        username: 'dicoding',
        date: '2021-08-08 14.00',
        content: 'sebuah comment',
        is_delete: 0,
      },
      {
        id: 'comment-_pby2_tmXV6bcvcdev8xk',
        username: 'dicoding',
        date: '2021-08-08 14.00',
        content: 'sebuah comment',
        is_delete: 1,
      },
    ];

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve());
    mockThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));
    mockCommentRepository.getCommentsThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComment));

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const detailThread = await detailThreadUseCase.execute(useCasePayload);

    expect(mockThreadRepository.getDetailThread)
      .toHaveBeenCalledWith(useCasePayload.thread);
    expect(mockCommentRepository.getCommentsThread)
      .toHaveBeenCalledWith(useCasePayload.thread);
    expect(detailThread).toStrictEqual({
      thread: {
        id: 'thread-h_123',
        title: 'sebuah thread',
        body: 'sebuah body thread',
        date: '2021-08-08 14.00',
        username: 'dicoding',
        comments: [
          {
            id: 'comment-_pby2_tmXV6bcvcdev8xk',
            username: 'dicoding',
            date: '2021-08-08 14.00',
            content: 'sebuah comment',
          },
          {
            id: 'comment-_pby2_tmXV6bcvcdev8xk',
            username: 'dicoding',
            date: '2021-08-08 14.00',
            content: '**komentar telah dihapus**',
          },
        ],
      },
    });
  });
});
