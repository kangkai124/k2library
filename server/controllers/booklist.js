const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { pageNum, openId } = ctx.request.query
  const PAGE_SIZE = 10
  const select = mysql('books')
    .select('books.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
    .orderBy('books.id', 'desc')

  let books
  if (openId) {
    books = await select
      .where('books.openId', openId)
  } else {
    books = await select
      .limit(PAGE_SIZE)
      .offset(Number(pageNum) * PAGE_SIZE)
  }

  ctx.state.data = {
    list: books.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, { user_info: { nickName: info.nickName } })
    })
  }
}
