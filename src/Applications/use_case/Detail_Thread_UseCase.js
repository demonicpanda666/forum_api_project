const DetailThread = require('../../Domains/threads/entities/Detail_Thread');
const DetailComment = require('../../Domains/comments/entities/Detail_Comment');

class DetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasepayload) {
    const { thread } = new DetailThread(useCasepayload);
    await this._threadRepository.checkAvailabilityThread(thread);
    const detailThread = await this._threadRepository.getDetailThread(thread);
    const getCommentsThread = await this._commentRepository.getCommentsThread(thread);
    detailThread.comments = new DetailComment({ comments: getCommentsThread }).comments;
    return {
      thread: detailThread,
    };
  }
}

module.exports = DetailThreadUseCase;