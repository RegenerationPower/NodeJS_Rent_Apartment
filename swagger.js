const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/Index.js', './routes/RoomRouter.js', './routes/ApartmentRouter.js']

swaggerAutogen(outputFile, endpointsFiles)
