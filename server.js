'use strict'

// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");
const http = require('http');
var cookieParser = require("cookie-parser");
var morgan = require("morgan");


// Import DB Connection
require("./config/db");
const rateLimit = require('express-rate-limit');



// Rate limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


// Import API route
var user_routes = require('./api/routes/userRoutes');

// create express app
const  app = express();
app.use(express.urlencoded({
    extended: true
}));


app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(limiter)

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

//// set morgan to log info about our requests for development use.
app.use(morgan("dev"));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

user_routes(app)


// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app

const server = http.createServer(app);
// Listen to server
server.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});

