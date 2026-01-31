import connection from "../database/dbConnection.js";

function index(req, res) {
  const query = "SELECT * FROM movies";

  connection.query(query, (err, results) => {
    if (err) return res.status(500);
    res.json(results);
  });
}

function show(req, res) {
  const { id } = req.params;

  const movieQuery = `
    SELECT *
    FROM movies
    WHERE id = ?
  `;

  connection.query(movieQuery, [id], (err, results) => {
    if (err) return res.status(500);

    if (results.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        message: "Movie not found",
      });
    }

    const movie = results[0];

    const reviewsQuery = `
      SELECT *
      FROM reviews
      WHERE id = ?
    `;

    connection.query(reviewsQuery, [id], (err, reviewsResults) => {
      if (err) return res.status(500);

      const movieObj = {
        ...movie,
        reviews: reviewsResults,
      };

      return res.json(movieObj);
    });
  });
}

export default { index, show };
