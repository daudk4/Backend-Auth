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

server.post('/create', (req, res) => {
    const { username, email, password, age } = req.body
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })

            const token = jwt.sign({ email }, 'secretKey')
            res.cookie('token', token)
            res.send(createdUser)
        })
    })
})

server.get('/logout', (req, res) => {
    res.cookie('token', "")
    res.redirect('/')
})


server.listen('3000', () => {
    console.log('listening');
})