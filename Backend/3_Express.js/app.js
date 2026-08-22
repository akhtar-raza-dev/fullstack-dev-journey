//* Library - A library is a collection of pre-written code that can be used to perform specific tasks. Ex - axios
//* Framework - A framework is a set of pre-written code that provides a structure for developing software applications. Ex - Express

//* Express - A Node.js web application framework that helps us to make web applications. It is used for server-side programming.
//todo Express works with 4 main things
// 1) Listen: It starts the server and listens for incoming requests.
// 2) Parse:
// 3) Route: Matches the request to a specific path.
// 4) Response: Sends a response back to the client

//* Ports - They are the logical endpoints of a network connection that is used to exchange information between a web server and a web client.
//* Routing - It is the process of selecting a path for traffic in a network or between or across multiple networks.


const express = require('express');
const app = express();
console.dir(app); // This is an object that contains all the methods and properties of express

let port = 3000; //! or 8080

//* We use app.listen() to start the server. It takes a port number as an argument followed by a callback function.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
//? Ensure that the server is running before using the URL(localhost:3000) in your browser. It shows "Cannot GET /" As till we just listen, not responding anything.

//* 1) app.use() -> use() is like a global filter — it doesn’t care about method or exact path(if path not mentioned then also it doesn't throw error). The path argument is optional and a callback.
// app.use((req,res) => {
//     console.log("Request received") ;

    //? at a time only one of the below lines will execute, as res.send() will end the response.
    // res.send({ some: 'json' }) //! sends the HTTP response in JSON format
    // res.send('Hello World') //! sends the HTTP response in plain text
    // res.send('<h1>some HTML</h1>') //! sends the HTTP response in HTML format
// });

//* 2) app.get() -> get() is a method that is used to define a route for a GET request. It takes a path(if path not found throws error) and a callback function as arguments.
app.get('/', (req, res) => {
    res.send("you contacted root path");
    // console.log("received")
});
app.get('/about', (req, res) => {
    res.send("you contacted about path");
});
app.get('/contact', (req, res) => {
    res.send("you contacted contact path");
});
// ? for Custom responses if not route found using '*' is not working for express version 5x.
// app.get('*', (req, res) => {
//     res.send("Page does not exist");
// });

app.post('/',(req, res) => {
    res.send("you contacted the root path with Post method");
});

//? We simply use app.use() for all the routes.
app.use((req, res) => {
    res.status(404).send("Page does not exist");
});


//todo We counter a problem, if change anything in the code - we need to stop and restart the server again.
// Solution - we are installing nodemon package and installing it globally because if we install it locally then we need to install it in every project.
// syntax - npm install -g nodemon
// In Terminal => nodemon filename.js (not - node filename.js)
// Nodemon - It automatically restarts the server with code changes.

