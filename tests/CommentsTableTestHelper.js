/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addingComment({
    id = 'comment-_pby2_tmXV6bcvcdev8xk', content = 'Lorem ipsum...', owner = 'user-123',
    thread_id = 'thread-h_123', is_delete = false, date = 'test-date',
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, owner, thread_id, is_delete, date],
    };

    await pool.query(query);
  },

  async findCommentbyId(id) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async checkIsDeletedCommentbyId(id) {
    const query = {
      text: 'SELECT is_delete FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    console.log(result)
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
  },
};

module.exports = CommentsTableTestHelper;
