const https = require('https')
const { mysql } = require('../qcloud')

function getJson (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
          urlData += data
      })
      res.on('end', () => {
        const bookInfo = JSON.parse(urlData)
          if (bookInfo.title) {
              resolve(bookInfo)
          }
          reject(bookInfo)
      })
    })
  })
}

module.exports = async (ctx) => {
  const { isbn, openId } = ctx.request.body
  if (isbn && openId) {
    const findResource = await mysql('books').select().where('isbn', isbn);
    if (findResource.length) {
      ctx.state = {
        code: 1,
        data: {
          msg: `《${findResource[0].title}》已存在`
        }
      }
      return
    }
    const url = `https://api.douban.com/v2/book/isbn/${isbn}`
    const bookInfo = await getJson(url)
    const rating = bookInfo.rating.average
    const { title, image, alt, publisher, summary, price } = bookInfo
    const tags = bookInfo.tags.map(v => `${v.title} ${v.count}`).join(',')
    const author = bookInfo.author.join(',')
    try {
      await mysql('books').insert({
        isbn, openId, rating, title, image, alt, publisher, summary, price, tags, author
      })
      ctx.state.data = {
        title,
        msg: 'success'
      }
    } catch(e) {
      ctx.state = {
        code: 1,
        data: {
          msg: `新增失败：${e.sqlMessage}`
        }
      }
    }
  }
}
