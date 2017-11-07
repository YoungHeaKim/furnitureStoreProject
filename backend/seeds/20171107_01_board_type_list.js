const boardList = [
  {type: '공지사항 관리'},
  {type: '문의사항 관리'},
  {type: '채용공고 관리'},
  {type: '자료실 관리'},
  {type: '사용자 관리'},
  {type: '사용자 권한 관리'},
  {type: '프로그램 코드 관리'},
  {type: '시스템 코드 관리'}
]

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('board_type').del()
    .then(() => {
      return knex('board_type').insert(boardList)
    })
}
