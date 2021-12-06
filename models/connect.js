const mongodb = require('mongodb')


const MongoClient = mongodb.MongoClient

const connectUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'nasa-apod'
const insertToDB = (data,date, callback)=>{
    
    MongoClient.connect(connectUrl, {useNewUrlParser: true}, (error, client)=>{
        if(error)
        return console.log("Error Occurred");
        
        //console.log("Connected to MongoDB ")
        const db = client.db(dbName)
    
        db.collection('apod').insertOne({
            date : date, 
            exp : data.exp
        }, (error, result) => {
            if(error)
            return callback(undefined,error)
            else
            return callback(undefined,result)
        })
    })
}

module.exports = insertToDB


/**
const imageDownloader = require('node-image-downloader')

imageDownloader({
  imgs: [
    {
      uri: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      filename: 'my-image-file-name'
    },
    {
      uri: 'https://s.cdpn.io/3/kiwi.svg' // in this case filename will be kiwi.svg
    }
  ],
  dest: './downloads', //destination folder
})
  .then((info) => {
    console.log('all done', info)
  })
  .catch((error, response, body) => {
    console.log('something goes bad!')
    console.log(error)
  })
*/
