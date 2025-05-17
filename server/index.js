const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { Socket } = require('dgram');
require ('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const Product = require('./models/Product.js');
const io = socketIO(server,{
    cors: {
        origin: '*',
        methods:['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

let shoppingList = [];

//Conection Socket.io
io.on('connection', (socket) => {
    console.log('User ON:', socket.id);
    //init all List
    Product.find().then((products) =>{
        socket.emit('updateList', products);
    });

    //Add product user
    socket.on('addProduct', async (productData) => {
        try {
            const newProduct = new Product(productData);
            await newProduct.save(); //save in MongoDB
            const updateList = await Product.find();
            io.emit('updateList', updateList);//Send to all customers
            console.log('Product saved:', newProduct);
        } catch (err) {
            console.error('Error saving product:', err);
        }
        //shoppingList.push(product);
    });

    //Disconnection
    socket.on('disconnect', () => {
        console.log('User logged out', socket.id);
    });
});

//root testing
app.get('/', (req, res) => {
    res.send('Server List On');
});

//Start Serve
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDb connected successfully'))
.catch((err) => console.log('MongoDB connection error', err));