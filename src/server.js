/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
import express from 'express'

const PORT = 3000

const app = express()

app.get('/', (req, res) => {
  res.send(
    `<html>
      <body>
          <p>Ответ</p>
      </body>
    </html>`
  )
})

app.get('/sign-up', (req, res) => {
  res.send('hello world')
})
app.get('/messenger', (req, res) => {
  res.send('hello world')
})
app.get('/profile', (req, res) => {
  res.send('hello world')
})
app.get('/settings', (req, res) => {
  res.send('hello world')
})
app.get('/change-password', (req, res) => {
  res.send('hello world')
})
app.get('/sign-up', (req, res) => {
  res.send('hello world')
})
app.get('/page500', (req, res) => {
  res.send('hello world')
})
app.get('/page404', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Мой текст в логе после запуска ${PORT}!`)
})
