'use strict'

const pAny = require('p-any')
const cheerio = require('cheerio')
const got = require('got')

const getAvatarUrl = async (username, bySlugProp) => {
  if (bySlugProp === 'id') {
    throw 'id not supported'
  }

  const { body } = await got(`https://www.youtube.com/c/${username}`)
  const $ = cheerio.load(body)
  return $('link[itemprop=thumbnailUrl]')
    .attr('href')
    .replace('s900', 's200')
}

module.exports = async username =>
  pAny([getAvatarUrl(username, 'forUsername'), getAvatarUrl(username, 'id')])

module.exports.supported = {
  email: false,
  username: true,
  domain: false
}
