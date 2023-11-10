/* eslint-disable no-underscore-dangle */
const CreateThread = require('../../Domains/threads/entities/Create_Thread');

class CreateThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasepayload) {
    const newThread = new CreateThread(useCasepayload);
    return this._threadRepository.addThread(newThread);
  }
}

module.exports = CreateThreadUseCase;
