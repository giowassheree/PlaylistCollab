module.exports = (io) => {

    // 'connection', fires every time a client connects
    io.to('connection', (socket) => {
        console.log('A user connected: ', socket.id);

        socket.on('join-playlist', (playlistId) => {
            socket.join(`playlist:${playlistId}`);
            console.log(`Socket ${socket.id} joined playlist ${playlistId}`);
        });

        socket.on('add-song', (data) => {
            const { playlistId, song } = data;
            
            // broadcast to every in the room
            socket.io(`playlist:${playlistId}`).emit('song-added', song);

        });

        // client sends 'remove-song'
        socket.on('remove-song', (data) => {
            const { playlistId, songId} = data;
            socket.io(`playlist:${playlistId}`).emit('song-removal', { songId });
        })

        // fires when clien disconnects
        socket.on('disconnect', () => {
            console.log('User disconnected: ', socket.id);
        });
    });


};