'use strict'

const cheerio = require('cheerio')
const got = require('got')

module.exports = async username => {
  const { body } = await got(`https://tryshowtime.com/${username}`)
  const $ = cheerio.load(body)
  const res = JSON.parse($('script[id="__NEXT_DATA__"]').html())
  if (!res || !res.props || !res.props.pageProps || !res.props.pageProps.img_url) {
    throw new Error('not found')
  }

  return res.props.pageProps.img_url
}

module.exports.supported = {
  email: false,
  username: true,
  domain: false
}
