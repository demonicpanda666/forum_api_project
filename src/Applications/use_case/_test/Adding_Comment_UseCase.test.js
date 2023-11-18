const AddedComment = require('../../../Domains/comments/entities/Added_Comment');
const CommentRepository = require('../../../Domains/comments/Comment_Repository');
const AddCommentUseCase = require('../Adding_Comment_UseCase');
const AddComment = require('../../../Domains/comments/entities/Adding_Comment');
const ThreadRepository = require('../../../Domains/threads/Thread_Repository');

describe('Adding Comment Use Case', () => {
  it('should orchestrating the add comment action correctly', async () => {
    const useCasePayload = {
      thread_id: 'thread-h_123',
      content: 'sebuah komentar',
      owner: 'user-123',
    };

    const expectedAddedComment = new AddedComment({
      id: 'comment-_pby2_123',
      content: 'sebuah komentar',
      owner: 'user-123',
    });

    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve());
    mockCommentRepository.addingComment = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedComment({
        id: 'comment-_pby2_123',
        content: useCasePayload.content,
        owner: useCasePayload.owner,
      })));

    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    const addedComment = await getCommentUseCase.execute(useCasePayload);

    expect(mockThreadRepository.checkAvailabilityThread).toBeCalledWith(useCasePayload.thread_id);
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockCommentRepository.addingComment).toBeCalledWith(new AddComment({
      thread_id: useCasePayload.thread_id,
      content: useCasePayload.content,
      owner: useCasePayload.owner,
    }));
  });
});
