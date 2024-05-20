import { v2 as cloudinary } from 'cloudinary';
import fsExtra from 'fs-extra'
cloudinary.config({
  cloud_name: process.env.VITE_CLOUD_NAME,
  api_key: process.env.VITE_API_KEY,
  api_secret: process.env.VITE_API_SECRET
})
// cloudinary.config({
//   cloud_name: 'dh9thxuci', 
//   api_key: '224711372668445', 
//   api_secret: '***************************'
// })



const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    const filePath = `uploads/${file.filename}`
    cloudinary.uploader.upload(filePath,
      { 
        folder: 'store-images',
        public_id: file.filename
       },
      function (error, result) {
        if(error){
          reject(error)
          return
        }
        fsExtra.removeSync(filePath)
        resolve(result)
      });


  })

}

export default uploadFile