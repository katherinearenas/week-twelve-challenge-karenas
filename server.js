onst express = require('express');
// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: 'postgres',
    // TODO: Enter PostgreSQL password
    password: 'password',
    host: 'localhost',
    database: 'jobs_db'
  },
  console.log(`Connected to the jobs_db database.`)
)

pool.connect();

// get all departments
app.get('/api/department', (req, res) => {
  const sql = `SELECT * FROM department`;

  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});


// Create a new department
app.post('/api/department', ({ body }, res) => {
  const sql = `INSERT INTO department (department.name)
    VALUES ($1)`;
  const params = [body.department_name];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});
// delete department
app.delete('/api/department/:id', (req, res) => {
  const sql = `DELETE FROM department WHERE id = $1`;
  const params = [req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Department not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
        id: req.params.id
      });
    }
  });
});

// Read all departments


// Delete a movie
app.delete('/api/movie/:id', (req, res) => {
  const sql = `DELETE FROM movies WHERE id = $1`;
  const params = [req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Movie not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.rowCount,
        id: req.params.id
      });
    }
  });
});

// Read list of all reviews and associated movie name using LEFT JOIN
app.get('/api/movie-reviews', (req, res) => {
  const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
  pool.query(sql, (err, { rows }) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// BONUS: Update review
app.put('/api/review/:id', (req, res) => {
  const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
  const params = [req.body.review, req.params.id];

  pool.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.rowCount) {
      res.json({
        message: 'Review not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.rowCount
      });
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
