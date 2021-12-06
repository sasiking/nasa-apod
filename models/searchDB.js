const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'nasa-apod'

const con = (date, callback)=>{

    MongoClient.connect(connectUrl, {useNewUrlParser: true}, (error, client)=>{
        if(error)
        return console.log("Error Occurred");
        
        //console.log("Connected to MongoDB ")
        const db = client.db(dbName)

        // var myCursor = db.collection('calories').find( { source: "cheese" } )
        // myCursor.each(function(err, doc) {
        //     console.log(doc);
        // });
        // console.log("hello")
        db.collection('apod').find({date:date}).toArray((err, result) =>{
            if(err)
                return callback(undefined, err)
            else
                return callback(undefined, result)
        })
        // myCursor.each(function(err, doc) {
        //     console.log(doc);
        // });

    })
}
//mongod --dbpath=d:\DataBase
module.exports = con
