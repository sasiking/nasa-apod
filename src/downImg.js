const imageDownloader = require('node-image-downloader')

const  downImg = async (url, date, callback) =>{
        console.log(url, date)
        imageDownloader({
        imgs: [
          {
            uri: url,
            filename: date
          }
        ],
        dest: '../Quantiply/public/img', //destination folder
      })
        .then((info) => {
          console.log('all done', info)
        })
        .catch((error, response, body) => {
          console.log('something goes bad!')
          console.log(error)
        })
}


module.exports = downImg