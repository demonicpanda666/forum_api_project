const ThreadRepository = require('../Thread_Repository');

describe('a Thread Repository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    const threadRepository = new ThreadRepository();

    await expect(threadRepository.createThread({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.checkAvailabilityThread('')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.getDetailThread('')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});