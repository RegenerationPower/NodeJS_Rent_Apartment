const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routers/index.js', './routers/room.router.js', './routers/apartment.router.js']

swaggerAutogen(outputFile, endpointsFiles)
