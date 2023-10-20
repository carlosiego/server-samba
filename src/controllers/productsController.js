const fs = require('fs')
const path = require('path')
const client = require('../redis')

class imagesProductsController {

    static getImageProducts = async (req, res) => {

        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        const imageFromCache = await client.get(fullUrl)
        if (imageFromCache) {
            return res.json(JSON.parse(imageFromCache))
        }
        const { code } = req.params 
        const nameImage = code + '.png'
        let directory;
        if(process.platform === 'linux') {
            directory = path.resolve("/", "HD3", "Imagens-Produtos")
        }else {
            directory = path.resolve(__dirname, "..", "..", "public", "upload")
        }
        const pathFile = path.join(directory, nameImage)
        fs.access(pathFile, fs.constants.F_OK, async (err) => {
            if (err) {
                await client.set(fullUrl, JSON.stringify(
                    {
                        error: true,
                        urlImage: `http://${process.env.SERVER_ADDRESS}:${process.env.PORT}/files/not-found.png`,
                    }
                ), { EX: process.env.EXPIRATION})
                res.json({
                    error: true,
                    urlImage: `http://${process.env.SERVER_ADDRESS}:${process.env.PORT}/files/not-found.png`,
                })
            } else {
                await client.set(fullUrl, JSON.stringify(
                    {
                        error: false,
                        urlImage: `http://${process.env.SERVER_ADDRESS}:${process.env.PORT}/files/${nameImage}`,
                    }
                ), { EX: process.env.EXPIRATION})
                res.json({
                    error: false,
                    urlImage: `http://${process.env.SERVER_ADDRESS}:${process.env.PORT}/files/${nameImage}`,
                })
            }
        })
    }

}

module.exports = imagesProductsController