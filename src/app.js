//importing modules
const exp = require('express')
const fun = require('./req')
const path = require('path');
const con = require('../models/searchDB')
const insertToDB = require('../models/connect')
const downImg = require('./downImg')

//express middleware
const app = exp();
app.set('view engine', 'hbs')

const abpath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../views')

app.use(exp.static(abpath))


//const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2021-11-28'
//Routes
app.get('' ,(req,resp)=>{
    resp.render('index', {
        title : "APOD site"
    })
})


app.get('/apod', (req, resp) => {

    console.log("Inside app.get",req.query.date)

    con(req.query.date, (error, res)=>{
        if(error)
        resp.send({
            exps : "Error:  " + res
        })
        else if(res.length===0){
            console.log("Inside, con",req.query.date)

            fun(req.query.date, (error, data)=>{
                console.log("Inside fun bacuse res is 0",res.length)
                if(error){
                    resp.send({
                        exps : "Error in:  " + error
                    })
                }
                
                else if(data.msg){
                    return resp.send({
                        exps : "Error:  " + data.msg
                    })
                }
                //inserting into db
                insertToDB(data, req.query.date, (error, result)=>{
                    console.log('Inserted into DB')
                })
                
                downImg(data.imgurl, req.query.date, (error, result)=>{
                    console.log("Downloaded Sucessfully")
                })
                resp.send({
                    imgurl : data.imgurl,
                    exps : "Explanation:  " +data.exp
                })
            })
        }
        else{
            console.log(res);
            console.log(res[0].exp);
            console.log(res[0].date.toString() + ".jpg")
            resp.send({
                imgurl : 'http://localhost:3000/img/'+res[0].date.toString() + ".jpg",
                exps : "Explanation:  " +res[0].exp
            })
        }

    })    
    //resp.send("Running Successfully")
    // console.log(req.query.date)
    // console.log(data.imgurl, data.exp)
})



app.get('*', (req, resp) => {
    resp.send("<h1>Error 404, Can't Find the Page</h1>")
})

app.listen(3000, ()=>{
    console.log("Server is running");
})
