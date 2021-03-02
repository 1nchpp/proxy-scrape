const ProxyScraper = require('simple-proxy-scraper');
const axios = require('axios')
const express = require('express')
const fs = require('fs')
const app = express()
require('request')

if (!fs.existsSync('ok.js')) {
  axios.request({
    url: `https://scraper-hub.1nchpp.repl.co/register`,
    method: 'PUT',
    data: {
      ip: `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co/`
    }
  })
  fs.writeFileSync('ok.js', '//ok')
}

app.get('/proxies/:anon/:type', async (req, res) => {
  if (req.params.anon != ('elite' || 'anonymous' || 'transparent' || 'all')) {
    return res.status(401).json({
      message: 'Anonimity must be either elite, anonymous, transparent, or all.'
    })
  }
  if (req.params.type != ('http' || 'socks4' || 'socks5' || 'all')) {
    return res.status(401).json({
      message: 'Type must be either http, socks4, socks5, or all.'
    })
  }
  let options = {
    timeout: 1000,
    proxytype: req.params.type,
    anonimity: req.params.anon,
    country: 'us',
    ssl: 'yes',
    limit: 1000
  }
  res.status(200).json({
    proxies: await ProxyScraper.ProxyScrape.getProxies(options)
  })
})

app.listen(8080)
