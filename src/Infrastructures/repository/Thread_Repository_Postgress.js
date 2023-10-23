const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/Created_Thread');
const ThreadRepository = require('../../Domains/threads/Thread_Repository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(newThread) {
    const { title, body, owner } = newThread;
    const id = `thread-h_${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async checkAvailabilityThread(thread) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [thread],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('thread tidak ditemukan di database');
    }
  }

  async getDetailThread(thread) {
    const query = {
      text: 'SELECT threads.id, title, body, date, username FROM threads LEFT JOIN users ON users.id = threads.owner WHERE threads.id = $1',
      values: [thread],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = ThreadRepositoryPostgres;