import io from 'socket.io-client';

const socket = io.connect('https://ju-task-management.herokuapp.com');

export default socket;