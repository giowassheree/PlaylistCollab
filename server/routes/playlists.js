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