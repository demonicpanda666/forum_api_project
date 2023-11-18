/* eslint-disable camelcase */
const DeleteComment = require('../Delete_Comment');

describe('a Delete Comment entities', () => {
  it('should throw error when payload did not contain needed property', async () => {
    const payload = {
      thread_id: 'thread-h_123',
      owner: 'user-123',
    };
    await expect(new DeleteComment(payload)).toThrowError('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_VALID_PAYLOAD');
  });

  it('should throw error when payload did not meet data type specification', async () => {
    // Arrange
    const payload = {
      thread_id: 'thread-h_123',
      owner: 'user-123',
      content: true,
    };

    // Action & Assert
    await expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should delete comment object correctly', () => {
    const payload = {
      thread_id: 'thread-h_123',
      owner: 'user-123',
      content: 'ini komentar',
    };

    const { content, thread_id, owner } = new DeleteComment(payload);

    expect(content).toEqual(payload.content);
    expect(thread_id).toEqual(payload.thread_id);
    expect(owner).toEqual(payload.owner);
  });
});
