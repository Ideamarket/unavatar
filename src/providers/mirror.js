'use strict'

const cheerio = require('cheerio')
const got = require('got')

module.exports = async username => {
  const { body } = await got(`https://${username}.mirror.xyz`)
  const $ = cheerio.load(body)
  return $("meta[name='twitter:image']").attr('content')
}

module.exports.supported = {
  email: false,
  username: true,
  domain: false
}
