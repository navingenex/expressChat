const express = require('express');
const ejs = require('ejs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.render('index');
});
const port = process.env.PORT || 3000;


server = app.listen(port, () => {
    console.log('Example app listening on port port!');
});
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('new user connected');
    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username
        });
    })

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {
            username: socket.username
        })
    })
})
//Run app, then load http://localhost:port in a browser to see the output.