const request = require('request')

const fun =(date, callback)=>{
    const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date='+date

    request({url:url, json:true}, (error, response)=>{
        if(error)
        callback("Unable to connect to api", error)
        else{
            if(response.body.hasOwnProperty('msg')){
               return  callback(undefined, {
                    msg : response.body.msg
                })
            }
            else{
                return callback(undefined, {
                    imgurl : response.body.hdurl,
                    exp : response.body.explanation 
                })
            }
        }
    })
}

module.exports = fun;