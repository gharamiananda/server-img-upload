
const bodyParser = require('body-parser')
const express = require('express')
const path = require("path")
var cors = require('cors')
const app = express()
const port = 5000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
const multer = require('multer')

const UPLOADS_FOLDER = "../image-node/src/uploads/images";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, UPLOADS_FOLDER)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") + "-" + Date.now();
        cb(null, fileName + fileExt)
    }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/images', upload.single('image'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        res.send | ({ code: 500, msg: 'error' })
    } else {
        res.send({ code: 200, msg: "upload successfully" })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
