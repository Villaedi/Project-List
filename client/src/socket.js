import { io } from 'socket.io-client';

//Update this if your server runs on a different port or host

const socket = io('http://localhost:3001');

export default socket;