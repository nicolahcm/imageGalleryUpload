const express = require('express'),
    app = express(),
    fileUpload = require('express-fileupload'),
    mongoose = require('mongoose'),
    Image = require('./models/image'),
    imageController = require('./controllers/imgeController'),
    morgan = require('morgan'),
    cors = require('cors');


mongoose.connect("mongodb://localhost/imageGalleryProject", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log(`connection with mongoDB estabilished!`))
    .catch(err => console.error(`error while connecting with mongodb. Error: ${err}`))



app.use(cors())
app.use(morgan('dev'))
app.use(fileUpload())
app.use(express.json())





const imageRoutes = require('./routes/image')

imageRoutes(app)











PORT = process.env.PORT || 3000




app.listen(PORT, err => {
    if (err) {
        console.log('some error in the listening happened')
    } else {
        console.log(`listening on PORT ${PORT}`)
    }
})