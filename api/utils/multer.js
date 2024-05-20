import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(!file){
            return
        }
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueId}-${file.originalname}` )
    }
})

const upload = multer({ storage: storage })

export default upload