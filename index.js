const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// handle both / and /<subdomain>/ prefixes
app.get('*', (req, res, next) => {
  const path = req.path.replace(/^\/[^\/]+/, '') || '/'
  if (path === '/health') {
    return res.json({ status: 'ok' })
  }
  if (path === '/' || path === '') {
    return res.json({
      message: 'deployed via hatch',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    })
  }
  next()
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})