const path = require('path')
const bcrypt = require('bcrypt')
const express = require('express')
const jwt = require('jsonwebtoken')
const userModel = require('./models/user')
const cookieParser = require('cookie-parser')

const server = express()

server.set('view engine', "ejs")
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())
server.use(express.static(path.join(__dirname, 'public')))


server.get('/', (req, res) => {
    res.render('index')
})

server.get('/read', (req, res) => {
    res.send(req.cookies.name)
})


server.listen('3000', () => {
    console.log('listening');
})