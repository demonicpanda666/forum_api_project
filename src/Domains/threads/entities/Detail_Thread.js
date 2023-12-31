/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
class Detail_Thread {
  constructor(payload) {
    this._verifyPayload(payload);
    const { thread } = payload;
    this.thread = thread;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ thread }) {
    if (!thread) {
      throw new Error('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof thread !== 'string') {
      throw new Error('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Detail_Thread;
