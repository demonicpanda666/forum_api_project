/* eslint-disable no-underscore-dangle */
const CreateThread = require('../../Domains/threads/entities/Create_Thread');

class CreateThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const newThread = new CreateThread(useCasePayload);
    return this._threadRepository.createThread(newThread);
  }
}

module.exports = CreateThreadUseCase;
