const CommentRepository = require('../../../Domains/comments/Comment_Repository');
const ThreadRepository = require('../../../Domains/threads/Thread_Repository');
const DeleteCommentUseCase = require('../Delete_Comment_UseCase');

describe('Delete Comment Use Case', () => {
  it('should throw error if use case payload not contain thread id and comment id', async () => {
    const useCasepayload = {};
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    await expect(deleteCommentUseCase.execute(useCasepayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_VALID_PAYLOAD');
  });

  it('should throw error if payload not string', async () => {
    // Arrange
    const useCasepayload = {
      thread_id: 1,
      comment: 1,
      owner: 1,
    };
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(deleteCommentUseCase.execute(useCasepayload))
      .rejects
      .toThrowError('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete comment action correctly', async () => {
    // Arrange
    const useCasepayload = {
      thread_id: 'thread-h_123',
      comment: 'comment-_pby2_123',
      owner: 'user_123',
    };
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.checkAvailabilityThread = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.checkAvailabilityComment = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    // Act
    await deleteCommentUseCase.execute(useCasepayload);

    // Assert
    expect(mockThreadRepository.checkAvailabilityThread)
      .toHaveBeenCalledWith(useCasepayload.thread_id);
    expect(mockCommentRepository.checkAvailabilityComment)
      .toHaveBeenCalledWith(useCasepayload.comment);
    expect(mockCommentRepository.verifyCommentOwner)
      .toHaveBeenCalledWith(useCasepayload.comment, useCasepayload.owner);
    expect(mockCommentRepository.deleteComment)
      .toHaveBeenCalledWith(useCasepayload.comment);
  });
});