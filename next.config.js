// css跟less 并存使用
const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
module.exports = withLess(withCSS({}))