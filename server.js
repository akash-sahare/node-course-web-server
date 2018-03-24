const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((request,response,next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    fs.appendFile('server.log',log +'\n',(err) =>{
        console.log('Unable to connect server');
    });
    next();
});
// app.use((request,response,next) => {
//     response.render('maintenance.hbs');
// });
app.use(express.static(__dirname+'/public'));



hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

app.get('/',(request,response) =>{
    response.render('home.hbs',{
        pageTitle:'HomePage',
        header:'HOME PAGE',
        welcomeMessage:'Welcome Akash',
    });
});

app.get('/about',(request,response) => {
    response.render('about.hbs',{
        pageTitle:'About Page',
        header:'About Page',
    });
})

app.get('/bad',(request,response) => {
    response.send({
        Error : 'Unable to connect' 
    });
})

app.listen(3000 ,() => {
    console.log(`server started - listening at port ${port}`);
});