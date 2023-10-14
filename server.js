const express = require ('express')
const app = express()
const port = 3000
const path = require('path')
const fs = require('fs')

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

let chatData = require('./chatdata.json')

app.get('/api/messages', (req, res) => {
    res.json(chatData)
})

app.post('/api/messages', (req, res) => {
    const newMessage = req.body
    chatData.push(newMessage)

    fs.writeFileSync('./chatdata.json', JSON.stringify(chatData))

    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Server on ${port}`)
})
