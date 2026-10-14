const express = require('express');
const router = express.Router(); 
const pool = require('../db');

// GET /api/playlists - get all the playlists
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM playlists ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error'});
    }
});

// GET /api/playlists/:id - get one playlists with its songs
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;

        // Get playlist information
        const playlist = await pool.query(
            'SELECT * FROM playlists WHERE id = $1',
            [id]
        );

        if (playlist.rows.length === 0) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        // Get songs for this playlist
        const songs = await pool.query(
            `SELECT s.*, ps.position, ps.added_at
            FROM songs s
            JOIN playlist_songs ps ON s.id = ps.song_id
            WHERE ps.playlist_id = $1
            ORDER BY ps.position ASC`,
            [id]
        );

        res.json({
            ...playlist.rows[0],
            songs: songs.rows
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error '});
    }
});


// POST /api/playlists - create a new playlist
router.post('/', async (req, res) => {
    try {
        const { name, owner_id } = req.body

        const result = await pool.query(
            'INSERT INTO playlists (name, owner_id) VALUES ($1, $2) RETURNING *',
            [name, owner_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;