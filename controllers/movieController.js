import connection from "../database/dbConnection.js";
import { DateTime } from "luxon";

function index(req, res, next) {
  let query = `
    SELECT movies.*, CAST(AVG(reviews.vote) AS DECIMAL(2,1)) AS rating
    FROM movies
    LEFT JOIN reviews
    ON movie_id = movies.id
  `;

  const { search } = req.query;
  let params = [];
  if (search) {
    query += `WHERE movies.title LIKE ?`;
    params.push(`%${search}%`);
  }

  query += "GROUP BY movies.id";

  connection.query(query, params, (err, results) => {
    if (err) return next(err);

    const movies = results.map((movie) => {
      return {
        ...movie,
        image: movie.image
          ? `${process.env.SERVER_URL}/images/${movie.image}`
          : null,
        created_at: DateTime.fromJSDate(movie.created_at).toLocaleString(),
        updated_at: DateTime.fromJSDate(movie.updated_at).toLocaleString(),
      };
    });

    res.json({
      data: movies,
      meta: {
        totalItems: movies.length,
      },
    });
  });
}

function show(req, res, next) {
  const { slug } = req.params;

  const movieQuery = `
    SELECT movies.*, CAST(AVG(reviews.vote) AS DECIMAL(2,1)) AS rating
    FROM movies
    LEFT JOIN reviews
    ON reviews.movie_id = movies.id
    WHERE movies.slug = ?
    GROUP BY movies.id
  `;

  connection.query(movieQuery, [slug], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      res.status(404);
      return res.json({
        error: {
          code: "Not Found",
          message: "Movie not found",
        },
      });
    }

    const movie = results[0];

    const reviewsQuery = `
      SELECT *
      FROM reviews
      WHERE movie_id = ?
    `;

    connection.query(reviewsQuery, [movie.id], (err, reviewsResults) => {
      if (err) return next(err);

      const reviews = reviewsResults.map((review) => {
        return {
          ...review,
          created_at: DateTime.fromJSDate(review.created_at).toLocaleString(),
          updated_at: DateTime.fromJSDate(review.updated_at).toLocaleString(),
        };
      });

      const movieObj = {
        ...movie,
        image: `${process.env.SERVER_URL}/images/${movie.image}`,
        created_at: DateTime.fromJSDate(movie.created_at).toLocaleString(),
        updated_at: DateTime.fromJSDate(movie.updated_at).toLocaleString(),
        reviews: reviews,
      };

      return res.json(movieObj);
    });
  });
}

export default { index, show };
