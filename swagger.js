const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/Index.js', './routes/Users.js', './routes/roomRouter']

swaggerAutogen(outputFile, endpointsFiles)