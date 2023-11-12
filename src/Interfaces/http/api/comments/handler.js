/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const AddCommentUseCase = require('../../../../Applications/use_case/Adding_Comment_UseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/Delete_Comment_UseCase');

class CommentHandler {
  constructor(container) {
    this._container = container;
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const { id: owner } = request.auth.credentials;
    const thread_id = request.params.threadId;
    const useCasePayload = {
      content: request.payload.content,
      thread_id,
      owner,
    };
    const addedComment = await addCommentUseCase.execute(useCasePayload);

    return h.response({
      status: 'success',
      data: {
        addedComment,
      },
    }).code(201);
  }

  async deleteCommentHandler(request, h) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const { id: owner } = request.auth.credentials;
    const thread_id = request.params.threadId;
    const comment = request.params.commentId;
    const useCasePayload = {
      thread_id,
      comment,
      owner,
    };
    await deleteCommentUseCase.execute(useCasePayload);

    return h.response({
      status: 'success',
    });
  }
}

module.exports = CommentHandler;
