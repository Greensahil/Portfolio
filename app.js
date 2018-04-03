

var express = require('express');
var app     = express();
var bodyParser= require('body-parser');
var nodemailer=require('nodemailer')


// let transporter = nodemailer.createTransport(options[, defaults])

app.set('view engine','ejs')
app.use(express.static(__dirname+ "/public"));
app.use(express.static(__dirname + "/img"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());


app.post("/send",function(req,res){
    const output=`
    <p>You have a new contact request</p>
    <h3>Contact detalis</h3>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Email:${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
        host: 'smtp.mailgun.org',
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'postmaster@sandbox9e932c7cd76c40c782731e8a66509aa5.mailgun.org', // generated ethereal user
            pass: 'ede26dd4cad13a9de091becff7892b16-bdd08c82-77e81c50' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer contact" <foo@example.com>', // sender address
        to: 'greenncoder@gmail.com', // list of receivers
        subject: 'Node contact request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    res.render('index',{msg:"Email has been sent"})
    
    
})

app.get("/",function(req,res){
    res.render('index')
    
    
})


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});