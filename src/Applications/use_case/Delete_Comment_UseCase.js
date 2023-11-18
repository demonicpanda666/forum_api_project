/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
class DeleteCommentUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasepayload) {
    const { thread_id, comment, owner } = useCasepayload;
    await this._threadRepository.checkAvailabilityThread(thread_id);
    await this._commentRepository.checkAvailabilityComment(comment);
    await this._commentRepository.verifyCommentOwner(comment, owner);
    await this._commentRepository.deleteComment(comment);
  }
}

module.exports = DeleteCommentUseCase;
