const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { bookId, comment, openId, location, phone } = ctx.request.body
  try {
    await mysql('comments').insert({ bookId, comment, openId, location, phone })
    ctx.state.data = { msg: 'success' }
  } catch (err) {
    ctx.state = {
      code: 1,
      data: {
        msg: `失败：${err.sqlMessage}`
      }
    }
  }
}
