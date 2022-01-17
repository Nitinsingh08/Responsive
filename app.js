// requiring modules

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const https = require("https");
const { request, Router } = require("express");

// INTIALIZING EXPRESS APP
const app = express();
// CONNECTING TO MONGOOSE
mongoose.connect(
    "mongodb+srv://TrustMeDecor:XdE2FreUqqKekh4@cluster0.1v8mw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true }
);
// CREATING A DATA SCHEMA
const userSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: String,
    time: String,
    pincode: Number,
    occasion: String,
    address: String,
    addresstwo: String,
});

//CREATING A MODEL
const User = new mongoose.model("User", userSchema);
//PORT
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GETTING THE PRODUCTS DATABASE FROM THE JSON FILE IN APP.JS
let products = [{
        id: 0,
        title: "Birthday Special",
        img1: "Resources/1/1.jpg",
        img2: "Resources/1/2.jpg",
        img3: "Resources/1/2.jpg",
        price: 1200,
    },
    {
        id: 1,
        title: "Birthday Special 2",
        img1: "Resources/2/1.jpg",
        img2: "Resources/2/2.jpg",
        img3: "Resources/2/3.jpg",
        price: 1500,
    },
    {
        id: 2,
        title: "Birthday Special 3",
        img1: "Resources/3/1.jpg",
        img2: "Resources/3/2.jpg",
        img3: "Resources/3/3.jpg",
        price: 1800,
    },
    {
        id: 3,
        title: "Birthday Special 4",
        img1: "Resources/4/1.jpg",
        img2: "Resources/4/2.jpg",
        img3: "Resources/4/3.jpg",
        price: 2100,
    },
    {
        id: 4,
        title: "Birthday Special 5",
        img1: "Resources/5/1.jpg",
        img2: "Resources/5/1.jpg",
        img3: "Resources/5/1.jpg",
        price: 2400,
    },
    {
        id: 5,
        title: "Birthday Special 6",
        img1: "Resources/6/1.jpg",
        img2: "Resources/6/2.jpg",
        img3: "Resources/6/3.jpg",
        price: 2100,
    },
    {
        id: 6,
        title: "Birthday Special 7",
        img1: "Resources/7/1.jpg",
        img2: "Resources/7/2.jpg",
        img3: "Resources/7/1.jpg",
        price: 2100,
    },
    {
        id: 7,
        title: "Birthday Special 8",
        img1: "Resources/8/1.jpg",
        img2: "Resources/8/1.jpg",
        img3: "Resources/8/1.jpg",
        price: 2100,
    },
    {
        id: 8,
        title: "Birthday Special 9",
        img1: "Resources/9/1.jpg",
        img2: "Resources/9/2.jpg",
        img3: "Resources/9/3.jpg",
        price: 2100,
    },
    {
        id: 9,
        title: "Birthday Special 10",
        img1: "Resources/10/1.jpg",
        img2: "Resources/10/2.jpg",
        img3: "Resources/10/3.jpg",
        price: 2100,
    },
    {
        id: 10,
        title: "Birthday Special 11",
        img1: "Resources/11/1.jpeg",
        img2: "Resources/11/2.jpeg",
        img3: "Resources/11/3.jpeg",
        price: 2400,
    },
];

let orders = [];

//SETTING ROUTES FOR PAGES
app.get("/", function(req, res) {
    res.render("home", { products: products });
});

app.get("/service", function(req, res) {
    res.render("service", { products: products });
});
// ROUTE PARAMETERS TO CONSOLE LOG THE PATH THAT YOU SPECIFY
app.get("/services/:path", function(req, res) {
    let requestedTitle = _.lowerCase(req.params.path);
    res.render("service", {
        name: products[requestedTitle].title,
        price: products[requestedTitle].price,
        img1: products[requestedTitle].img1,
        img2: products[requestedTitle].img2,
        img3: products[requestedTitle].img3,
    });
});

app.get("/order", function(req, res) {
    res.render("order");
});

app.post("/service", function(req, res) {
    //fetching data from form
    let order = {
        name: _.lowerCase(req.body.fname),
        number: _.lowerCase(req.body.number),
        date: req.body.date,
        time: req.body.time,
        addressone: _.lowerCase(req.body.addressone),
        addresstwo: _.lowerCase(req.body.adddresstwo),
        pincode: req.body.pincode,
        occasion: req.body.occasion,
    };
    //sending data to order array
    orders.push(order);
    //sending data to order page
    res.render("order", {
        number: req.body.number,
        name: req.body.fname,
        date: req.body.date,
        time: req.body.time,
        addressone: req.body.addressone,
        addresstwo: req.body.adddresstwo,
        pincode: req.body.pinocode,
        occasion: req.body.occasion,
    });

    //sending data to mongodb atlas
    const user = new User({
        name: req.body.fname,
        number: req.body.number,
        date: req.body.date,
        time: req.body.time,
        pincode: req.body.pinocode,
        occasion: req.body.occasion,
        address: req.body.addressone,
        addresstwo: req.body.adddresstwo,
    });
    user.save();
    console.log(order, orders);
});

// summary page

// Add smooth animations ,fonts ,colors ,animation on cards in the end

// if (requestedTitle === _.lowerCase(products[requestedTitle].id)) {
//     res.render("service", {
//         name: products[requestedTitle].title,
//         price: products[requestedTitle].price,
//         img1: products[requestedTitle].img1,
//         img2: products[requestedTitle].img2,
//         img3: products[requestedTitle].img3,
//     });
// } else {
//     console.log("There is an ERROR!");
// }

// products.map((product) => {
//     if (requestedTitle === product.name) {
//         res.render("service", { products: product });
//     } else {
//         console.log("error");
//     }

// products.map((product) => {
//     if (requestedTitle === product.uniqueId) {
//         res.render("service", { products: product });
//     } else {
//         console.log("error");
//     }
// });

// if (requestedTitle === _.lowerCase(products[requestedTitle].uniqueId)) {
//     res.render("service", {
//         name: products[requestedTitle].title,
//         price: products[requestedTitle].price,
//         img1: products[requestedTitle].img1,
//         img2: products[requestedTitle].img2,
//         img3: products[requestedTitle].img3,
//     });
// } else {
//     console.log("There is an ERROR!");
// }

// THINGS I HAVE TO DO IN ORDER TO COMPLETE THE WEBSITE
// Numbers are priority level-
// 4 Style the website properly using fonts ,colors ,animation-refer to IG* saved posts
// 1 Create the login and signUp system
// 3 Add payment integration
// 5 Fix the error which comes while dynamic routing(kind of optional)
// 5.2 Add the password ,ids,secret keys and all personal data in dotenv file
// 6 Deploy the website
// LISTENING ON PROT 3000
app.listen(port, function(req, res) {
    console.log("The server is up and running on port 3000!");
});

//RAZORPAY INTEGRATION