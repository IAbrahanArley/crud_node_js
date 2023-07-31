const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')

//DB
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

server.use(bodyParser.urlencoded({extended:true}))
server.use(bodyParser.json())
server.use(cors())

//ODM

const Client = restful.model('Client', {
    name: {type: String, required: true}
})

// rest API

Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({new: true, runValidators: true})

//routes
Client.register(server, '/clients')

server.listen(3000)