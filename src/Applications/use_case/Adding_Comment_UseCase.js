/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const AddComment = require('../../Domains/comments/entities/Adding_Comment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { thread_id } = useCasePayload;
    await this._threadRepository.checkAvailabilityThread(thread_id);
    const newComment = new AddComment(useCasePayload);
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
