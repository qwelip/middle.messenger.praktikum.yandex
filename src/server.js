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

app.listen(PORT, () => {
  console.log(`Мой текст в логе после запуска ${PORT}!`)
})
