const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { pageNum } = ctx.request.query
  const PAGE_SIZE = 10
  const books = await mysql('books')
    .select('books.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
    .limit(PAGE_SIZE)
    .offset(Number(pageNum) * PAGE_SIZE)
    .orderBy('books.id', 'desc')

  ctx.state.data = {
    list: books.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, { user_info: { nickName: info.nickName } })
    })
  }
}
