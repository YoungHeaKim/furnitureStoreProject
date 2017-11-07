const knex = require('../knex')

module.exports = {
  joinBoardData() {
    return knex('board')
      .join('board_type', 'board_type.id', 'board.board_type')
  },
  getBoardTypeById({board_type_id}) {
    const board_type = board_type_id
          query = this.joinBoardData({board_type})
    query.where(board_type)
      .orderBy('board.id', 'desc')
    return query
  }
}