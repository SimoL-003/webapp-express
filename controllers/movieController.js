import connection from "../database/dbConnection.js";
import { DateTime } from "luxon";

function index(req, res, next) {
  const query = "SELECT * FROM movies";

  connection.query(query, (err, results) => {
    if (err) return next(err);

    const movies = results.map((movie) => {
      return {
        ...movie,
        image: `${process.env.SERVER_URL}/images/${movie.image}`,
        created_at: DateTime.fromObject(movie.created_at).toLocaleString(),
        updated_at: DateTime.fromObject(movie.updated_at).toLocaleString(),
      };
    });

    res.json(movies);
  });
}

function show(req, res, next) {
  const { id } = req.params;

  const movieQuery = `
    SELECT *
    FROM movies
    WHERE id = ?
  `;

  connection.query(movieQuery, [id], (err, results) => {
    if (err) return next(err);

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

      const reviews = reviewsResults.map((review) => {
        return {
          ...review,
          created_at: DateTime.fromObject(review.created_at).toLocaleString(),
          updated_at: DateTime.fromObject(review.updated_at).toLocaleString(),
        };
      });

      const movieObj = {
        ...movie,
        image: `${process.env.SERVER_URL}/images/${movie.image}`,
        created_at: DateTime.fromObject(movie.created_at).toLocaleString(),
        updated_at: DateTime.fromObject(movie.updated_at).toLocaleString(),
        reviews: reviews,
      };

      return res.json(movieObj);
    });
  });
}

export default { index, show };
