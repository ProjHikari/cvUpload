var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const fs = require("fs");
// var http = require('http');
// var nStatic = require('node-static');
// var fileServer = new nStatic.Server('./public/08-2020/Hero');
app.use(cors())


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = __dirname + "/public/" + req.body.date;
        var dir2 = dir + "/" + req.body.role;
        try {
            if (fs.existsSync(__dirname + "/public/" + req.body.date + "/" + req.body.role)) {
                console.log("Directory exists.")
                cb(null, dir + "/" + req.body.role)
            } else {
                console.log("Directory does not exist.")
                fs.mkdir(dir, function (err) {
                    if (err) {
                        console.log(dir + " already exits")
                    } else {
                        console.log("New directory successfully created.")
                    }
                })

                fs.mkdir(dir2, function (err) {
                    if (err) {
                        console.log(dir2 + " already exits")
                    } else {
                        console.log("New directory successfully created.")
                    }
                })
                cb(null, dir + "/" + req.body.role)
            }
        } catch (e) {
            console.log("An error occurred.")
        }


    },
    filename: function (req, file, cb, res) {
        console.log(file.mimetype)
        if (file.mimetype === "application/pdf") {
            cb(null, req.body.candidate + "-" + req.body.exp + ".pdf")
        }
        else {
            console.log("Invalid file type")
            return res.status(415).send(err)
        }
    }
})

var upload = multer({ storage: storage }).array('file')


app.get('/', function (req, res) {
    app.use('/', express.static(__dirname + '/public/08-2020/Hero'));
    // return res.send('Hello Server')
    try {
        const arrayOfFiles = fs.readdirSync("./public/08-2020")
        // console.log(arrayOfFiles)
        let file = "<a href='/Tenori-8-Years.pdf'>CV</a>"
        file += `<ul>${arrayOfFiles.map((k, v) => `<li key=${v}>${k}</li>`)}</ul>`
        return res.send(file)
    } catch (e) {
        console.log(e)
    }


})

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
            // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
            // An unknown error occurred when uploading.
        }
        return res.status(200).send(req.file)
        // Everything went fine.
    })
});

// http.createServer(function (req, res) {

//     fileServer.serve(req, res);
//     console.log("node static at 5000")
// }).listen(5000);

app.listen(8000, function () {
    console.log('App running on port 8000');
});