//* Templating - It is a process of creating a template for a web page or an application. Some Popular Templating are Handlebars, EJS, Pug (formerly Jade), Mustache.
//* EJS(Embedded JavaScript) - It is a simple templating language that lets you generate HTML markup with plain JavaScript. It is a popular choice for Node.js applications.
//? It is less used in era of React - You use EJS or Handlebars when you just need the server to quickly spit out a static HTML document or an email layout.

const express = require('express');
const app = express();
const path = require('path'); //! path is used to specify the path of the file. if we start the server with not the direct directory where the views folder is.

//? We can notice that we have not require() ejs package like express because it is internally required by express by default.
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, "/views")); //!  we whatever mentioned the dir name /views it should be same(whatever name we can give to views but recommended to use views)
//! __dirname - It is a special variable that contains the absolute path of the current directory (for ex- backend/4_EJS/ ). +  /views -> backend/4_EJS/views


let port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

app.get('/', (req, res) => {
    res.render("home.ejs"); //? if we don't specify the extension, it will automatically search for the file with .ejs extension in the views folder. note that we not specify the path of the file by default express will search in the views folder.
});

app.get('/about', (req, res) => {
    res.send("this is added in code to demonstrate that if we run the server with path like nodemon 4_EJS/index.js, it will not search for the views folder. So we need to specify the path of the file using path package which does need to be installed, just require it. ");
});


//todo - Passing data to EJS
app.get('/roll', (req, res) => {

    let diceVal = Math.floor(Math.random() * 6) + 1;

//? res.render("rolldice.ejs", { num : diceVal}); //To pass data from database to the ejs file we also pass the second argument as an object(key-value pair) and then we can access the data in the ejs file using the key
//? res.render("rolldice.ejs", { diceVal : diceVal}); //we can use same key and value name

//! OR best way to pass one variable.
    res.render("rolldice.ejs", { diceVal });

});

//* A little instagram username page
app.get('/ig/:user', (req, res) => {
    let { user : username } = req.params; //? we can change the user to username if we want to change the name of the variable.
    let followers = ["Sam", "Raza", "Akhtar"];
    res.render("instagram.ejs", { username , followers });
});

