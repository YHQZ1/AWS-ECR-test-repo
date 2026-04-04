const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/', (req, res) => {
  res.json({
    message: 'deployed via hatch',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})