require('dotenv').config()
const express = require('express')
const routes = require('./routes/index.js')
const path = require('path')
const app = express()


if (process.platform === 'linux') {
	app.use('/files', express.static(path.resolve("\\home", "HD3", "Imagens-Produtos")))
} else {
	app.use('/files', express.static(path.resolve(__dirname, "..", "public", "upload")))
}
console.log(path.resolve("\\home", "HD3", "Imagens-Produtos"))
app.use(express.json())

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET");
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

routes(app)

app.listen(process.env.PORT, () => {
  console.log(`Servidor escutando em http://${process.env.SERVER_ADDRESS}:${process.env.PORT}`)
})
