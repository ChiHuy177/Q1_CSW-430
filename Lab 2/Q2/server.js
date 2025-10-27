const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { error } = require('console');

// Initialize the Express application
const app = express();
const port = 1707;

// Use bodyParser to parse incoming request bodies as JSON
app.use(bodyParser.json());

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'lab2'
});
// Connect to the MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});
// CRUD Operations

//1. Create a new user (POST request)
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO users (name, email) VALUES (?,?)';

    db.query(sql, [name, email], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error creating user', error: err });
        } else {
            res.status(201).json({ message: 'User created', userId: result.inserID });
        }
    });
});

//2. Get all users (GET request)
app.get('/api/book', (req, res) => {
    const sql = 'SELECT * FROM books';

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching user', error: err });
        } else {
            res.json(result);
        }
    });
});

//3. Get a specific user by ID (GET request)
app.get('/api/book/:id', (req, res) => {
    const userID = req.params.id;
    const sql = 'SELECT * FROM books WHERE id = ?';

    db.query(sql, [userID], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching user', error: err });
        } else if (result.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(result[0]);
        }
    });
});

//4. Update a user by ID (PUT request)
app.put('/api/book/:id', (req, res) => {
    const userID = req.params.id;
    const { name, description } = req.body;
    const sql = 'UPDATE books SET name = ?, description = ? WHERE id = ?';

    db.query(sql, [name, email, userID], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error updating user', error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User updated' });
        }
    });
});

//5. DELETE a user by ID (DELETE request)
app.delete('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [userID], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting user', error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted' });
        }
    });

});

//Start the server
app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`)
});