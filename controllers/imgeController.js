const mongoose = require('mongoose');
const Image = require('../models/image');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');



exports.getAllImages = function (req, res) {

    Image.find({})
        .sort({ createdDate: 1 })
        .then(images => {
            console.log(images)
            res.json(images)
        })

}




exports.postImage = function (req, res) {

    let file = req.files.imgToUpload


    // generate name for file
    // uuidv4() + ".png" // how to get extension of a file?
    // Getting extension of file:
    // path.extname('ciao/cartella1/.../file.png') ---> returns ".png"


    console.log(file)



    let fileExtension = path.extname(file.name)
    let newNameToFile = uuidv4() + fileExtension  // is a string

    file.mv(path.join(__dirname, "..", "frontend", "public", "uploads", newNameToFile))

    let newImg = new Image({ name: newNameToFile })

    newImg.save()
        .then(savedImg => {
            res.json(savedImg)
            console.log("saved img is ", savedImg)
        })


    // 2) Save the newNameToFile in db

    // 3) return the path and newNameToFile to the fronEnd.



    // let newImage = new Image({
    //     name: name,
    //     relativePath: relativePath
    // })


    // newImage.save()
    //     .then(savedImg => {
    //         res.json(savedImg)
    //         console.log(`img has been svd ${savedImg}`)
    //     })


}



// 4) Delete Image controller.... Not Now, at the end of all.


exports.deleteImage = function (req, res) {
    let id = req.params.id

    Image.findByIdAndDelete(id)
        .then(deletedImage => {
            console.log(deletedImage)

            // remove file
            fs.unlinkSync(path.join(__dirname, "..", "frontend", "public", "uploads", deletedImage.name))

            // send response.
            res.json(deletedImage)
        })


    // deletedImage is null if nothing with that id has been found.
    // throws error at fs.unlin .... because deletedImage.name : cannot read property name of undefined.
}

