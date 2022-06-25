const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true })

const articalSchema = {
    title: String,
    content: String
}

const Artical = mongoose.model("Artical", articalSchema);



const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.route("/artical")
    .get((req, res) => {
        Artical.find((err, foundArtical) => {
            if (!err) {
                res.send(foundArtical)
            }
            else {
                console.log(err)
            }
        })
    })
    .post((req, res) => {
        const newArtical = new Artical({
            title: req.body.title,
            content: req.body.content
        })
        newArtical.save((err) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send("evrything cool")
            }
        })


    })
    .delete((req, res) => {
        Artical.deleteMany((err) => {
            if (err) {
                res.send(err)
            }
            else {
                res.send("Deleted Succesfully")
            }
        })
    })

///////////////////////// Finading One artical ////////////

app.route("/artical/:articalName")
    .get((req,res) =>{
        Artical.findOne({title : req.params.articalName}, (err , foundArtical) =>{
            if (err){
                res.send(err)
            }
            else{
                res.send(foundArtical.content)
            }
        })
    })
    .put((req,res) =>{
        Artical.updateOne({title : req.params.articalName} , {title : req.body.title , content : req.body.content} ,{overwrite : true}, (err) =>{
            if (err){
                res.send(err)
            }else{
                res.send("Successfully Updated")
            }
        })
    })
    .patch((req,res) =>{
        Artical.updateOne({title: req.params.articalName} , {$set : req.body} , (err) =>{
            if (err){
                res.send(err)
            }else{
                res.send("Succesfully Updated")
            }
        })
    })
    .delete((req,res) =>{
        Artical.deleteOne({title : req.params.articalName} , (err) =>{
            if (err){
                res.send(err)
           }else{
               res.send("Succesfully deleted")
           }
        })
    })
app.listen(3000, () => {
    console.log("Server started on port 3000")
})