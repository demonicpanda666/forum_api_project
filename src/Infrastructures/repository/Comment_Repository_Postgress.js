const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/Comment_Repository');
const AddedComment = require('../../Domains/comments/entities/Added_Comment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addingComment(newComment) {
    const { content, thread_id, owner } = newComment;
    const id = `comment-_pby2_${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, FALSE ,$5) RETURNING id, content, owner',
      values: [id, thread_id, content, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedComment(result.rows[0]);
  }

  async checkAvailabilityComment(comment) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [comment],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('komentar tidak ditemukan di database');
    }
  }

  async verifyCommentOwner(comment, owner) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND owner = $2',
      values: [comment, owner],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new AuthorizationError('anda tidak bisa menghapus komentar orang lain.');
    }
  }

  async deleteComment(comment) {
    const query = {
      text: 'UPDATE comments SET is_delete=TRUE WHERE id = $1',
      values: [comment],
    };

    await this._pool.query(query);
  }

  async getCommentsThread(thread) {
    const query = {
      text: 'SELECT comments.id, users.username, comments.date, comments.content, comments.is_delete FROM comments LEFT JOIN users ON users.id = comments.owner WHERE thread = $1 ORDER BY comments.date ASC',
      values: [thread],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }
}

module.exports = CommentRepositoryPostgres;