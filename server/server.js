import express from 'express';
// const mongoose = require'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import * as http from "http";
import { Server } from "socket.io";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

var corsOptions = {
origin: 'http://localhost:3000',
optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_HOST, "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "PATCH"],
        allowedHeaders: ["Content-type"],
    },
});
// Middleware
app.use(cors());
app.use(express.json());


// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
