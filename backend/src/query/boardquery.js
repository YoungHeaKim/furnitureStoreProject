const knex = require('../knex')

module.exports = {
  joinBoardData() {
    return knex('board')
      .join('board_type', 'board_type.id', 'board.board_type')
      .join(`user`, 'user.id', 'board.creator')
      .select('board.id', 'board.title', 'board.content', knex.raw("DATE_FORMAT(board.created_at, '%Y-%m-%d') as created_at"), 'board.notify_type', 'board.creator', 'board.board_type', 'board_type.id', 'board_type.type', 'user.nickname')
  },
  getBoardTypeById({board_type}) {
    const query = this.joinBoardData({board_type})
    query.where(board_type)
      .orderBy('board.id', 'desc')
    return query
  },
  getBasicList() {
    return this.joinBoardData().orderBy('board.id', 'desc')
  }
}