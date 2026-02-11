import connection from "../database/dbConnection.js";
import {
  createImgPath,
  formatData,
  formatHttpRes,
} from "../functions/helper.js";

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
        image: movie.image ? createImgPath(movie.image) : null,
        created_at: formatData(movie.created_at),
        updated_at: formatData(movie.updated_at),
      };
    });

    res.json(formatHttpRes(movies));
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
          created_at: formatData(review.created_at),
          updated_at: formatData(review.updated_at),
        };
      });

      const movieObj = {
        ...movie,
        image: createImgPath(movie.image),
        created_at: formatData(movie.created_at),
        updated_at: formatData(movie.updated_at),
        reviews: reviews,
      };

      return res.json(formatHttpRes(movieObj));
    });
  });
}

function storeReview(req, res, next) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const query = `INSERT INTO movies_db.reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)`;

  connection.query(query, [id, name, vote, text], (err, results) => {
    if (err) return next(err);
    res.status(201).json({ message: "Review added" });
  });
}

export default { index, show, storeReview };
