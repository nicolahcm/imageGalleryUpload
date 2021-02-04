module.exports = function (app) {

    const ImageController = require('../controllers/imgeController')

    app.get('/api/images', ImageController.getAllImages)

    app.post('/api/images', ImageController.postImage)

    app.delete('/api/images/:id', ImageController.deleteImage)


}