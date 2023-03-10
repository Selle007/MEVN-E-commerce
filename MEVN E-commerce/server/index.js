
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

//Connect to the database
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  
  

const app = express()
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
// Serve static files from the uploads directory
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors())

const categoryAPI = require('../server/controllers/category.controller')
const productAPI = require('../server/controllers/product.controller')
const cartAPI = require('../server/controllers/cart.controller')
const orderAPI = require('../server/controllers/order.controller')
const userRoleAPI = require('../server/controllers/userRole.controller')
const contactAPI = require('../server/controllers/contact.controller')

// API
app.use('/api', categoryAPI)
app.use('/api', cartAPI)
app.use('/api', productAPI)
app.use('/api', orderAPI)
app.use('/api', userRoleAPI)
app.use('/api', contactAPI)






var corsOptions ={
    origin: "http://127.0.0.1:5173/",
    origin: "http://127.0.0.1:5173"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));





app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`)
})





