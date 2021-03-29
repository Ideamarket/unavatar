'use strict'

const cheerio = require('cheerio')
const got = require('got')

module.exports = async username => {
  const { body } = await got(`https://tryshowtime.com/${username}`)
  const $ = cheerio.load(body)
  const res = $('meta[property="og:image"]').attr('content')
  if (res.includes('home_og_card')) {
    throw new Error('not found')
  }
  return res
}

module.exports.supported = {
  email: false,
  username: true,
  domain: false
}
