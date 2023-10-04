const fs = require('fs')
const path = require('path')

class imagesProductsController {

    static getImageProducts = async (req, res) => {

        const { code } = req.params
        const nameImage = code + '.png'
        let directory;
        if(process.platform === 'linux') {
            directory = path.resolve('home', "HD3", "Imagens-Produtos")
        }else {
            directory = path.resolve(__dirname, "..", "..", "public", "upload")
        }
        const pathFile = path.join(directory, nameImage)

        fs.access(pathFile, fs.constants.F_OK, (err) => {
            if (err) {
                res.json({
                    error: true,
                    urlImage: `http://${process.env.SERVER_ADRESS}:${process.env.PORT}/files/not-found.png`,
                })
            } else {
                res.json({
                    error: false,
                    urlImage: `http://${process.env.SERVER_ADRESS}:${process.env.PORT}/files/${nameImage}`,
                })
            }
        })
    }

}

module.exports = imagesProductsController