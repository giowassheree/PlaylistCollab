-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PLAYLISTS TABLE
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    owner_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SONGS TABLE
CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    artist VARCHAR(100) NOT NULL,
    album VARCHAR(100),
    duration INT, -- Duration in seconds
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PLAYLIST_SONGS TABLE (Many-to-Many relationship between playlists and songs)
CREATE TABLE playlist_songs (
    playlist_id INT REFERENCES playlists(id) ON DELETE CASCADE,
    song_id INT REFERENCES songs(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, song_id)
);

-- Junction table for collaborative playlists (Many-to-Many relationship between users and playlists)
CREATE TABLE playlist_collaborators (
    playlist_id INT REFERENCES playlists(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, user_id)
);