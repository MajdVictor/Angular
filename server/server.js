/**
 * express constant will be used to set up the express framework
 */
const express = require('express')

/**
 * importing CORS package
 */
const cors = require('cors')


/**
 * Express object used to set up the application
 */
const app = express()

//enable CORS for HTTP requests 
app.use(cors())


/**
 * bodyParser parses the body of the requests coming from the front end
 */
const bodyParser = require('body-parser')

/**
 * Server port
 */
const PORT = 5000

/**
 * import apis from routes/api file
 */
const api = require('./routes/api')

//parsing requests bodies
app.use(bodyParser.json())

app.use('/', api)

/**
 * Listening for any request comes to port 3000
 */
app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT)

    
})