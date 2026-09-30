const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();

const server = http.createServer(app);


// Attach socket.io to http server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


app.use(cors());
app.use(express.json());

const playlistRoutes = require('./routes/playlists');
app.use('/api/playlists', playlistRoutes);

require('./sockets')(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log("Server is running on port ${PORT}!");
});