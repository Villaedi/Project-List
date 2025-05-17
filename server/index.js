const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { Socket } = require('dgram');

const app = express();
const server = http.createServer(app);
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
    socket.emit('updateList', shoppingList);

    //Add product user
    socket.on('addProduct',(product) => {
        shoppingList.push(product);
        io.emit('updateList', shoppingList); //Send to all customers
    });

    //Disconnection
    socket.on('disconnect', () => {
        console.log('User logged out', socket,id);
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