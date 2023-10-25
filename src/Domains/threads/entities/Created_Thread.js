/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
class Created_Thread {
  constructor(payload) {
    this._verifyPayload(payload);
    const {
      id, title, owner,
    } = payload;
    this.id = id;
    this.title = title;
    this.owner = owner;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({
    id, title, owner,
  }) {
    if (!id || !title || !owner) {
      throw new Error('CREATED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof id !== 'string' || typeof title !== 'string' || typeof owner !== 'string') {
      throw new Error('CREATED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Created_Thread;
