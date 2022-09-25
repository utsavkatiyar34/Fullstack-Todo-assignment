const express = require('express');
const cors = require('cors');
const app = express();
const port = 7000;

const connectDb = require("./database/index");
const { register, login, loggedinuser, veriFy } = require('./auth/auth');
const { Verify } = require('crypto');
const { getCart, addCart, deleteCart, updateCart, checkOut } = require('./auth/cart');

function logger(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/loggeduser', loggedinuser);
app.post('/register', register);
app.post('/login', login);

app.get('/todo',getCart);
app.post('/addtodo',addCart);
app.delete('/removetodo', deleteCart);
app.post('/updatestatus', updateCart);


connectDb().then(() => {
    app.listen(port, () => {
        console.log("Server is running on port 7000");
    })
}).catch((err) => {
    console.log(err);
})