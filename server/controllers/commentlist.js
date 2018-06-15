const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { bookId, openId } = ctx.request.query

  const select = mysql('comments')
    .select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openId', 'cSessionInfo.open_id')

  let comments
  if (bookId) {
    comments = await select.where('bookId', bookId)
  } else if (openId) {
    comments = await select.where('openId', openId)
  }

  ctx.state.data = {
    list: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        nickName: info.nickName,
        avatarUrl: info.avatarUrl
      })
    })
  }
}
