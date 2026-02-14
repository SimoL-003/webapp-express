function reviewData(req, res, next) {
  const { name, text, vote } = req.body;

  if (vote < 1 || vote > 5) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Vote must be between 1 and 5",
      },
    });
  }

  if (!name || !vote) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Name and vote are required",
      },
    });
  }

  if (text && text.length > 500) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Text must be less than 500 characters",
      },
    });
  }

  console.log("Dati validati");

  next();
}

function movieData(req, res, next) {
  const { title, director, abstract, release_year } = req.body;

  if (!title || !director) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Title and director are required",
      },
    });
  }

  if (abstract && abstract.length > 500) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Abstract must be less than 500 characters",
      },
    });
  }

  if (release_year && release_year.length !== 4) {
    return res.status(400).json({
      error: {
        code: "Invalid Data",
        message: "Release year must be 4 characters",
      },
    });
  }

  next();
}

export default { reviewData, movieData };
