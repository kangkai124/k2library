const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { bookId } = ctx.request.query
  const comments = await mysql('comments')
    .select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openId', 'cSessionInfo.open_id')
    .where('bookId', bookId)

  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nikeName: info.nikeName,
          avatarUrl: info.avatarUrl
        }
      })
    })
  }
}
